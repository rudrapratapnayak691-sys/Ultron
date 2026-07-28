const express = require("express");
const cors = require("cors");

const app = express();

const PORT = process.env.PORT || 10000;


// Middleware
app.use(cors());

app.use(express.json());


// Home route
app.get("/", (req, res) => {

  res.send(
    "ULTRON AI backend is running 🤖👁️"
  );

});


// AI route
app.post("/ask", async (req, res) => {

  try {

    const question = req.body.question;


    if (!question) {

      return res.status(400).json({

        error: "Question is required."

      });

    }


    // Temporary response
    // This proves the frontend and backend are connected.

    const answer =
      "ULTRON AI received your message: " +
      question;


    res.json({

      answer: answer

    });


  } catch (error) {

    console.error(
      "ULTRON ERROR:",
      error
    );


    res.status(500).json({

      error:
        "ULTRON AI server error."

    });

  }

});


// Start server
app.listen(PORT, () => {

  console.log(
    `ULTRON AI running on port ${PORT}`
  );

});
