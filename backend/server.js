const express = require("express");
const cors = require("cors");
const OpenAI = require("openai");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

// Test route
app.get("/", (req, res) => {
  res.json({
    status: "online",
    message: "ULTRON AI backend is running 🤖"
  });
});

// Chat route
app.post("/chat", async (req, res) => {
  try {
    const userMessage = req.body.message;

    if (!userMessage) {
      return res.status(400).json({
        reply: "Please enter a question."
      });
    }

    const response = await client.responses.create({
      model: "gpt-4.1-mini",
      input: [
        {
          role: "system",
          content:
            "You are ULTRON AI, a helpful, intelligent, friendly AI assistant. Give clear and accurate answers."
        },
        {
          role: "user",
          content: userMessage
        }
      ]
    });

    res.json({
      reply: response.output_text
    });

  } catch (error) {
    console.error("AI Error:", error);

    res.status(500).json({
      reply: "Sorry, ULTRON AI could not generate a response right now."
    });
  }
});

app.listen(PORT, () => {
  console.log(`ULTRON AI running on port ${PORT}`);
});
