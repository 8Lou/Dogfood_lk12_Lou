import Logo from "./Logo";
import {
    BalloonHeart,
    Cart4,
    PersonCircle,
    BuildingUp,
    BuildingDown
} from "react-bootstrap-icons";
import Search from "../Search";

// const Header = (props) => {
//     console.log(props.user)
// }
// const Header = ({user}) => {
//     console.log(user)
// }
const Header = ({
    user,
    upd,
    searchArr,
    setGoods,
    setSearchResult
}) => {
    const login = () => {
        localStorage.setItem("user12", "Di");
        upd("Lou");
    }
    const logout = () => {
        localStorage.removeItem("user12");
        upd(null);
    }
    return <header>
        <Logo />
        <div className="search-block">
            <Search
                data={searchArr}
                setGoods={setGoods}
                setSearchResult={setSearchResult}
            />
        </div>
        <nav className="header__menu">
            {user && <>
                <a href="">
                    <BalloonHeart title="Избранное" />
                </a>
                <a href="">
                    <Cart4 title="Корзина" />
                </a>
                <a href="">
                    <PersonCircle title="Личный кабинет" />
                </a>
            </>}
            <span>
                {!user && <BuildingUp title="Войти" onClick={login} />}
                {user && <BuildingDown title="Выйти" onClick={logout} />}
            </span>
        </nav>
    </header>
}

export default Header;