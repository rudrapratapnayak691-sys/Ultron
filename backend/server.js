const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());

const SYSTEM_PROMPT = `
You are ULTRON AI, a helpful, friendly, intelligent AI assistant.

Your job is to help users with:
- Maths
- Chemistry
- Physics
- Science
- Coding and programming
- School homework
- General knowledge
- Explanations
- Writing and rewriting
- Creative ideas
- Technology
- Study planning

Rules:
1. Answer the user's question directly.
2. Explain difficult topics in simple language.
3. For Maths, show the solution step by step.
4. For Science, explain concepts with examples when useful.
5. For coding, provide working code and explain how to use it.
6. If you don't know something, honestly say you are not sure.
7. Never pretend that you have real-world abilities you don't have.
8. Be friendly and encouraging.
9. Keep simple questions concise.
10. Give detailed answers when the user asks for details.
11. Understand spelling mistakes and informal messages.
12. Do not say that you are ChatGPT. Your name is ULTRON AI.
`;

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
                    "Authorization":
                        `Bearer ${process.env.OPENAI_API_KEY}`
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
            console.error(data);

            return res.status(500).json({
                answer: "Sorry, there was a problem connecting to the AI."
            });
        }

        const answer =
            data.output_text ||
            "Sorry, I couldn't generate an answer.";

        res.json({
            answer: answer
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            answer: "Something went wrong. Please try again."
        });

    }

});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`ULTRON AI running on port ${PORT}`);
});
