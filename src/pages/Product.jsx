import React, { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";

import Loader from "../components/Loader";
import ButtonBack from "./ButtonBack";
import AppContext from "../context/AppContext";
import { Trash3 } from "react-bootstrap-icons";
import Reviews from "../components/Reviews/Reviews";
import {Basket2, Plus} from "react-bootstrap-icons"
import { Button } from "../components/Button/Button";


const Product = () => {
  const [product, setProduct] = useState({});
  const { id } = useParams();
  const [revText, setRevText] = useState("");
	const [revRating, setRevRating] = useState(0);
	const [hideForm, setHideForm] = useState(true);
  const { api, userId, setServerGoods } = useContext(AppContext);
  const [data, setData] = useState({});
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
		api.setReview(data._id, {
			text: revText,
			rating: revRating
		}).then(d => {
			setData(d);
			setRevText("");
			setRevRating(0);
			setHideForm(true);
		})
	}

	const delReview = (id) => {
		api.delReview(data._id, id).then(d => {
			setData(d);
		})
	}

  useEffect(() => {
    fetch(`https://api.react-learning.ru/products/${id}`, {
      headers: {
                "Authorization": `Bearer ${localStorage.getItem("token")}`
            }
    })
            .then(res => res.json())
            .then(data => {
        if (!data.err) {
          setProduct(data);
        }
      })
            .catch(error => console.error("Что-то пошло не так...(", error))
  }, []);

  	const delHandler = () => {
		api.delSingleProduct(id)
			.then(data => {
				console.log(data)
				setServerGoods(prev => prev.filter(el => el._id !== id));
				navigate("/catalog");
			})
	}

    return <>
        {/* { product.name 
            ? <>
          <h1>{product.name}</h1>
          <img src={product.pictures} alt={product.name} />
          <mark className="product__mark">{product.price}₽</mark>
        	</>
			            : <Loader/>
        } */}
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
						<img src={product.pictures} alt={product.name} className="w-100"/>
					</div>
					<div className=''>
						{Math.ceil(product.price * (100 - product.discount) / 100)} ₽
					</div>
					<div>
						<div>
							<tbody>
								{tableInfo.map((el, i) => <tr key={i}>
									<th className="fw-normal text-secondary small w-25" >{el.text}</th>
									<td>{el.name === "author"
										? <>
											<span className="me-3">Имя: {product[el.name].name}</span>
											<span>Адрес: {product[el.name].email}</span>
										</>
										: product[el.name]
									}</td>
								</tr>)}
							</tbody>
						</div>
					</div>
					{product.reviews.length > 0 ? <div>
						<h2>Отзывы</h2>
						<div className="">
							{product.reviews.map(el => <div>
									<div className="">
										<div>
											<span className="d-flex w-100 align-items-center mb-2">
												<span style={{
													width: "30px",
													height: "30px",
													display: "block",
													backgroundPosition: "center",
													backgroundRepeat: "no-repeat",
													backgroundSize: "cover",
													backgroundImage: `url(${el.author.avatar})`,
													marginRight: "1rem",
													borderRadius: "50%"
												}}/>
												<span>
													{el.author.name}
												</span>
											</span>
											<div>{el.rating}</div>
											<div className="">{el.text}</div>
										</div>
									</div>
								</div>
							)}
							{hideForm && <div>
								<Button
									variant="outline-info"
									className="fs-1 w-100 h-100"
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
						<div>
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
								className="me-2"
								onClick={(e) => {
									e.preventDefault();
									setRevText("");
									setRevRating(0);
									setHideForm(true);
								}}
							>Отмена</Button>
							<Button type="submit">Добавить</Button>
						</div>
					</div>}
				</>
				//: /* <div>
				//	<div className="info" style={{textAlign: "center"}}>
				//		Товара {id} не существует<br/>или<br/>он еще не загружен
				//	</div>
				//</div> */
				: <Loader/>
		}


    </>
}

export default Product;

