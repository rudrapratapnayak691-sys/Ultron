const questionInput = document.getElementById("question");
const sendButton = document.getElementById("send");
const chat = document.getElementById("chat");

// Your live ULTRON AI backend
const API_URL = "https://ultron-3.onrender.com/chat";

function addMessage(text, type) {
  const message = document.createElement("div");

  message.className = "message " + type;
  message.textContent = text;

  chat.appendChild(message);

  message.scrollIntoView({
    behavior: "smooth",
    block: "end"
  });

  return message;
}

async function sendMessage() {
  const question = questionInput.value.trim();

  if (!question) {
    return;
  }

  // Show user message
  addMessage(question, "user");

  // Clear input
  questionInput.value = "";

  // Disable button
  sendButton.disabled = true;
  sendButton.textContent = "Thinking...";

  // Show loading message
  const loadingMessage = addMessage(
    "ULTRON AI is thinking... 🤖",
    "ai"
  );

  try {
    const response = await fetch(API_URL, {
      method: "POST",

      headers: {
        "Content-Type": "application/json"
      },

      body: JSON.stringify({
        message: question
      })
    });

    if (!response.ok) {
      throw new Error(
        "Server error: " + response.status
      );
    }

    const data = await response.json();

    // Remove loading message
    loadingMessage.remove();

    // Display AI answer
    addMessage(
      data.reply || "ULTRON AI did not return an answer.",
      "ai"
    );

  } catch (error) {
    console.error("ULTRON AI Error:", error);

    loadingMessage.textContent =
      "⚠️ ULTRON AI couldn't connect to the server. Please try again.";
  }

  // Enable button again
  sendButton.disabled = false;
  sendButton.textContent = "Send";

  questionInput.focus();
}

// Send message when button is clicked
sendButton.addEventListener(
  "click",
  sendMessage
);

// Send message when Enter is pressed
questionInput.addEventListener(
  "keydown",
  function(event) {
    if (event.key === "Enter") {
      sendMessage();
    }
  }
);
