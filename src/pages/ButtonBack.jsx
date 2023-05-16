import React from "react";
import "./style.scss"
import { Link } from "react-router-dom";


const ButtonBack = () => {
    return (
        <Link className="btn__back" to={-1}>
        <button variant="info">{`< Назад`}</button> 
        </Link>
    )
}

export default ButtonBack;