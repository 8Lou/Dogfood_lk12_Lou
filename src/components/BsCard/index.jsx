import { useContext, useState } from "react";
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
    _id,
    user,
    img,
}) => {
    const { setServerGoods, userId, api, setBasket, serverGoods, basket } = useContext
    const [isLike, setIsLike] = useState(likes.includes(userId));
    const [inBasket, setInBasket] = useState(basket.filter(el => el.id === _id).length > 0)

    const updLike = (e) => {
        e.stopPropagation();
        e.preventDefault();
        setIsLike(!isLike);
        api.setLike(_id, !isLike)
            .then(data => {
                console.log(data);
                setServerGoods(function (old) {
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

    const addBascet = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setInBasket(true);
        setBasket(prev => [...prev, {
            id: _id,
            cnt: 1,
            name: name,
            img: img,
            price: price,
            discount: discount
        }])
    }

    return <Link className="card" to={`/product/${_id}`}>
        {discount > 0 && <span className="card__discount"><Percent /> {discount}</span>}
        <span className="card__like" onClick={updLike}>
            {isLike ? <SuitHeartFill /> : <SuitHeart />}
        </span>
        <img src={img} alt="Изображение" className="card__img" />
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
        <Button className="card__btn"
            onClick={addBascet}
            disabled={inBasket}>В корзину</Button>
    </Link>
}

export default BsCard;