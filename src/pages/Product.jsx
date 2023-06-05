import React, { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";

import Loader from "../components/Loader";
import ButtonBack from "./ButtonBack";
import AppContext from "../context/AppContext";
import {Basket2, Plus} from "react-bootstrap-icons"
import { Button } from "../components/Button/Button";


const Product = () => {
  const [product, setProduct] = useState({});
  const { id } = useParams();
  const [revText, setRevText] = useState("");
	const [revRating, setRevRating] = useState(0);
	const [hideForm, setHideForm] = useState(true);
  const { api, userId, setServerGoods } = useContext(AppContext);
  const navigate = useNavigate();
  const tableInfo = [
		{
			name:"wight",
			text: "Вес"
		},
		{
			name:"author",
			text: "Продавец"
		},
		{
			name:"description",
			text: "Описание товара"
		}
	]

	const addReview = (e) => {
		e.preventDefault();
		api.setReview(product._id, {
			text: revText,
			rating: revRating
		}).then(d => {
			setProduct(d);
			setRevText("");
			setRevRating(0);
			setHideForm(true);
		})
	}

	const delReview = (id) => {
		api.delReview(product._id, id).then(d => {
			setProduct(d);
		})
	}

  useEffect(() => {
api.getProductsByID(id)
			.then(product => {
				setProduct(product);
			})
            .catch(error => console.error("Что-то пошло не так...(", error))
  }, []);

  	const delHandler = () => {
		api.delProduct(id)
			.then(product => {
				console.log(product)
				setServerGoods(prev => prev.filter(el => el._id !== id));
				navigate("/catalog");
			})
	}

    return <div className="product__container">
      <ButtonBack />
{product.name
				? <>
					<div>
						<div>
							{product.author._id === userId && <Basket2 onClick={delHandler}/>}
						</div>
						<h1>{product.name}</h1>
					</div>
					<div>
						<img src={product.pictures} alt={product.name} className="product__picture"/>
					</div>
					<mark>Обычная цена: {product.price}₽</mark>
					<div className={`${product.discount ? "text-danger" : "text-secondary"} product__mark`}>{`Цена со скидкой: `}
						{Math.ceil(product.price * (100 - product.discount) / 100)} ₽
					</div>					
					<div>
							<tbody>
								{tableInfo.map((el, i) => <tr key={i}>
									<th className="" >{el.text}</th>
									<td>{el.name === "author"
										? <>
											<span className="">Имя: {product[el.name].name}<br/>Адрес: {product[el.name].email}</span>
										</>
										: product[el.name]
									}</td>
								</tr>)}
							</tbody>
					</div>
					{product.reviews.length > 0 ? <div>
						<h2>Отзывы</h2>
						<div className="">
							{product.reviews.map(el => <div key={el._id}>
									<div className="">
										<div>
											<span className="">
												<span style={{
													width: "30px",
													height: "30px",
													display: "block",
													backgroundPosition: "center",
													backgroundRepeat: "no-repeat",
													backgroundSize: "cover",
													backgroundImage: `url(${el.author.avatar})`,
													marginRight: "1em",
													borderRadius: "50%"
												}}/>
												<span>
													{el.author.name}
												</span>
											</span>
											<div>{el.rating}</div>
											<div className="">{el.text}</div>
											{el.author._id === userId && <span className="">
												<Basket2 onClick={() => delReview(el._id)}/>												
											</span>}
										</div>
									</div>
								</div>
							)}
							{hideForm && <div>
								<Button
									variant="outline-info"
									className="secondary"
									onClick={() => setHideForm(false)}
								>
									<Plus/>
								</Button>
							</div>}
						</div>
					</div>
					: hideForm && <div><Button variant="outline-info" onClick={() => setHideForm(false)}>Написать отзыв</Button></div>
					}
					{!hideForm && <div className="">
						<h3>Новый отзыв</h3>
						<div onSubmit={addReview}>
							<div className="mb-3">
								<div htmlFor="rating">Рейтинг (0-5)</div>
								<div
									type="number"
									min={1}
									max={5}
									step={1}
									id="rating"
									value={revRating}
									onChange={(e) => setRevRating(+e.target.value)}
								/>
							</div>
							<div  className="">
								<div htmlFor="text">Комментарий:</div>
								<div
									as="textarea"
									type="text"
									id="text"
									value={revText}
									rows={3}
									onChange={(e) => setRevText(e.target.value)}
								/>
							</div>
							<Button
								type="reset"
								className="product__btn"
								onClick={(e) => {
									e.preventDefault();
									setRevText("");
									setRevRating(0);
									setHideForm(true);
								}}
							>Отмена</Button>
							<Button type="submit" className="product__btn">Добавить</Button>
							</div>
					</div>}
				</>
				// : <div>
				// <div className="info" style={{textAlign: "center"}}>
				// Товара {id} не существует<br/>или<br/>он еще не загружен
				// </div>
				// </div>
				: <Loader/>
		}
    </div>
}

export default Product;

