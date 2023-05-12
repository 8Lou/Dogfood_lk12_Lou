import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
/* import "bootstrap/dist/css/bootstrap.min.css" */
import "./index.css";

// Взять из html-файла тег, внутри которого будет работать React
const root = ReactDOM.createRoot(document.getElementById("root"));



root.render(<BrowserRouter><App/></BrowserRouter>)