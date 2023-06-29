import { useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import AppContext from "../context/context";
import Input from "../components/Forms/pro-input";
import BsCard from "../components/BsCard";
import { Button } from "../components/Button/Button";
import UpdatedInput from "../components/UpdatedInput";

const Profile = ({ setUser }) => {
    const navigate = useNavigate();
    const { api, serverGoods } = useContext(AppContext);
    const [user, setUserData] = useState({});
    const [inpName, setInpName] = useState(false);
    const [inpData, setInpData] = useState(false);
    const [inpAbout, setInpAbout] = useState(false);
    const [inpAvatar, setInpAvatar] = useState(false);


    const updUser = (name, val) => {
        let body = {
            name: user.name,
            about: user.about
        }
        if (name === "avatar") {
            body = { avatar: user.avatar };
        }
        body[name] = val;
        api.updUserInfo(body, name === "avatar").then(data => setUserData(data));
    }

    const logOut = (e) => {
        e.preventDefault();
        setUserData("")// setUserData() => setUserData(null) 
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

    return <div style={{
        gridColumnEnd: "span 4",
        display: 'block',
        gap: "20px"
    }}>


        <h2>Личный кабинет</h2>
        <div style={{ gridTemplatedivumns: "1fr", fontSize: "3em" }} >
            Добро пожаловать,&nbsp;
            <span style={{
                fontWeight: "bold"
            }}>{user}</span>
            !
        </div>

        <div>
            {user?.name && <>
                <div>
                    <h2>Личный кабинет</h2>
                    <div style={{ gridTemplatedivumns: "1fr", fontSize: "3em" }} >
                        Добро пожаловать,&nbsp;
                        <span style={{
                            fontWeight: "bold"
                        }}>{user}</span>
                        !
                    </div>
                    <div><UpdatedInput
                        val={user.name}
                        isActive={inpName}
                        changeActive={setInpName}
                        upd={updUser}
                        name="name"
                    /></div>

                    <div className="">{user.email}</div>

                    <div><UpdatedInput
                        val={user.about}
                        isActive={inpAbout}
                        changeActive={setInpAbout}
                        upd={updUser}
                        name="about"
                    /></div>

                    <div className="">{user.email}</div>
                    <div>
                        <UpdatedInput
                            val={user.avatar}
                            isActive={inpAvatar}
                            changeActive={setInpAvatar}
                            upd={updUser}
                            name="avatar"
                        /></div>
                </div>
                <div>
                    <div>
                        <image
                            src={user.avatar}
                            alt={user.email}
                        />
                        <div>
                            <Input
                                val={user.avatar}
                                isActive={inpAvatar}
                                changeActive={setInpAvatar}
                                upd={updUser}
                                name="avatar"
                            />
                        </div>
                    </div>
                </div>
            </>}
        </div>

        <div>
            {serverGoods.filter(el => el.author._id === user._id).map(el => <div key={el._id}>
                <BsCard {...el} />
            </div>)}
        </div>
        <span style={{ margin: "0 60px" }}>
            <Button onClick={'/basket'}>Моя корзина</Button>
            <Button onClick={logOut}>Выйти</Button>
        </span>
    </div >
}

export default Profile;