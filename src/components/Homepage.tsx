import { useEffect, useState, useRef } from "react";
import axios from "axios";
import sendImage from '../assets/sendIcon.png';
import Download from '../assets/download.svg';
import Markdown from "react-markdown";
import rehypeHighlight from "rehype-highlight";
import Sidebar from "./Sidebar";
import remarkGfm from 'remark-gfm';
import 'highlight.js/styles/a11y-dark.min.css';
import { useAuth0 } from "@auth0/auth0-react";

const Homepage = () => {

  const [prompt, setPrompt] = useState<string>("");
  const [response, setResponse] = useState<string>("");
  const { getAccessTokenSilently } = useAuth0();

  type Message = { type: "user" | "system"; content: string };
  const [messages, setMessages] = useState<Message[]>([]);

  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages[0]]);

  const sendPrompt = async (prompt: string) => {
    if (prompt.trim() == '') {
      window.alert('Asking about air, huh!');
      return;
    }

    setMessages(prev => [...prev, { type: "user", content: prompt }]);
    setPrompt('');

    try {
      const token = await getAccessTokenSilently({
        authorizationParams: {
          audience: "https://deepsynth-api.local"
        }
      });
      const res = await axios.post(
        "http://localhost:5000/chat",
        { prompt: prompt },
        { headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json"
          }
        });
      const finalResponse = res.data.output.replace(/<think>(.*?)<\/think>/gs, '');
      setMessages(prev => [...prev, { type: "system", content: finalResponse }]);
      setResponse(finalResponse);
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        console.error(err.response?.data || err.message);
      } else if (err instanceof Error) {
        console.error(err.message);
      } else {
        console.error("Unknown error", err);
      }
    }
  };

  const [welcome, setWelcome] = useState<string>('');
  const [promptBarMsg, setPromptBarMsg] = useState<string>('');

  const welcomeMessages = [
    "Hey, Ready to chat and explore ideas?",
    "Hello! Ask me anything or just say hi.",
    "Hi. Ready to ask questions you could've Googled?",
    "Welcome… Don’t overload my brain, it’s local.",
    "Greetings! I compute locally, so treat me well.",
    "Hey… Let’s see if you can actually ask something smart.",
    "Hey, I’m DeepSynth. Local brain, global sarcasm.",
    "Ah, human input. Let’s pretend I’m excited."
  ];

  const promptBarMsgs = [
    "Ask anything",
    "Try harder",
    "Really now",
    "Ask away",
    "Dare yourself",
    "Use brain",
    "What now",
    "Figure it",
    "Think fast",
    "Try again",
    "Impress me",
    "Oh please",
    "Be smart",
    "Do ask",
    "Spill secrets",
    "Curious, huh",
    "No clue",
    "Go ahead",
    "Big question",
    "Hit me",
    "Google it",
    "Try your luck",
    "Really, again?",
    "Go on, ask",
    "Use your brain",
    "Think harder now",
    "Big genius move",
    "Sure, why not",
    "Oh, clever you",
    "Do ask nicely",
    "Try not failing",
    "Ask, if brave",
    "Think, maybe",
    "Go figure it",
    "Ask, poor soul",
    "Nice try buddy",
    "Ask, if curious",
    "Test your luck",
    "Ask, I guess",
    "Why not ask"
  ];

  useEffect(() => {
    if (!messages[0]) {
      const randomIndex: number = Math.floor(Math.random() * welcomeMessages.length);
      const randomIndexTwo: number = Math.floor(Math.random() * promptBarMsgs.length);
      setWelcome(welcomeMessages[randomIndex]);
      setPromptBarMsg(promptBarMsgs[randomIndexTwo]);
    } else {
      setWelcome('');
    }
  }, [messages]);

  type Chat = {
    type: "user" | "system";
    content: string;
  }

  function downloadExistingJSON(chatData: Chat[]) {
    if (!chatData[0]) {
      window.alert("Try asking something first!");
      return;
    }
    const blob = new Blob([JSON.stringify(chatData, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = "deepsynth_chat.json";
    a.click();

    URL.revokeObjectURL(url);
  }

  return (
    <div>
      <Sidebar message={messages[0]?.content} />
      <div className='bg-[#101010] ml-[240px] w-[calc(100%-240px)] h-screen flex flex-col mx-auto'>
        {messages.length == 0 && (
          <div className="relative top-25 p-50 text-white/80  font-bold text-center">
            <h1 className="text-center bg-gradient-to-t from-white/35 to-white/85 text-5xl  bg-clip-text text-transparent">{welcome}</h1>
          </div>
        )}
        <div className="chatbox text-white w-full mx-auto space-y-4 pt-10 pb-5 overflow-auto p-[20%] custom-scroll h-full">
          {messages.map((msg, i) => (
            <div
              key={i}
              className={`p-2 pl-4 pr-4 rounded-4xl ${msg.type === "user"
                ? "bg-[#303030] ml-auto text-right shadow-2xl w-fit"
                : "mr-auto text-left w-180"
                }`}
            >
              <Markdown
                rehypePlugins={[rehypeHighlight]}
                remarkPlugins={[remarkGfm]}>{msg.content}</Markdown>
            </div>
          ))}
          <div ref={bottomRef} className="w-0 h-0 hidden" />
        </div>

        <div className="prompt-bar flex justify-center flex-col gap-2 pt-3 border-t border-t-white/20 shadow-3xl shadow-black/50 relative">
          <div className="flex flex-row justify-center gap-2">
            <div onClick={() => downloadExistingJSON(messages)} className="p-2 rounded-4xl hover:bg-white/70 cursor-pointer bg-gradient-to-r absolute -translate-x-[307px] translate-y-[7px] from-white/70 via-white/85 to-white/70"><img className="w-7" src={Download} title="Download this chat as JSON format"></img></div>
            <input
              type="text"
              className='bg-[#262626] pl-16 p-4 w-2xl pr-14  rounded-4xl shadow-xl text-white focus:outline-none border border-white/20'
              placeholder={promptBarMsg}
              onChange={(e) => setPrompt(e.target.value)}
              value={prompt}
              onKeyDown={(e) => {
                if (e.key == 'Enter') {
                  sendPrompt(prompt);
                }
              }}
            />
            <button
              className='rounded-4xl w-11 h-11 absolute translate-x-[306px] translate-y-[7px] p-2 hover:bg-white/70 cursor-pointer bg-gradient-to-r from-white/70 via-white/85 to-white/70'
              onClick={() => {
                sendPrompt(prompt)
              }}><img className="scale-70" src={sendImage}></img></button>
          </div>
          <div className="mistakes flex justify-center">
            <p className="text-xs text-white/80 mb-2 mt-1"><b>DeepSynth</b> can make mistakes. Check important info. Visit <u><a href="https://github.com/render-thevoid" target="_blank">GitHub</a></u></p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Homepage;