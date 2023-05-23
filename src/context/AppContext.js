import { createContext } from "react";

export default createContext({
    name: "Vasya",
    theme: "DARK",
    getRandom: (max = 11, min = 0) => {
        Math.floor(Math.random() * (max - min) + min)
    },
    // TODO: создать контекст для корзины, работающий с LS
    goods: [],
    setGoods: () => { }
})
