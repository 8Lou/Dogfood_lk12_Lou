import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { ErrorPage } from "./ErrorPage";
import { Button } from "react-bootstrap";
import { Back } from "react-bootstrap-icons";

const Product = () => {
	const { id } = useParams()
	const [data, setData] = useState({});

	useEffect(() => {
		fetch(`https://api.react-learning.ru/products/${id}`, {
			headers: {
				"Authorization": `Bearer ${localStorage.getItem("token12")}`
			}
		})
			.then(res => res.json())
			.then(serverData => {
				
				setData(serverData);
			})
	}, [id]) //квадратные внутри круглых - точка останова - useEffect выполнить 1 раз

return <>
		<Link to={`/catalog#pro_${id}`}>Назад</Link>
		{data.name 
			? <>
				<h1>{data.name}</h1>
				<img src={data.pictures} alt={data.name} />
			</> 
			: <div className="info" style={{textAlign: "center"}}>
				Товара {id} не существует<br/>или<br/>он еще не загружен
			</div>
		}
	</>
}

export default Product;
