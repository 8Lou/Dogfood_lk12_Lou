import { useNavigate } from "react-router-dom";
import { BoxArrowLeft } from "react-bootstrap-icons";

const Profile = ({ user, color, setUser }) => {
    const navigate = useNavigate();

    const captionStyle = {
        fontWeight: "bold",
        color: color
    }
    
    const logOut = (e) => {
        e.preventDefault();
        setUser("")// setUser() => setUser(null) 
        localStorage.removeItem("user");
        localStorage.removeItem("token");
        localStorage.removeItem("id");
        navigate("/");
        // useNavigate()("/")
    }

    return <>
        <h1>Личный кабинет</h1>
        <div>
            Добро пожаловать,&nbsp;
            <span style={captionStyle}>{user}</span>
            !
        </div>
        <a href="" onClick={logOut} title="Выйти">
            <BoxArrowLeft/>
        </a>
    </>
}

export default Profile;