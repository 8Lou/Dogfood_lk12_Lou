import React, { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";

import Loader from "../components/Loader";
import ButtonBack from "./ButtonBack";
import AppContext from "../context/context";
import { Basket2, Plus } from "react-bootstrap-icons"
import { Button } from "../components/Button/Button";
import { FormReview } from '../components/Forms/form-review';
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { INITIAL_VALUE_RATING } from "../utils/Utils";
import { fetchSetReview } from "../storage/slices/singleProductSlice";


const Product = ({ name, _id }) => {
	const [product, setProduct] = useState({});
	const { id } = useParams();

	const [revText, setRevText] = useState("");
	const [rating, setRating] = useState(0);
	const [hideForm, setHideForm] = useState(true);
	const { api, userId, setServerGoods } = useContext(AppContext);
	const navigate = useNavigate();
	const { registration, handleSubmit, formState: { errors }, reset } = useForm({ mode: "onBlur" })
	const tableInfo = [
		{
			name: "wight",
			text: "Вес"
		},
		{
			name: "author",
			text: "Продавец"
		},
		{
			name: "description",
			text: "Описание товара"
		}
	]

	/* const addReview = (e) => {
		e.preventDefault();
		api.setReview(product._id, {
			text: revText,
			rating: rating
		}).then(d => {
			setProduct(d);
			setRevText("");
			setRating(0);
			setHideForm(true);
		})
	} */
	const dispatch = useDispatch();
	const setReview = (e) => {
		dispatch(fetchSetReview(product._id, {
			text: revText,
			rating: rating
		}))
			.then(() => {
				setProduct();
				setRevText("");
				setRating(0);
				setHideForm(true); reset();
				setRating(INITIAL_VALUE_RATING)
			})
	}
	const delReview = (id) => {
		api.delReview(product._id, id).then(d => {
			setProduct(d);
		})
	}

	useEffect(() => {
		api.getSingleProduct(id)
			.then(product => {
				setProduct(product);
			})
			.catch(error => console.error("Что-то пошло не так...(", error))
	}, []);

	const delHandler = () => {
		api.delSingleProduct(id)
			.then(product => {
				setServerGoods(prev => prev.filter(el => el._id !== id));
				navigate("/catalog");
			})
	}

	const del = () => {
		api.delSingleProduct(id)
			.then(data => {
				setServerGoods(prev => prev.filter(el => el._id !== id))
				navigate("/catalog")
			})
	}

	return <div className="product__container">
		<ButtonBack />
		{product.name
			? <>
				<div>
					<div>
						{product.author._id === userId && <Basket2 onClick={delHandler} />}
					</div>
					<h1>{product.name}</h1>
				</div>
				<div>
					<img src={product.pictures} alt={product.name} className="product__picture" />
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
									<span className="">Имя: {product[el.name].name}<br />Адрес: {product[el.name].email}</span>
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
										}} />
										<span>
											{el.author.name}
										</span>
									</span>
									<div>{el.rating}</div>
									<div className="">{el.text}</div>
									{el.author._id === userId && <span className="">
										<Basket2 onClick={() => delReview(el._id)} />
									</span>}
								</div>
							</div>
						</div>
						)}
						{hideForm && <div>
							<Button
								variant="outline-info"
								className=""
								onClick={() => setHideForm(false)}
							>
								<Plus />
							</Button>
						</div>}
					</div>
				</div>
					: hideForm && <div><Button variant="outline-info" onClick={() => setHideForm(false)}>Написать отзыв</Button></div>
				}
				{!hideForm && <div className="">
					<FormReview title={`Отзыв о товаре ${name}`} productID={_id} />
					<Button
						type="reset"
						className="product__btn"
						onClick={(e) => {
							e.preventDefault();
							setRevText("");
							setRating(0);
							setHideForm(true);
						}}
					>Отмена</Button>
				</div>}
			</>
			: <Loader />
		}
	</div >
}

export default Product;

