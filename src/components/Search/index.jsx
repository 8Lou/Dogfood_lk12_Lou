import { useState, useEffect } from "react";
import "./style.css";

const Search = ({arr, upd}) => {
	const [text, setText] = useState("");
	const [quantity, setQuantity] = useState(arr.length);
	const [count, updateCount] = useState(0);
	useEffect(() => {
		if (text) {
			let result = arr.filter(el => new RegExp(text, "i").test(el.name))
			upd(result);
			setQuantity(result.length);
		} else {
			upd(arr);
			setQuantity(arr.length)
		}
	}, [arr]);
	let n = 1;
	const click = () => {
		updateCount(count + 1); // новое состояние
	}
	const searchByText = (e) => {
		let val = e.target.value;
		setText(val);
		// let result = arr.filter(el => el.name.toLowerCase().includes(val.toLowerCase()));
		let result = arr.filter(el => new RegExp(val, "i").test(el.name))
		upd(result);
		setQuantity(result.length);
	}

	return (
		<div className="search">
			<input type="search" value={text} onChange={searchByText} className="search__input"/>
			{/*<input 
				type="search" 
				value={text} 
				onChange={(e) => setText(e.target.value)}/>*/}
			<button onClick={click}>Найти</button>
			<hr/>
			<div>По вашему запросу {text} найдено {quantity} подходящих товаров</div>
		</div>
	)
}

export default Search;