const express = require("express");
const path = require("path");
const OpenAI = require("openai");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 3000;

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

app.use(express.json());

// Serve the project root from backend/
app.use(express.static(path.join(__dirname, "..")));

// Home page
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "index.html"));
});

// AI endpoint
app.post("/ask", async (req, res) => {
  try {
    const question = req.body.question || "";

    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: "You are a helpful assistant." },
        { role: "user", content: question }
      ],
    });

    res.json({
      answer: response.choices[0].message.content || "No answer received."
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ answer: "OpenAI request failed." });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
