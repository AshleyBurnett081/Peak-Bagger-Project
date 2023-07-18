import App from './components/App'; 
import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from 'react-router-dom'
import websocket from 'websocket';
import { ErrorBoundary, ErrorContext } from './components/ErrorBoundary';
import 'semantic-ui-css/semantic.min.css'
// import "./index.css";


ReactDOM.render(
  <ErrorBoundary>
  <Router>
    <App />
  </Router>
  </ErrorBoundary>,
  document.getElementById('root')
);


