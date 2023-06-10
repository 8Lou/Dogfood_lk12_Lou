import { useState, useEffect, useContext } from "react";
import "./style.css";
import { Button } from "../Button/Button";
import AppContex from "../../context/context";

const Search = ({ arr }) => {
  const { setGoods, text, setText } = useContext(AppContex);
  const [quantity, setQuantity] = useState(arr.length);
  const [count, updateCount] = useState(0);
  useEffect(() => {
    if (text) {
      let result = arr.filter((el) => new RegExp(text, "i").test(el.name));
      setGoods(result);
      setQuantity(result.length);
    } else {
      setGoods(arr);
      setQuantity(arr.length);
    }
  }, [arr]);
  let n = 1;
  const click = () => {
    updateCount(count + 1); // новое состояние
  };
  const searchByText = (e) => {
    let val = e.target.value;
    setText(val);
    // let result = arr.filter(el => el.name.toLowerCase().includes(val.toLowerCase()));
    let result = arr.filter((el) => new RegExp(val, "i").test(el.name));
    /* upd(result); */
    setGoods(result);
    setQuantity(result.length);
  };

  return (
    <div className="search">
      <input
        type="search"
        value={text}
        onChange={searchByText}
        className="search__input"
      />
      {<Button onClick={click}>Найти</Button>}
      <hr />
      <div>
        По вашему запросу « {text} » найдено {quantity} товаров
      </div>
    </div>
  );
};

export default Search;
