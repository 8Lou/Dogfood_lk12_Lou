import React from "react";
import "./style.css"

const Badge = ({ products }) => {
    return (
        <span className="badge" >{products.length}</span>
    )
}

export default Badge;