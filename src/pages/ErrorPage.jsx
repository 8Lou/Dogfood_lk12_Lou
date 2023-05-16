import React from "react";
import { Link } from "react-router-dom";
/* import "./index.css"; */
import ButtonBack from "./ButtonBack";

export const ErrorPage = () => {
  return (
    <div className="err__container">
      <Link to="/" className="btn__home">
        <ButtonBack />
      </Link>
      <div className="err__image">
        <img
          class="card-img-top align-self-center w-auto"
          src="https://beolin.club/uploads/posts/2022-07/1657851760_12-beolin-club-p-risunok-kostochki-karandashom-krasivo-19.png"
          alt="404"
          height="500"
        />
      </div>
    </div>
  );
};
