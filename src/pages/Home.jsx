import { Link } from "react-router-dom";
import "./style.scss"
import { Folder2Open } from "react-bootstrap-icons";
/* import Advertisement from "../components/advertisement/Advertisement"; */

const Home = ({ user, setActive, pictures }) => {
  return <div>

    <span className="welcome">Добро пожаловать в магазин <br />"Собачье счастье"</span>
    <div className="home__img">
      <img src="https://cdn.dribbble.com/users/1981303/screenshots/7058473/media/7a0ce2416add97c3bf0b8cd921cb4666.gif" />
    </div>
    <div className="info">
      {user && (
        <Link to="/catalog" className="info-link">
          <Folder2Open style={{ marginRight: "10px" }} />
          Выбрать
        </Link>
      )}
      {/* {!user && (
        <span className="info-link" onClick={() => setActive(true)}>
          Необходима авторизация, для доступа</span>
      )} */}
    </div>
    <div className="welcome__title">
      <span>
        Наелся и спит...
        <br />
        <Link to="/catalog" className="info-link">
          <Folder2Open style={{ marginRight: "10px" }} />
          Выбрать лакомства
        </Link>
      </span>
    </div>
  </div>
};
export default Home;
