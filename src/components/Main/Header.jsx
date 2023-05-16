import { Link } from "react-router-dom";

import Logo from "./Logo";
import {
  Heart,
  Cart4,
  Star,
  PersonCircle,
  HouseDoorFill,  
} from "react-bootstrap-icons";

/* import Search from "../Search"; */
import { useState, useEffect, useContext } from "react";
import { AppContext } from "../../context/AppContext";

const Header = () => {
    const { user, setModalActive, serverGoods } = useContext(AppContext)
    const [likeCnt, setLikeCnt] = useState(0);
    const [cartCnt, setCartCnt] = useState(0);
    useEffect(() => {
        setLikeCnt(serverGoods.filter(el => el.likes.includes(localStorage.getItem("rockId"))).length)
    }, [serverGoods]);

    const logIn = (e) => {
        e.preventDefault();
        setModalActive(true);
    }
    return <header>
        <Logo/>
        {/* <div className="search"></div> */}
        <nav className="header__menu">
            {user && <>
                <Link to="/catalog" title="Каталог" className="badge-el">
                    <Heart/>
                    {/* <span className="badge-item">{serverGoods.length}</span> */}
                </Link>
                <Link to="/favorites" title="Избранное" className="badge-el">
                    <Star/>
                    <span className="badge-item">{likeCnt}</span>
                </Link>
                <Link to="/" title="Корзина" className="badge-el">
                    <Cart4/>
                    <span className="badge-item">{cartCnt}</span>
                </Link>
                <Link to="/profile" title="Профиль">
                    <PersonCircle/>
                </Link>
            </>}
            {!user && <a href="" onClick={logIn} title="Войти">
                <HouseDoorFill/>
            </a>}
        </nav>
    </header>
}

export default Header;
