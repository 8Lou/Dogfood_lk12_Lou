import React from "react";
import "./style.scss"
import { Link } from "react-router-dom";
import { Button } from "../components/Button/Button";


const ButtonBack = () => {
    return (
        <Link className="btn__back" to={-1}>
        <Button variant="info">{`< Назад`}</Button> 
        </Link>
    )
}

export default ButtonBack;