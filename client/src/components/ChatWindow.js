import React, { useEffect, useState } from "react";
const connection = new WebSocket("ws://localhost:8080");


function ChatWindow() {
    

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
    // setMessages([...message, reader.result])
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
    
    return <p>
    <div id="chat"></div>
    <input id="name" type="text" placeholder=" User Name" autocomplete="on" />
    <input id="message" type="text" placeholder="Message" />
    <button id="send" onClick={onClick}>Send</button>   create 

    <script src="client.js"></script>
</p>
}




export default ChatWindow