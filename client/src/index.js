import App from './components/App'; 
import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from 'react-router-dom'
import 'semantic-ui-css/semantic.min.css'
import { ErrorProvider } from './components/ErrorProvider';

ReactDOM.render(
  <ErrorProvider>
  <Router>
  <App />
  </Router>
  </ErrorProvider>,
  document.getElementById('root')
);


