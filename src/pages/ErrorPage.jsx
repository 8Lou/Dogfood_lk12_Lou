import React from "react";
import { Link } from "react-router-dom";
/* import "./index.css"; */
import { Button } from "react-bootstrap";

export const ErrorPage = () => {
  return (
    <div className="err__container">
      <Link to="/" className="btn__home">
        <Button variant="warning">Вернуться на главную</Button>
      </Link>
      <div className="err__image"></div>
    </div>
  );
};
