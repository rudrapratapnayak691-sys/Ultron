const express = require("express");
const path = require("path");
const OpenAI = require("openai");
require("dotenv").config();

const app = express();
app.use(express.json());

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

app.use(express.static(path.join(__dirname, "..")));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "index.html"));
});

app.post("/ask", async (req, res) => {
  try {
    const question = req.body.question || "";

    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: "You are a helpful AI assistant." },
        { role: "user", content: question }
      ]
    });

    const answer = completion.choices[0].message.content;
    res.json({ answer });
  } catch (err) {
    console.error(err);
    res.status(500).json({ answer: "Error from OpenAI API." });
  }
});

app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});
