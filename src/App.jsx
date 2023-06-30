import React, { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import Modal from "./components/Modal/index";
import { Header, Footer } from "./components/Main";
import Home from "./pages/Home";
import Catalog from "./pages/Catalog";
import Profile from "./pages/Profile";
import Product from "./pages/Product";
import FavoritePage from "./pages/FavoritePage";
import Search from "./components/Search";
import AppContext from './context/context';
import Api from "./utils/Api";
import Basket from "./pages/Basket";

const App = () => {
  const [user, setUser] = useState(localStorage.getItem("user"));
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [userId, setUserId] = useState(localStorage.getItem("id"));
  const [serverGoods, setServerGoods] = useState([]);
  const [goods, setGoods] = useState(serverGoods);  // Товары для филтрации
  const [modalActive, setModalActive] = useState(false);
  const [text, setText] = useState("");
  const [api, setApi] = useState(new Api(token));

  let bStore = localStorage.getItem("basket");
  if (bStore) {
    bStore = JSON.parse(bStore);
  } else {
    bStore = [];
  }
  const [basket, setBasket] = useState(bStore);

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
          console.log(data);
          setServerGoods(data.products);
        })
    } else {
      setServerGoods([]);
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
            <Route path="/" element={<Home />} />
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