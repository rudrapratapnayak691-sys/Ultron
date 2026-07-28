const questionInput = document.getElementById("question");
const sendButton = document.getElementById("send");
const chat = document.getElementById("chat");

// Your Render backend
const API_URL = "https://ultron-3.onrender.com/ask";

function addMessage(text, type) {
  const message = document.createElement("div");

  message.className = "message " + type;
  message.textContent = text;

  chat.appendChild(message);
  chat.scrollTop = chat.scrollHeight;

  return message;
}

async function askUltron() {
  const question = questionInput.value.trim();

  if (!question) return;

  // Show user message
  addMessage(question, "user");

  // Clear input
  questionInput.value = "";

  // Disable button while waiting
  sendButton.disabled = true;

  const aiMessage = addMessage(
    "ULTRON is thinking... 🤖",
    "ai"
  );

  try {
    const response = await fetch(API_URL, {
      method: "POST",

      headers: {
        "Content-Type": "application/json"
      },

      body: JSON.stringify({
        question: question
      })
    });

    if (!response.ok) {
      throw new Error("Server error: " + response.status);
    }

    const data = await response.json();

    aiMessage.textContent =
      data.answer ||
      data.response ||
      data.message ||
      "ULTRON received your message but didn't return an answer.";

  } catch (error) {
    console.error("ULTRON ERROR:", error);

    aiMessage.textContent =
      "⚠️ Couldn't connect to ULTRON AI. Please try again.";
  }

  sendButton.disabled = false;
  questionInput.focus();
}

// Send button
sendButton.addEventListener("click", askUltron);

// Press Enter to send
questionInput.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    askUltron();
  }
});
