import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
/* SPA - Single Page Application - Приложение с одной страницей */
/* import testData from "./assents/data.json"; */ //тест товары

import Card from "./components/Card/Card"; // Card.jsx
/* import Promo from "./components/Promo/Promo"; */

// Подключить компоненты
import Modal from "./components/Modal";
import { Header, Footer } from "./components/General"; // index.jsx

//3 создать массив данных
/* const promoData = ["=)", "^_^", "O_o", "x_x", "=(", ";(", "0l0"]; */
// .map() => преобразовывает один елемент массива в другой элемент (для всех без исключения)

// Подключить страницы
import Home from "./pages/Home";
import Catalog from "./pages/Catalog";
import OldPage from "./pages/Old";

/* console.log(testData); */

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
  const [user, setUser] = useState(localStorage.getItem("user12"));
  const [userId, setUserId] = useState(localStorage.getItem("user12-id"));
  const [token, setToken] = useState(localStorage.getItem("token12"));
  // Сохранить в переменную user значение, кот находится внутри useState

  /*
        Есть массив с товарами (основной) [a,b,c] => [b,c] => [a]???
        | |
         U
        Есть массив с товарами фильтруемый [b,c], [a]
    */

  const [baseData, setBaseData] = useState([]);
  const [goods, setGoods] = useState(baseData);

  const [searchResult, setSearchResult] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  // Сохранить в переменную user значение, что находится внутри useState

  useEffect(() => {
    if (user) {
      setUserId(localStorage.getItem("user12-id"));
      setToken(localStorage.getItem("token12"));
    } else {
      localStorage.removeItem("user12-id");
      localStorage.removeItem("token12");
      setUserId(null);
      setToken(null);
    }
  }, [user]);

  useEffect(() => {
    console.log("token", token);
    if (token) {
      fetch("https://api.react-learning.ru/products", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          setBaseData(data.products); /* отправить изменения */
        });
    }
  }, [token]);

  useEffect(() => {
    setGoods(baseData);
  }, [baseData]);

  return (
    <>
      {/* upd - передали функцию setUser внутрь компонента Header, чтобы внутри использовать ее как слово upd() */}
      <Header
        user={user}
        upd={setUser}
        /* searchArr={testData} */
        setGoods={setGoods}
        setSearchResult={setSearchResult}
        setModalOpen={setModalOpen}
      />
      {/* <h1>First Page</h1> */}
      {/* <div className="container"> */} {/* контейнер карт */}
      {/* {testData.map((pro, i) => ( */} {/* модификация объектов массива */}
      {/*  {searchResult && <p className="search-result">{searchResult}</p>} */}
      {/* {goods.map((pro, i) => (
                    <Card key={i} img={pro.pictures} name={pro.name} price={pro.price} />
                ))} */}
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
      {/*  {promoData.map(el => <Promo key={el} text={el} />)} */}
      {/* </div> */}
      <Routes>
        <Route
          path="/"
          element={<Home user={user} setActive={setModalOpen} />}
        />{" "}
        {/* главная страница / */}
        <Route path="/catalog" element={<Catalog goods={goods} />} />
        <Route
          path="/old"
          element={<OldPage searchText={searchResult} goods={goods} />}
        />
      </Routes>
      <Footer />
      <Modal
        isActive={modalOpen}
        setIsActive={setModalOpen}
        setUser={setUser}
      />
    </>
  );
};

export default App;
