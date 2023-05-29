import { useState } from "react";
import { XLg } from "react-bootstrap-icons"; /* иконка закрытия модалки */
import "./style.css";
import { Button } from "../Button/Button";

const Modal = ({active, setActive, setUser}) => {
	const [auth, setAuth] = useState(true);
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [pwd, setPwd] = useState("");
	const [testPwd, setTestPwd] = useState("");

	const testAccess = {
		color: pwd === testPwd ? "red" : "green"
	}

	const switchAuth = (e) => {
		e.preventDefault();
		setAuth(!auth);
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
		if (!auth) {
			body.name = name;
			body.group = "group-12";
		}
		let log = "https://api.react-learning.ru/signin";
		let reg = "https://api.react-learning.ru/signup";

		let res = await fetch(auth ? log : reg, {
			method: "POST",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify(body)
		})
		let data = await res.json()
		if (!data.err) {
			if (!auth) {
				delete body.name;
				delete body.group
				let resLog = await fetch(log, {
					method: "POST",
					headers: {
						"Content-Type": "application/json"
					},
					body: JSON.stringify(body)
				})
				let dataLog = await resLog.json()
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
		style={{display: active ? "flex" : "none"}}
	>
		<div className="modal">
			<div onClick={() => setActive(false)}><XLg /></div>
			<h3>Авторизация</h3>
			<form onSubmit={sendForm}>
				{!auth && <label>
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
				{!auth && <label>
					Повторить пароль
					<input 
						type="password" 
						value={testPwd} 
						onChange={(e) => setTestPwd(e.target.value)}
						style={{border: "1px solid", backgroundColor: "blueviolet"}}
					/>
				</label>}
				<div className="modal-ctl">
					<Button 
						className="modal-link"
						disabled={!auth && (!pwd || pwd !== testPwd)}
					>
						{auth ? "Войти" : "Создать аккаунт" }
					</Button>
					<a 
						href=""
						className="modal-link"
						onClick={switchAuth}
					>
						{auth ? "Регистрация" : "Войти"}
					</a>
				</div>
			</form>
		</div>
	</div>
}

export default Modal;