/* Создание карточки */
import "./card.css";
const Card = (props) => {
    return <div className="card-lite">
        <img src={props.img} alt={props.name}/>
        <h4>{props.price} ₽</h4>
        <p>{props.name}</p>
        <button className="btn">Купить</button>
    </div>
}

export default Card;