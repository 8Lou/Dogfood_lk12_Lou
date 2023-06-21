import { Link } from "react-router-dom";
import Logo from "./Logo";
import {
    HouseDoor,
    Cart4,
    Star,
    PersonCircle,
    HouseDoorFill,
} from "react-bootstrap-icons";
/* import Search from "../Search"; */
import { useState, useEffect, useContext } from "react";
import AppContext from "../../context/context";

const Header = ({ user, setModalActive, serverGoods }) => {
    const [likeCnt, setLikeCnt] = useState(0);
    const [cartCnt, setCartCnt] = useState(0);
    const { basket } = useContext(AppContext)
    useEffect(() => {
        setLikeCnt(serverGoods.filter(el => el.likes.includes(localStorage.getItem("id"))).length)
    }, [serverGoods]);

    useEffect(() => {
        setCartCnt(basket.reduce((acc, el) => acc + el.cnt, 0))
    }, [basket])

    const logIn = (e) => {
        e.preventDefault();
        setModalActive(true);
    }
    return <header>
        <Logo />
        <nav className="header__menu">
            {user && <>
                <Link to="/home" title="На главную" className="badge-el">
                    <HouseDoor />
                </Link>
                <Link to="/favorites" title="Избранное" className="badge-el">
                    <Star />
                    <span className="badge-item">{likeCnt}</span>
                </Link>
                <Link to="/basket" title="Корзина" className="badge-el">
                    <Cart4 />
                    <span className="badge-item">{cartCnt}</span>
                </Link>
                <Link to="/profile" title="Профиль">
                    <PersonCircle />
                </Link>
            </>}
            {!user && <a href="" onClick={logIn} title="Войти">
                <HouseDoorFill />
            </a>}
        </nav>
    </header>
}

export default Header;
