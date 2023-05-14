import { Link } from "react-router-dom";
import "../../src/index.css";
import { Folder2Open } from "react-bootstrap-icons";

const Home = ({ user, setActive, pictures }) => {
  return (
    <>
      <span className="welcome">Наелся и спит...</span>
      <div className="home__img">
        <img src="https://i.gifer.com/S6jK.gif" alt="picture" />
      </div>
      <span className="welcome">
        Добро пожаловать в магазин "Собачье счастье"
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
              Необходима авторизация, для доступа
            </span>
          </>
        )}
      </div>
    </>
  );
};
export default Home;
