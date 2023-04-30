import Logo from "./Logo";
import {
    Heart,
    Cart4,
    PersonCircle,
    /* HouseDoorFill,
    HouseDoor */
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
    setSearchResult,
    setModalOpen
}) => {
    const login = () => {
        setModalOpen(true)
        /* localStorage.setItem("user12", "Di");
        upd("Lou"); */
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
                    <Heart title="Избранное" />
                </a>
                <a href="">
                    <Cart4 title="Корзина" />
                </a>
                <a href="">
                    <PersonCircle title="Личный кабинет" />
                </a>
            </>}
            {/*             <span>
                {!user && <HouseDoorFill title="Войти" onClick={login} />}
                {user && <HouseDoor title="Выйти" onClick={logout} />}
            </span> */}
        </nav>
    </header>
}

export default Header;