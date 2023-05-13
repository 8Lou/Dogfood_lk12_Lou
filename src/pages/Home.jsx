import { Link } from "react-router-dom";
import "../../src/index.css";
import { Folder2Open } from "react-bootstrap-icons";

const Home = ({ user, setActive, pictures }) => {
  return (
    <>
      <span>Наелся и спит...</span>
      <img src="https://i.gifer.com/S6jK.gif" className="home" alt="picture" />
      <div className="info">
        {user && (
          <Link to="/catalog" className="info-link">
            <Folder2Open style={{ marginRight: "10px" }} />
            Посмотреть продукты
          </Link>
        )}
        {!user && (
          <>
            <span className="info-link" onClick={() => setActive(true)}>
              Необходима авторизация
            </span>
            , для доступа
          </>
        )}
      </div>
    </>
  );
};
export default Home;
