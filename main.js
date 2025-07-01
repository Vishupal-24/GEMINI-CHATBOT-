const sendButton = document.getElementById("send-button");
const userInput = document.getElementById("user-input");
const chatBox = document.getElementById("chat-box");
sendButton.onclick = async () => {
  const message = userInput.value.trim();
  if (!message) return;
  chatBox.innerHTML += `<div class="user">${message}</div>`;
  userInput.value = "";
  chatBox.scrollTop = chatBox.scrollHeight;
  const response = await fetch("/chat", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ message: message })
  });
  const data = await response.json();
  chatBox.innerHTML += `<div class="bot">${data.reply}</div>`;
  chatBox.scrollTop = chatBox.scrollHeight;
  
  
  
  
  
  const suggestions =`Based on this question list 3 questions a user might ask write nothing else except questions in bullet points${message}`;
  
  const suggest1 = await fetch("/chat", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ message: suggestions })
  });
  const new_suggestions = await suggest1.json();
  chatBox.innerHTML+=`<div id="suggest">${new_suggestions.reply}</div>`;
  
  chatBox.innerHTML+=`<button id="regenrate">${"Regenrate"}</button>`;
  const regen =document.getElementById("regenrate");
  
  
  
  const new_message=`Please make the reply more simplified and give better version of this reply:${data.reply}`;
  regen.onclick=async()=>{
    const response = await fetch("/chat", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ message: new_message })
  });
    const new_response = await response.json();
    chatBox.innerHTML += `<div class="bot">${new_response.reply}</div>`;
    chatBox.scrollTop = chatBox.scrollHeight;
  }
  
};
userInput.addEventListener("keypress", function(e) {
  if (e.key === "Enter") sendButton.click();
});