import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { TimelineProvider } from './Timeline/context/TimelineProvider';
import "./index.css";

const rootElement = document.getElementById("root")!;
const root = ReactDOM.createRoot(rootElement);

root.render(
  <React.StrictMode>
    <TimelineProvider>
      <App />
    </TimelineProvider>
  </React.StrictMode>,
);
