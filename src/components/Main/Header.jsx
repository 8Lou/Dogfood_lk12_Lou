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
    const [likeCount, setLikeCount] = useState(0);
    const [cartCount, setCartCount] = useState(0);
    const { basket } = useContext(AppContext)
    useEffect(() => {
        setLikeCount(serverGoods.filter(el => el.likes.includes(localStorage.getItem("id"))).length)

    }, [serverGoods]);

    useEffect(() => {
        setCartCount(basket.reduce((acc, el) => acc + el.count, 0))
    }, [basket])

    const logIn = (e) => {
        e.preventDefault();
        setModalActive(true);
    }
    return <header>
        <Logo />
        <nav className="header__menu">
            {user && <>
                <Link to="/" title="На главную" className="badge-el">
                    <HouseDoor />
                </Link>
                <Link to="/favorites" title="Избранное" className="badge-el">
                    <Star />
                    <span className="badge-item">{likeCount}</span>
                </Link>
                <Link to="/basket" title="Корзина" className="badge-el">
                    <Cart4 />
                    <span className="badge-item">{cartCount}</span>
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
