import React, { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import Modal from "./components/Modal/index";
import { Header, Footer } from "./components/Main"; // index.jsx
import Home from "./pages/Home";
import Catalog from "./pages/Catalog";
import Profile from "./pages/Profile";
import Product from "./pages/Product";
import FavoritePage from "./pages/FavoritePage";
import Search from "./components/Search";
import Draft from "./pages/Draft";
import AppContext from './context/context';
import Api from "./utils/Api";
import { Basket } from "react-bootstrap-icons";

const App = () => {
  const [user, setUser] = useState(localStorage.getItem("user"));
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [userId, setUserId] = useState(localStorage.getItem("id"));
  const [serverGoods, setServerGoods] = useState([]);
  const [goods, setGoods] = useState(serverGoods);  // Товары для филтрации
  const [modalActive, setModalActive] = useState(false);
  // Поиск
  const [text, setText] = useState("");
  const [api, setApi] = useState(new Api(token));
  let baskStore = localStorage.getItem("basket");
  if (baskStore) {
    baskStore = JSON.parse(baskStore);
  } else {
    baskStore = [];
  }
  const [basket, setBasket] = useState(baskStore);
  /* const [news, setNews] = useState([]); */

  // let key = "6c7fc5e6a754429ab47063a1b1a54774"
  //"https://newsapi.org/v2/everything?apiKey=6c7fc5e6a754429ab47063a1b1a54774&q=dogs"
  /* useEffect(() => {
        fetch(`https://newsapi.org/v2/everything?apiKey=${key}&q=${inp}&language=ru&pageSize=21`)
                .then(res => res.json())
            .then(res => res.json())
            .then(data => {
                setNews(data.articles)
            })
    }, []) */

  /* const config = {
    headers: {
        "Content-Type": "application/json",
        "authorization": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NDQ1NzNlZTMyOTFkNzkwYjMwNzNkOGQiLCJncm91cCI6IjEyIiwiaWF0IjoxNjgyMzIwMTUwLCJleHAiOjE3MTM4NTYxNTB9.JAgKY9HDB1n6OXtsYFOngnu5K8SMjmyQAMCOtLFK0Ao"
    },
    baseUrl: "https://api.react-learning.ru/products",
    baseUserUrl: "https://api.react-learning.ru/users"
} */

  useEffect(() => {
    setApi(new Api(token));
  }, [token])

  useEffect(() => {
    localStorage.setItem("basket", JSON.stringify(basket));
  }, [basket])

  useEffect(() => {
    if (api.token) {
      api.getProducts()
        .then(data => {
          /* const result = data.products.filter(el => el.tags.includes(""));
          setServerGoods(result.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())); */
        })
    }
  }, [api.token])

  useEffect(() => {
    if (!goods.length) {
      setGoods(serverGoods);
    }
  }, [serverGoods]);

  useEffect(() => {
    if (user) {
      setToken(localStorage.getItem("token"));
      setUserId(localStorage.getItem("id"));
    } else {
      setToken("");
      setUserId("");
    }
  }, [user]);

  const Context = {
    setModalActive,
    modalActive,
    serverGoods,
    goods,
    setGoods,
    setServerGoods,
    setUser,
    user,
    /* news, */
    userId,
    token,
    api,
    text,
    setText,
    basket,
    setBasket
  };

  return (
    <>
      <AppContext.Provider value={Context}>
        <Header
          user={user}
          setModalActive={setModalActive}
          serverGoods={serverGoods}
        />
        <main>
          <Search arr={serverGoods} upd={setGoods} />
          <Routes>
            <Route path="/home" element={<Home />} />
            <Route
              path="/catalog"
              element={
                <Catalog
                  setServerGoods={setServerGoods}
                />
              }
            />
            <Route
              path="/favorites"
              element={
                <FavoritePage
                  goods={goods}
                  userId={userId}
                  setServerGoods={setServerGoods}
                />
              }
            />
            <Route path="/draft" element={<Draft />} />
            <Route
              path="/profile"
              element={<Profile user={user} setUser={setUser} color="pink" />}
            />
            <Route path="/product/:id" element={<Product />} />
            <Route path="/basket" element={<Basket />} />
          </Routes>
        </main>
        <Footer />
        <Modal
          active={modalActive}
          setActive={setModalActive}
          setUser={setUser}
        />
      </AppContext.Provider>
    </>
  );
};

export default App;
