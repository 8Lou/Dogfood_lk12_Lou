import { useContext } from "react";
import { Link } from "react-router-dom";

import AppContext from "../context/context";
import { Button } from "../components/Button/Button";
import ButtonBack from "./ButtonBack";

const Basket = () => {
    const { basket, setBasket } = useContext(AppContext);
    const setPrice = ({ price, cnt, discount }) => {
        return price * cnt * (1 - discount / 100)
    }
    const sum = basket.reduce((acc, el) => {
        return acc + el.cnt * el.price
    }, 0)
    const sale = basket.reduce((acc, el) => {
        return acc + el.cnt * el.price * (1 - el.discount / 100)
    }, 0)
    const inc = (id) => {
        setBasket(prev => prev.map(el => {
            if (el.id === id) {
                el.cnt++;
            }
            return el;
        }))
    }
    const dec = (id, cnt) => {
        if (cnt === 1) {
            setBasket(prev => prev.filter(el => el.id !== id))
        } else {
            setBasket(prev => prev.map(el => {
                if (el.id === id) {
                    el.cnt--;
                }
                return el;
            }))
        }
    }
    return <>
        <h1 style={{ fontSize: '1.5em', margin: "0 60px" }}>Моя корзина</h1>
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
                        <Button onClick={() => dec(el.id, el.cnt)}>-</Button>
                        <span style={{ padding: "0 10px" }}>{el.cnt}</span>
                        <Button onClick={() => inc(el.id)}>+</Button>
                    </td>
                    <td>{el.price * el.cnt}&nbsp;₽</td>
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
        <ButtonBack style={{ margin: "0 60px" }} />
    </>
}

export default Basket;