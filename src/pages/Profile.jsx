import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const Profile = ({ user, setUser }) => {
  const navigate = useNavigate();
  const logOut = () => {
    setUser("");
    localStorage.removeItem("user12");
    navigate("/");
  };
  return <>
      <h1>Личный кабинет</h1>
      <p>Добро пожаловать, {user}!</p>
      <Button variant="info" onClick={logOut}>
        Выйти из аккаунта
      </Button>
    </>
};
export default Profile;
