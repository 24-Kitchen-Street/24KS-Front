import React from "react"
import ReactDOM from "react-dom"
import "./index.css"
import App from "./App"
import "./socket"
import { FontStyles } from "./fonts/fontStyles"

ReactDOM.render(
  <React.StrictMode>
    <FontStyles />
    <App />
  </React.StrictMode>,
  document.getElementById("root")
)
