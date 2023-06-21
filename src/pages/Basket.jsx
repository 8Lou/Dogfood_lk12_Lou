import { useContext } from "react";
import { Link } from "react-router-dom";

import AppContext from "../context/context";
import { Button } from "../components/Button/Button";
import ButtonBack from "./ButtonBack";

const Basket = () => {
    const { basket, setBasket } = useContext(AppContext);
    const setPrice = ({ price, count, discount }) => {
        return price * count * (1 - discount / 100)
    }
    const sum = basket.reduce((acc, el) => {
        return acc + el.count * el.price
    }, 0)
    const sale = basket.reduce((acc, el) => {
        return acc + el.count * el.price * (1 - el.discount / 100)
    }, 0)
    const increment = (id) => {
        setBasket(prev => prev.map(el => {
            if (el.id === id) {
                el.count++;
            }
            return el;
        }))
    }
    const decrement = (id, count) => {
        if (count === 1) {
            setBasket(prev => prev.filter(el => el.id !== id))
        } else {
            setBasket(prev => prev.map(el => {
                if (el.id === id) {
                    el.count--;
                }
                return el;
            }))
        }
    }
    return <>
        <span style={{
            fontSize: '.8em', padding: '60px', margin: "60px"
        }}>
            < h1 > Моя корзина</h1 >
            <ButtonBack />
        </span >
        <table>
            <thead>
                <tr>
                    <td>Изображение</td>
                    <td>Название</td>
                    <td>Количество</td>
                    <td>Цена</td>
                    <td>Скидка</td>
                    <td>Цена со скидкой</td>
                </tr>
            </thead>
            <tbody>
                {basket.map(el => <tr key={el.id}>
                    <td>
                        <img src={el.img} alt={el.name} height="50" />
                    </td>
                    <td>
                        <Link to={`/product/${el.id}`} style={{ color: "#c37edb" }}>{el.name}</Link>
                    </td>
                    <td>
                        <Button onClick={() => decrement(el.id, el.count)}>-</Button>
                        <span style={{ padding: "0 10px" }}>{el.count}</span>
                        <Button onClick={() => increment(el.id)}>+</Button>
                    </td>
                    <td>{el.price * el.count}&nbsp;₽</td>
                    <td>{el.discount > 0 && `${el.discount}%`}</td>
                    <td>{el.discount > 0 && <>{setPrice(el).toFixed(2)}&nbsp;₽</>}</td>
                </tr>)}
            </tbody>
            <tfoot>
                <tr>
                    <td colSpan={3}>Cумма:</td> {/* colSpan сколько столбцов пересекает ячейка */}
                    <td colSpan={3}>{sale.toFixed(2)} ₽<del>{sum}  ₽</del></td>
                </tr>
            </tfoot>
        </table >
    </>
}

export default Basket;