import { useContext, useState } from "react";
import { XLg } from "react-bootstrap-icons"; /* иконка закрытия модалки */
import "./style.css";
import { Button } from "../Button/Button";
import AppContext from "../../context/context";

const Modal = ({ active, setActive, setUser }) => {
	const [authorisation, setAuth] = useState(true);
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [pwd, setPwd] = useState("");
	const [testPwd, setTestPwd] = useState("");
	const { api } = useContext(AppContext);

	const switchAuth = (e) => {
		e.preventDefault();
		setAuth(!authorisation);
		clearForm();
	}

	const clearForm = () => {
		setName("");
		setEmail("");
		setPwd("");
		setTestPwd("");
	}

	const sendForm = async (e) => {
		e.preventDefault();
		let body = {
			email: email,
			password: pwd
		}
		if (!authorisation) {
			body.name = name;
			body.group = "group-12";
		}

		let data = await (authorisation ? api.authorisation(body) : api.registration(body))
		if (!data.err) {
			if (!authorisation) {
				delete body.name;
				delete body.group;
				let dataLog = await api.authorisation(body);
				if (!dataLog.err) {
					localStorage.setItem("user", dataLog.data.name);
					localStorage.setItem("token", dataLog.token);
					localStorage.setItem("id", dataLog.data._id);
					clearForm();
					setActive(false);
					setUser(dataLog.data.name);
				}
			} else {
				if (!data.err) {
					localStorage.setItem("user", data.data.name);
					localStorage.setItem("token", data.token);
					localStorage.setItem("id", data.data._id);
					clearForm();
					setActive(false);
					setUser(data.data.name);
				}
			}

		}

	}
	return <div
		className="modal-wrapper"
		style={{ display: active ? "flex" : "none" }}
	>
		<div className="modal">
			<div onClick={() => setActive(false)}><XLg /></div>
			<h3>Авторизация</h3>
			<form onSubmit={sendForm}>
				{!authorisation && <label>
					Имя пользователя
					<input
						type="text"
						value={name}
						onChange={(e) => setName(e.target.value)}
					/>
				</label>}
				<label>
					Электронный адрес
					<input
						type="email"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
					/>
				</label>
				<label>
					Пароль
					<input
						type="password"
						value={pwd}
						onChange={(e) => setPwd(e.target.value)}
					/>
				</label>
				{!authorisation && <label>
					Повторить пароль
					<input
						type="password"
						value={testPwd}
						onChange={(e) => setTestPwd(e.target.value)}
						style={{ border: "1px solid", backgroundColor: "blueviolet" }}
					/>
				</label>}
				<div className="modal-ctl">
					<Button
						className="modal-link"
						disabled={!authorisation && (!pwd || pwd !== testPwd)}
					>
						{authorisation ? "Войти" : "Создать аккаунт"}
					</Button>
					<a
						href=""
						className="modal-link"
						onClick={switchAuth}
					>
						{authorisation ? "Регистрация" : "Войти"}
					</a>
				</div>
			</form>
		</div>
	</div>
}

export default Modal;