import { useState } from "react";

import testData from "./assents/data.json";
import Card from "./components/Card/Card"; // Card.jsx
import Promo from "./components/Promo/Promo";
import { Header, Footer } from "./components/General";// index.jsx

//3 создать массив данных
const promoData = ["=)", "^_^", "O_o", "x_x", "=(", ";(", "0l0"];
// .map() => преобразовывает один елемент массива в другой элемент (для всех без исключения)

console.log(testData);
//1
/* const Promo = (props) => {
    // props - объект - используется для передачи разных значений внутрь компонента
    return <div className="promo__block">
        <div className="promo__img" />
        <p className="promo__text">{props.text || "-"}</p>
    </div>
} */
//2 связка и создание компонента
const App = () => {
    /*     const smiles = []
        for (let i = 0; i < promoData.length; i++) { //для каждого товара вернуть
            if (i % 2) { // остаток от деления = true => !0
                smiles.push(<Promo key={`sm${i}`} text={promoData[i]} />)
            }
        } */
    // const user = localStorage.getItem("user12");
    const [user, setUser] = useState(localStorage.getItem("user12"))
    // Сохрани в переменную user то значение, что находится внутри useState
    return (
        <>
            {/* upd - передали функцию setUser внутрь компонента Header, чтобы внутри использовать ее как слово upd() */}
            <Header />
            <div>
                {/* <h1>First Page</h1> */}
                <div className="container"> {/* контейнер карт */}
                    {testData.map((pro, i) => ( /* модификация объектов массива */
                        <Card key={i} img={pro.pictures} name={pro.name} price={pro.price} />
                    ))}
                    {/* <Promo text="First"/>
                    <Promo text="Second"/>
                    <Promo text={4 * 10}/>
                    <Promo/> */}
                    {
                        // [<span>1</span>,2,<div>3</div>,4,<a href="">5</a>]
                    }
                    {/* {promoData.map(el => <Promo key={`${el}1`} text={el} />)}
                    <Promo />
                    {promoData.map(el => <Promo key={`${el}2`} text={el} />)}

                    <Promo text={promoData[1]} />
                    <Promo text={promoData[2]} />
                    {smiles} */}
                    {promoData.map(el => <Promo key={el} text={el} />)}
                </div>
            </div>
            <Footer />
        </>
    )
}

export default App;