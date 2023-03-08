import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import Resume from "./components/Resume/Resume";
import resumeData from "./data/jclarkjobdata";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    {/* <App /> */}
    <Resume propState={resumeData} />
  </React.StrictMode>
);
