import systemPrompt from "../config/systemPrompt.js";

const chatWithAI = async (req, res) => {
    const { prompt } = req.body;
    try {
        const response = await fetch(`${process.env.OLLAMA_BASE_URL}/api/chat`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                model: process.env.MODEL,
                messages: [
                    { 
                        role: "system", 
                        content: systemPrompt 
                    },
                    { 
                        role: "user", 
                        content: prompt 
                    },
                ],
                stream: false
            })
        });
        const data = await response.json();
        const output = data?.message?.content || "";

        res.json({ output });

    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Failed to get response from LLM" });
    }
};

export default chatWithAI;