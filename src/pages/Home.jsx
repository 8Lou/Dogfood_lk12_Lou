import { Link } from "react-router-dom";
import { Folder2Open } from "react-bootstrap-icons";

const Home = ({ user, setActive }) => {
  return (
    <div className="info">
      {user && (
        <Link to="/catalog" className="info-link">
          <Folder2Open style={{ marginRight: "10px" }} />
          Каталог товаров
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
  );
};
export default Home;
