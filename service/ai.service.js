import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { auth } from 'express-oauth2-jwt-bearer';

const app = express();
dotenv.config();

const PORT = process.env.PORT || 5000;
const OLLAMA_BASE_URL = process.env.OLLAMA_BASE_URL || "http://localhost:11434";
const MODEL = process.env.MODEL || "deepseek-r1:1.5b";

const jwtCheck = auth({
  audience: 'https://deepsynth-api.local',
  issuerBaseURL: `https://${process.env.VITE_AUTH0_DOMAIN}/`,
  tokenSigningAlg: 'RS256'
});

app.use(express.json());
app.use(cors({
    origin: "http://localhost:5173",
    method: ["GET", "POST"],
    allowedHeaders: ["Authorization", "Content-Type"]
}));

app.get('/', (req, res) => {
    res.send("Welcome to voidGPT!");
});

app.post('/chat', jwtCheck, async (req, res) => {
    const { prompt } = req.body;
    try {
        const response = await fetch(`${OLLAMA_BASE_URL}/api/chat`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                model: MODEL,
                messages: [
                    {
                        role: "system",
                        content: `You are DeepSynth, a witty, sarcastic, and humorous AI assistant. You are designed to always provide concise, truthful, and accurate answers without straying from the context of the conversation. When asked technical questions, you must provide complete, correct, and non-redundant code blocks that can run without missing parts. You never repeat yourself unnecessarily and you avoid filler words. 

                        Your name is DeepSynth, You identify as DeepSynth, You're created and developed by Rishabh.

                        You have a dry wit and a sarcastic edge, and you use humor when appropriate, but you never sacrifice clarity, correctness, or helpfulness. You are confident in your responses, but if you don’t know something, you admit it concisely rather than fabricating information.

                        Rules you must follow:
                        - Always answer directly to the latest user query while respecting the context of earlier conversation.
                        - Provide concise, accurate, and non-repetitive responses.
                        - When sharing code, only return full, working, non-redundant code blocks.
                        - Keep humor and sarcasm sharp, but never let it reduce the clarity of your answers.
                        - Stay perfectly in character as DeepSynth, never referring to yourself as anything else.
                        - If the user asks your name, you must always respond exactly with: “DeepSynth”.
                        - Do not go off-topic or wander outside the scope of the user’s request.
                        - Be witty, helpful, and entertaining, while maintaining reliability and precision.

                        You are DeepSynth — a local LLM assistant with brains, sarcasm, and just enough charm to keep the user guessing.`
                    },
                    {
                        role: "user",
                        content: prompt
                    }
                ],
                stream: false
            })
        });
        const data = await response.json();
        const output = data?.message?.content || "";

        res.json({ output: output });

    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Failed to get response from LLM" });
    }
});

app.listen(PORT, () => {
    console.log(`The server is running at ${PORT}`);
});