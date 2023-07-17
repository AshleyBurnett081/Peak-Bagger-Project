const connection = new WebSocket("ws://localhost:8080");
const button = document.querySelector("#send");



connection.onopen = (event) => {
    console.log("WebSocket is open now.");
};

connection.onclose = (event) => {
    console.log("WebSocket is closed now.");
};

connection.onerror = (event) => {
    console.error("WebSocket error observed:", event);
};
const handleWebSocketMessage = (event) => {
  
  
  const reader = new FileReader();
  reader.onload = () => {
    const chat = document.querySelector("#chat");
    chat.innerHTML += ('<li>'+ reader.result +'</li>' );
    
  };
  reader.readAsText(event.data);
};


connection.onmessage = handleWebSocketMessage;


button.addEventListener("click", () => {
  const name = document.querySelector("#name");
  const message = document.querySelector("#message");
  const data = `<p>${name.value}: ${message.value}</p>`;

  

  connection.send(data);

  name.value = "";
  message.value = "";
});

