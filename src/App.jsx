import React, { useState, useEffect} from 'react';
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
import AppContext from './context/AppContext';

const App = () => {
  const [user, setUser] = useState(localStorage.getItem("rockUser"));
  const [token, setToken] = useState(localStorage.getItem("rockToken"));
  const [userId, setUserId] = useState(localStorage.getItem("rockId"));
  const [serverGoods, setServerGoods] = useState([]);
  const [goods, setGoods] = useState(serverGoods);
  const [modalActive, setModalActive] = useState(false);
  // let key = "6c7fc5e6a754429ab47063a1b1a54774"
  //"https://newsapi.org/v2/everything?apiKey=6c7fc5e6a754429ab47063a1b1a54774&q=dogs"
  const [news, setNews] = useState([]);
  useEffect(() => {
        fetch("https://newsapi.org/v2/everything?q=животные&sources=lenta&apiKey=6c7fc5e6a754429ab47063a1b1a54774")
            .then(res => res.json())
            .then(data => {
                console.log(data);
                setNews(data.articles)
            })
    }, [])

  /* const config = {
    headers: {
        "Content-Type": "application/json",
        "authorization": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NDQ1NzNlZTMyOTFkNzkwYjMwNzNkOGQiLCJncm91cCI6IjEyIiwiaWF0IjoxNjgyMzIwMTUwLCJleHAiOjE3MTM4NTYxNTB9.JAgKY9HDB1n6OXtsYFOngnu5K8SMjmyQAMCOtLFK0Ao"
    },
    baseUrl: "https://api.react-learning.ru/products",
    baseUserUrl: "https://api.react-learning.ru/users"
} */

  useEffect(() => {
    if (token) {
      fetch("https://api.react-learning.ru/products", {
        headers: {
                    "Authorization": `Bearer ${token}`
                }
      })
                .then(res => res.json())
                .then(data => {
                    setServerGoods(data.products.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()));
        })
                .catch(error => console.error("Что-то пошло не так...(", error))
    }
    }, [token])

  useEffect(() => {
    if (!goods.length) {
      setGoods(serverGoods);
    }
  }, [serverGoods]);

  useEffect(() => {
    if (user) {
      setToken(localStorage.getItem("rockToken"));
      setUserId(localStorage.getItem("rockId"));
    } else {
      setToken("");
      setUserId("");
    }
  }, [user]);

  const Context = {
    setModalActive,
    serverGoods,
    user,
    setUser,
    goods,
    modalActive,
    goods,
    setGoods,
    news,
    userId,
    setServerGoods,
  }

  return (
    <>
      <AppContext.Provider value={Context}>
        <Header
          user={user}
          setModalActive={setModalActive}
          serverGoods={serverGoods}
        />
        <main>
                <Search arr={serverGoods} upd={setGoods}/>
          <Routes>
                    <Route path="/" element={<Home/>}/>
                    <Route path="/home" element={<Home/>}/>
                    <Route path="/catalog" element={<Catalog 
                  /* goods={goods}  */
                  setServerGoods={setServerGoods}
                    />}/>
                    <Route path="/favorites" element={<FavoritePage 
                  goods={goods}
                  userId={userId}
                  setServerGoods={setServerGoods}
                    />}/>
                    <Route path="/draft" element={<Draft/>}/>
                    <Route path="/profile" element={
                        <Profile user={user} setUser={setUser} color="pink"/>
                    }/>
                    <Route path="/product/:id" element={<Product/>}/>
          </Routes>
        </main>
            <Footer/>
        <Modal
          active={modalActive}
          setActive={setModalActive}
          setUser={setUser}
        />
      </AppContext.Provider >
    </>
    )
}

export default App;