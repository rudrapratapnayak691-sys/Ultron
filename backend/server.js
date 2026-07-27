const express = require("express");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Test route
app.get("/", (req, res) => {
  res.json({
    status: "online",
    message: "ULTRON AI backend is running 🤖"
  });
});

// AI chat route
app.post("/chat", async (req, res) => {
  try {
    const userMessage = req.body.message;

    if (!userMessage) {
      return res.status(400).json({
        reply: "Please enter a question."
      });
    }

    // Temporary response
    // This proves that your frontend and backend are connected.
    const reply =
      "ULTRON AI received your message: " + userMessage;

    res.json({
      reply: reply
    });

  } catch (error) {
    console.error("Error:", error);

    res.status(500).json({
      reply: "ULTRON AI server error."
    });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`ULTRON AI backend running on port ${PORT}`);
});
