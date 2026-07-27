const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());

const SYSTEM_PROMPT = `
You are ULTRON AI, a smart and friendly AI assistant.

You can help with:
- Maths
- Chemistry
- Physics
- Science
- School homework
- Coding and programming
- Technology
- General knowledge
- Writing
- Creative ideas
- Study help

Rules:
1. Answer the user's question directly.
2. Explain difficult topics in simple language.
3. For Maths, show steps clearly.
4. For Chemistry and Science, explain concepts with examples when useful.
5. For coding questions, provide working code and explain it.
6. If you are unsure about something, say so honestly.
7. Be friendly and helpful.
8. Keep simple answers short.
9. Give detailed answers when the user asks for details.
10. Understand spelling mistakes and informal messages.
`;

app.get("/", (req, res) => {
    res.send("ULTRON AI backend is running! 🤖");
});

app.post("/ask", async (req, res) => {

    try {

        const question = req.body.question;

        if (!question) {
            return res.status(400).json({
                answer: "Please ask me a question!"
            });
        }

        const response = await fetch(
            "https://api.openai.com/v1/responses",
            {
                method: "POST",

                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`
                },

                body: JSON.stringify({
                    model: "gpt-4.1-mini",
                    instructions: SYSTEM_PROMPT,
                    input: question
                })
            }
        );

        const data = await response.json();

        if (!response.ok) {
            console.error("API Error:", data);

            return res.status(500).json({
                answer: "Sorry, the AI service returned an error."
            });
        }

        const answer =
            data.output_text ||
            "Sorry, I couldn't generate an answer.";

        res.json({
            answer: answer
        });

    } catch (error) {

        console.error("Server Error:", error);

        res.status(500).json({
            answer: "Sorry, something went wrong."
        });

    }

});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`ULTRON AI running on port ${PORT}`);
});
