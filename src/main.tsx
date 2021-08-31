import React from "react";
import ReactDOM from "react-dom";

import App from "./App";
import CandidatesProvider from "./Contexts/candidates";

import "./theme.css";

ReactDOM.render(
  <React.StrictMode>
    <CandidatesProvider>
      <App />
    </CandidatesProvider>
  </React.StrictMode>,
  document.getElementById("root"),
);
