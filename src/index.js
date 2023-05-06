/*
  const A = Math.PI
  export A

  import A
*/

import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import "./index.css";

// Взять из html-файла тег, внутри которого будет работать React
const root = ReactDOM.createRoot(document.getElementById("root"));

// Собрать внутрь тега код из круглых скобок
// root.render(
//   React.createElement("h1", {title: ""}, "Hello React!")
// )

// root.render(
//   React.createElement(
//     "div", 
//     {title: ""}, 
//     React.createElement("h1", null, "Hello React"),
//     React.createElement("p", {style:{color: "red"}}, "Shop")
//   )
// )


root.render(<BrowserRouter><App/></BrowserRouter>)