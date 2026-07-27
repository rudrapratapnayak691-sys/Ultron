const questionInput = document.getElementById("question");
const sendButton = document.getElementById("send");
const chat = document.getElementById("chat");

// Your Render backend
const BACKEND_URL = "https://ultron-6c3t.onrender.com";

function addMessage(text, type) {
  const message = document.createElement("div");
  message.className = "message " + type;
  message.textContent = text;
  chat.appendChild(message);

  window.scrollTo({
    top: document.body.scrollHeight,
    behavior: "smooth"
  });

  return message;
}

async function sendMessage() {
  const question = questionInput.value.trim();

  if (!question) return;

  addMessage(question, "user");
  questionInput.value = "";

  sendButton.disabled = true;
  sendButton.textContent = "Thinking...";

  const loadingMessage = addMessage(
    "ULTRON AI is thinking...",
    "ai"
  );

  try {
    const response = await fetch(
      `${BACKEND_URL}/chat`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          message: question
        })
      }
    );

    if (!response.ok) {
      throw new Error("Server error: " + response.status);
    }

    const data = await response.json();

    loadingMessage.remove();

    addMessage(
      data.reply || "No response received.",
      "ai"
    );

  } catch (error) {
    console.error("ULTRON AI Error:", error);

    loadingMessage.textContent =
      "⚠️ Could not connect to ULTRON AI.";
  }

  sendButton.disabled = false;
  sendButton.textContent = "Send";
  questionInput.focus();
}

sendButton.addEventListener("click", sendMessage);

questionInput.addEventListener("keydown", function(event) {
  if (event.key === "Enter") {
    sendMessage();
  }
});
