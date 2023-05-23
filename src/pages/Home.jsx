import { Link } from "react-router-dom";
import "./style.scss"
import { Folder2Open } from "react-bootstrap-icons";
import Advertisement from "../components/advertisement/Advertisement";

const Home = ({ user, setActive, pictures }) => {
  return <>
  
      <span className="welcome">Наелся и спит...</span>
      <div className="home__img">
        <img src="https://i.gifer.com/S6jK.gif" alt="home__picture" />
      </div>
      <span className="welcome">
        Добро пожаловать в магазин "Собачье счастье"
        <br/>Вы находитесь на главной странице
      </span>
      <div className="info">
        {user && (
          <Link to="/catalog" className="info-link">
            <Folder2Open style={{ marginRight: "10px" }} />
            Выбрать
          </Link>
        )}
        {!user && (
          <>
            <span className="info-link" onClick={() => setActive(true)}>
{/*               Необходима авторизация, для доступа
 */}            </span>
 <Advertisement/>
          </>
        )}
      </div>
    </>
};
export default Home;
