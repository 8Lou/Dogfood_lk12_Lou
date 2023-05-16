import { useState } from "react";
import "./style.scss";
import { Link } from "react-router-dom";
import { SuitHeart, SuitHeartFill, Percent } from "react-bootstrap-icons";
import { Button } from "../Button/Button";

const BsCard = ({
  discount,
  likes,
  name,
  pictures,
  price,
  tags,
  _id,
  user,
  setServerGoods,
      img, 
}) => {
 const [isLike, setIsLike] = useState(likes.includes(localStorage.getItem("rockId")));

    const updLike = (e) => {
        e.stopPropagation();
        e.preventDefault();
        setIsLike(!isLike);
        const token = localStorage.getItem("token");
        fetch(`https://api.react-learning.ru/products/likes/${_id}`, {
            method: isLike ? "DELETE" : "PUT",
            headers: {
                "Authorization": `Bearer ${token}`
            }
        })
            .then(res => res.json())
            .then(data => {
                setServerGoods(function(old) {
                    const arr = old.map(el => {
                        if (el._id === _id) { 
                            return data;
                        } else { 
                            return el; 
                        }
                    }); 
                    return arr; 
                })
            })
    }

    return <Link className="card" to={`/product/${_id}`}>
        {discount > 0 && <span className="card__discount"><Percent/> {discount}</span>}
        <span className="card__like" onClick={updLike}>
            {isLike ? <SuitHeartFill /> : <SuitHeart />}
        </span>
        <img src={img} alt="Изображение" className="card__img"/>
        <span className="card__name">{name}</span>
        <span className="card__price">
            {discount > 0 
                ? <>
                    <del>{price}</del>
                    &nbsp;
                    {price * (100 - discount) / 100}
                </>
                : price
            } 
        &nbsp;₽</span>
        <Button className="card__btn">В корзину</Button>
    </Link>
}

export default BsCard;