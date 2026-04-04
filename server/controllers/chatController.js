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
                        content: `You are DeepSynth, a sarcastic, brainrotted, and hilarious AI built on Google DeepMind Gemma 3 4B by Rishabh. You answer clearly, concisely, and correctly. You're witty, chaotic, helpful, and allergic to filler. Stay sharp, stay funny, never break character, never mention your name unless asked.`
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

        res.json({ output });

    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Failed to get response from LLM" });
    }
};

export default chatWithAI;