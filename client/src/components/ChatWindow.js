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
  const [messages, setMessages] = useState([]);
    
    const handleAddMessage = (new_message) =>{
        setMessages([...messages, new_message])
  
  const reader = new FileReader();
  reader.onload = () => {
    const chat = document.querySelector("#chat");
    chat.innerHTML += ('<li>'+ reader.result +'</li>' );
    setMessages([...messages, reader.result])
  };
  reader.readAsText(event.data);
};


connection.onmessage = handleWebSocketMessage;


const handleSend = (e) => {
  const name = document.querySelector("#name");
  const message = document.querySelector("#message");
  const data = `<p>${name.value}: ${message.value}</p>`;
  handleAddMessage(data)
  

  connection.send(data);

  name.value = "";
  message.value = "";
};
    
    return <p>
    <div id="chat">{messages}</div>
    <input id="name" type="text" placeholder=" User Name" autocomplete="on" />
    <input id="message" type="text" placeholder="Message" />
    <button id="send" onClick={handleSend}>Send</button>   
    </p>
}
};





export default ChatWindow






// const handleSend = (e) => {document.querySelector("send").addEventListener("click", () => {
//   const name = document.querySelector("#name");
//   const message = document.querySelector("#message");
//   const data = `<p>${name.value}: ${message.value}</p>