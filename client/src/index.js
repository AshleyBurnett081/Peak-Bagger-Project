import App from './components/App'; 
import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from 'react-router-dom'
import websocket from 'websocket';
// import "./index.css";


ReactDOM.render(
  <Router>
    <App />
  </Router>,
  document.getElementById('root')
);


// const http = require("http");
// const WebSocketServer = require("websocket").server
// let connection = null;

// const httpserver = http.createServer((req, res) => {
//     console.log("Request recieved");
// })

// const websocket = new WebSocketServer({
//   "httpServer": httpserver
// })

// websocket.on("request", request=> {
//     connection = request.accept(null, request.origin)
//     connection.on("onopen", () => console.log('open'))
//     connection.on("onclose", () => console.log('closed'))
//     connection.on("onmessage", message => { 
//       console.log(`Recieved message ${message}`)
//     })

// })

// httpserver.listen(8000, () => console.log("My server is listening"))