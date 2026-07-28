const questionInput = document.getElementById("question");
const sendButton = document.getElementById("send");
const chat = document.getElementById("chat");

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

  if (!question) {
    return;
  }


  // Remove welcome screen
  const welcome = document.querySelector(".welcome");

  if (welcome) {
    welcome.remove();
  }


  // User message
  addMessage(question, "user");


  // Clear input
  questionInput.value = "";


  // Disable button
  sendButton.disabled = true;


  // Thinking message
  const aiMessage = addMessage(
    "ULTRON is awakening... 👁️",
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

      throw new Error(
        "Server returned " + response.status
      );

    }


    const data = await response.json();


    aiMessage.textContent =
      data.answer ||
      data.response ||
      data.message ||
      "ULTRON received your message but returned no response.";


  } catch (error) {

    console.error(
      "ULTRON connection error:",
      error
    );


    aiMessage.textContent =
      "⚠️ Couldn't connect to ULTRON AI.\n\n" +
      "The six eyes could not reach the server.";


  }


  sendButton.disabled = false;

  questionInput.focus();

}


// Send button
sendButton.addEventListener(
  "click",
  askUltron
);


// Enter key
questionInput.addEventListener(
  "keydown",
  function(event) {

    if (event.key === "Enter") {

      askUltron();

    }

  }
);
