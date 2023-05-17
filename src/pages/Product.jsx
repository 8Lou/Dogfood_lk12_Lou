import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";


import Loader from "../components/Loader";
import ButtonBack from "./ButtonBack";

const Product = () => {
    const [product, setProduct] = useState({});
    const {id} = useParams();

    useEffect(() => {
        fetch(`https://api.react-learning.ru/products/${id}`, {
            headers: {
                "Authorization": `Bearer ${localStorage.getItem("rockToken")}`
            }
        })
            .then(res => res.json())
            .then(data => {
                if (!data.err) {
                    setProduct(data);
                }
            })
            .catch(error => console.error("Что-то пошло не так...(", error))
    }, []);
    return <>
        { product.name 
            ? <>
                <h1>{product.name}</h1>
                <img src={product.pictures} alt={product.name} />
                <mark>{product.price}₽</mark>
            </>
            : <Loader/>
        }
        <ButtonBack />
    </>
}

export default Product;