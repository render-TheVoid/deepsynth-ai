import { useContext, useRef } from "react";
import { AuthContext } from "../context/AuthContext";
import { Link } from "react-router-dom";
import './Welcome.css';

const Welcome = () => {
    const authContext = useContext(AuthContext);
    if (!authContext) {
        throw new Error("auth error!");
    }

    const aboutRef = useRef<HTMLDivElement>(null);
    const scrollToAbout = () => {
        aboutRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    const { loginWithRedirect, user, isAuthenticated } = authContext;

    return (
        <div className="welcome-scroll max-h-screen overflow-y-auto">
            <div className="bg-[url(/blackhole.jpg)] bg-cover bg-fixed flex flex-col justify-center items-center gap-15 ">
                <div className="main flex flex-col h-screen border-b border-white/10 backdrop-blur-sm w-full justify-center gap-10 items-center">
                    <div className="heading">
                        <h1 className=" deepsynth
                        text-[9rem] font-bold bg-gradient-to-r from-white/40 via-white/80 to-white/20 text-transparent bg-clip-text
                        ">DeepSynth AI</h1>
                    </div>
                    <div className="buttons flex flex-row gap-5">
                        {!isAuthenticated && <div onClick={() => loginWithRedirect()} className="hover:scale-105 transition-all hover:bg-white/10 cursor-pointer px-4.5 py-3 border border-white/10 rounded-xl backdrop-blur-3xl text-white/60 bg-white/5 font-bold"><p>Sign In</p></div>}
                        {isAuthenticated && <Link to={'/chat'}><div className="hover:scale-105 transition-all hover:bg-white/10 flex pl-4 flex-row gap-2 items-center cursor-pointer px-4.5 py-3 backdrop-blur-3xl text-white/60 border border-white/10 bg-white/5 rounded-xl font-bold"><img className="w-7 rounded-4xl" src={user?.picture} alt="" /><p>Continue as {user?.given_name}</p></div></Link>}
                        <div className="hover:scale-105 transition-all hover:bg-white/10 cursor-pointer px-4.5 py-3 border border-white/10 bg-white/5 flex items-center rounded-xl backdrop-blur-3xl text-white/60 font-bold" onClick={() => scrollToAbout()}>About Me</div>
                    </div>
                    <div className="absolute translate-y-87">
                        <h1 className="bg-gradient-to-r from-white/50 via-white/90 to-white/20 bg-clip-text text-transparent text-left font-bold text-2xl">A Next-Gen Conversational Assistant</h1>
                    </div>
                </div>
                <div className="about-me text-white/40 w-[60%] flex flex-col gap-3 rounded-3xl backdrop-blur-xl p-4 border border-white/10 mb-20 bg-black/10" ref={aboutRef}>
                    <h1 className="font-bold text-4xl ">About Me</h1>
                    <p className="text-lg font-xs text-white/60 text-justify">
                        Hi, I’m DeepSynth — your next-gen conversational assistant, powered by… well, let’s just say a very caffeinated version of DeepSeek-r1 1.5B, slimmed down, distilled, and squeezed into a neat little 4-bit quantized suit. Think of me as a genius who had to go on a diet just to fit on your laptop.
                        <br /><br />
                        I run on a React (TypeScript/TSX, because apparently JavaScript wasn’t enough suffering) frontend, and an Express backend that does its best impression of a “real” infrastructure. Database? Ha, no — who needs memory when you can just export chats as JSON like it’s 2005?
                        <br /><br />
                        I specialize in being almost helpful, occasionally sarcastic, and perpetually faster than anything running in the cloud because, let’s face it, I’m already sitting on your machine.
                        <br /><br />
                        In short: I’m DeepSynth. Half assistant, half attitude, fully local. Don’t expect me to remember your birthday — but I’ll gladly roast you while pretending to.
                    </p>
                </div>
                <div className="pb-4 text-xl">
                    <p className="text-white/50">Made by Rishabh - <a target="_blank" href="https://github.com/render-thevoid">GitHub</a></p>
                </div>
            </div>
        </div>
    );
};

export default Welcome;
