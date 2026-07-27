const questionInput = document.getElementById("question");
const sendButton = document.getElementById("send");
const chat = document.getElementById("chat");

// LIVE ULTRON AI BACKEND
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

  // Show user's message
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
      throw new Error("Server error: " + response.status);
    }

    const data = await response.json();

    // Remove loading message
    loadingMessage.remove();

    // Show AI response
    addMessage(
      data.reply || "No answer received from ULTRON AI.",
      "ai"
    );

  } catch (error) {
    console.error("ULTRON AI Error:", error);

    loadingMessage.textContent =
      "⚠️ Couldn't connect to ULTRON AI. Please try again.";
  }

  // Enable button
  sendButton.disabled = false;
  sendButton.textContent = "Send";

  questionInput.focus();
}

// Send with button
sendButton.addEventListener("click", sendMessage);

// Send with Enter key
questionInput.addEventListener("keydown", function(event) {
  if (event.key === "Enter") {
    sendMessage();
  }
});
