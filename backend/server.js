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

// Serve everything from the project root
app.use(express.static(path.join(__dirname, "..")));

// Home page
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "index.html"));
});

// Optional route for readme.html
app.get("/readme", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "readme.html"));
});

// OpenAI chat route
app.post("/ask", async (req, res) => {
  try {
    const question = (req.body.question || "").trim();

    if (!question) {
      return res.status(400).json({ answer: "Question is required." });
    }

    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: "You are a helpful assistant." },
        { role: "user", content: question }
      ],
      temperature: 0.7,
    });

    const answer = response.choices?.[0]?.message?.content || "No answer returned.";
    res.json({ answer });
  } catch (error) {
    console.error("OpenAI error:", error);
    res.status(500).json({ answer: "Server error while calling OpenAI." });
  }
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
