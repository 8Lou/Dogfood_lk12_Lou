import { useState } from "react";
import { XOctagon } from "react-bootstrap-icons"; /* иконка закрытия модалки */
import "./style.css"

const Modal = ({
    isActive,
    setIsActive,
    setUser
}) => {
    const [isReg, setIsReg] = useState(false);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [pwd, setPwd] = useState("");
    const [pwd2, setPwd2] = useState("");

    const changeForm = (e) => {
        e.preventDefault();
        setIsReg(!isReg);
        clearForm()
    }
    const clearForm = () => {
        setName("");
        setEmail("");
        setPwd("");
        setPwd2("");
    } /* очищает форму и возвращает в перв-е сост-е */

    const handleForm = async (e) => {
        e.preventDefault();
        const body = {
            email: email,
            password: pwd
        } /* тело объекта боди отправится */
        if (isReg) {
            body.name = name
            body.group = "12"
        } /* при удачной регистрации */
        console.log(body);

        // `https://api.react-learning.ru/signup`
        // {
        // 	group: "12",
        // 	password: "123",
        // 	email: "lou8@mail.ru"
        // }

        /* версия: асихронная функция фетч-запроса */
        const path = `https://api.react-learning.ru/${isReg ? "signup" : "signin"}`;
        const res = await fetch(path, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(body)
        })
        const data = await res.json();
        console.log(data);
        if (isReg) {
            if (data?._id) {
                setIsReg(false);
            }
        } else {
            if (data && data.token) {
                localStorage.setItem("token12", data.token);
            }
            if (data?.data) {
                localStorage.setItem("user12", data.data.name);
                setUser(data.data.name);
                localStorage.setItem("user12-id", data.data._id);
                clearForm();
                setIsActive(false);
            }
        }

        // v2
        // fetch(path, {
        // 	method: "POST",
        // 	headers: {
        // 		"Content-Type": "application/json"
        // 	},
        // 	body: JSON.stringify(body)
        // })
        // 	.then(res => res.json())
        // 	.then(data => console.log(data))
    }

    const st = {
        display: isActive ? "flex" : "none"
    } /* стили */

    return <div className="modal-wrapper" style={st}>
        <div className="modal">
            <button
                className="modal-close"
                onClick={(e) => setIsActive(false)}
            >
                <XOctagon />
            </button>
            <h3>{isReg ? "Регистрация" : "Вход"}</h3>
            <form onSubmit={handleForm}>
                {isReg && <input
                    type="text"
                    placeholder="Ваше имя"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />}
                <input
                    type="email"
                    placeholder="Ваш электронный адрес"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <input
                    type="password"
                    placeholder="Ваш пароль"
                    value={pwd}
                    onChange={(e) => setPwd(e.target.value)}
                />
                {isReg && <input
                    type="password"
                    placeholder="Повторите пароль"
                    value={pwd2}
                    onChange={(e) => setPwd2(e.target.value)}
                />}
                <div className="modal-btns">
                    {/* Если у меня форма регистрации и пароли не равны или не введен пароль - кнопка не активна */}
                    <button type="submit" disabled={isReg && (!pwd || pwd !== pwd2)}>
                        {isReg ? "Зарегистрироваться" : "Войти"}
                    </button>
                    <a className="modal-link" onClick={changeForm}>
                        {isReg ? "Войти" : "Зарегистрироваться"}
                    </a>
                </div>
            </form>
        </div>
    </div>
}

export default Modal;