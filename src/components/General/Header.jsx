import Logo from "./Logo";
import {
    BalloonHeart,
    Cart4,
    PersonCircle,
    BuildingUp,
    BuildingDown
} from "react-bootstrap-icons";

// const Header = (props) => {
//     console.log(props.user)
// }
// const Header = ({user}) => {
//     console.log(user)
// }
const Header = ({ user, upd }) => {
    const login = () => {
        localStorage.setItem("user12", "Vasya");
        upd("Vasya");
    }
    const logout = () => {
        localStorage.removeItem("user12");
        upd(null);
    }
    return <header>
        <Logo />
        <div className="search-block"></div>
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