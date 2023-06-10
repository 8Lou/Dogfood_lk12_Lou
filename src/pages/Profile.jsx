import { useNavigate } from "react-router-dom";
import { Basket, BoxArrowLeft } from "react-bootstrap-icons";
import { useContext, useEffect, useState } from "react";
import AppContext from "../context/context";
import Input from "../components/FormReview/pro-input";
import BsCard from "../components/BsCard";
import { Button } from "../components/Button/Button";

const Profile = ({ user, divor, setUser }) => {
    const navigate = useNavigate();
    const { api, serverGoods } = useContext(AppContext);
    const [userData, setUserData] = useState({});
    const [correctName, setСorrectName] = useState(false);
    const [correctData, setCorrectData] = useState(false);
    const [correctAv, setCorrectAv] = useState(false);


    const updProfile = (name, val) => {
        let body = {
            name: userData.name,
            about: userData.about
        }
        if (name === "avatar") {
            body = { avatar: userData.avatar };
        }
        body[name] = val;
        api.updUserInfo(body, name === "avatar").then(data => setUserData(data));
    }

    const logOut = (e) => {
        e.preventDefault();
        setUser("")// setUser() => setUser(null) 
        localStorage.removeItem("user");
        localStorage.removeItem("token");
        localStorage.removeItem("id");
        navigate("/");
    }
    useEffect(() => {
        api.getUserInfo()
            .then(data => {
                setUserData(data);
            })
    }, [])

    return <>
        <h2>Личный кабинет</h2>
        <div style={{ gridTemplatedivumns: "1fr", fontSize: "3em" }} >
            Добро пожаловать,&nbsp;
            <span style={{
                fontWeight: "bold",
                divor: divor
            }}>{user}</span>
            !
        </div>

        <div>
            {userData?.name && <>
                <div>
                    <div><Input
                        val={userData.name}
                        isActive={correctName}
                        changeActive={setСorrectName}
                        upd={updProfile}
                        name="name"
                    /></div>
                    <div className="">{userData.email}</div>
                    <div>
                        <Input
                            val={userData.about}
                            isActive={correctData}
                            changeActive={setCorrectData}
                            upd={updProfile}
                            name="about"
                        /></div>
                </div>
                <div>
                    <div>
                        <image
                            src={userData.avatar}
                            alt={userData.email}
                        />
                        <div>
                            <Input
                                val={userData.avatar}
                                isActive={correctAv}
                                changeActive={setCorrectAv}
                                upd={updProfile}
                                name="avatar"
                            />
                        </div>
                    </div>
                </div>
            </>}
        </div>

        <div>
            <div style={{
                gridColumnEnd: "span 4"
            }}>
                <Button onClick={Basket}><h3>Перейти в карзину</h3></Button>

            </div>
            {serverGoods.filter(el => el.author._id === userData._id).map(el => <div xs={6} md={3} key={el._id}>
                <BsCard {...el} />
            </div>)}
        </div>

        <a href="" onClick={logOut} title="Выйти">
            <BoxArrowLeft />
        </a>
    </>
}

export default Profile;