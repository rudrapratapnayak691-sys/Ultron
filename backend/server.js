const express = require("express");
const cors = require("cors");

const app = express();

const PORT = process.env.PORT || 10000;

// Middleware
app.use(cors());
app.use(express.json());

// Test route
app.get("/", (req, res) => {
  res.send("ULTRON AI backend is running 🤖");
});

// AI route
app.post("/ask", async (req, res) => {
  try {
    const { question } = req.body;

    if (!question) {
      return res.status(400).json({
        error: "Please provide a question."
      });
    }

    // Temporary AI response
    // Replace this section with your AI API later
    const answer =
      "ULTRON AI received your question: " + question;

    res.json({
      answer: answer
    });

  } catch (error) {
    console.error("Error:", error);

    res.status(500).json({
      error: "ULTRON AI server error."
    });
  }
});

app.listen(PORT, () => {
  console.log(`ULTRON AI running on port ${PORT}`);
});
