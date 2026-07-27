const questionInput = document.getElementById("question");
const sendButton = document.getElementById("send");
const chat = document.getElementById("chat");

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

  const loadingMessage = addMessage("ULTRON AI is thinking...", "ai");

  try {

    const response = await fetch("/chat", {
      method: "POST",

      headers: {
        "Content-Type": "application/json"
      },

      body: JSON.stringify({
        message: question
      })
    });

    if (!response.ok) {
      throw new Error("Server returned " + response.status);
    }

    const data = await response.json();

    loadingMessage.remove();

    const answer =
      data.reply ||
      data.response ||
      data.message ||
      "I couldn't understand the server response.";

    addMessage(answer, "ai");

  } catch (error) {

    console.error("ULTRON AI Error:", error);

    loadingMessage.textContent =
      "⚠️ Server error. Make sure your AI backend is running and connected.";

  } finally {

    sendButton.disabled = false;
    sendButton.textContent = "Send";

    questionInput.focus();
  }
}

// Send when button is clicked
sendButton.addEventListener("click", sendMessage);

// Send when Enter is pressed
questionInput.addEventListener("keydown", function(event) {

  if (event.key === "Enter") {
    sendMessage();
  }

});
