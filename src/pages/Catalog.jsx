import BsCard from "../components/BsCard"
import { useContext, useState } from "react";
import { AppContext } from "../context/AppContext";
import { Button } from "../components/Button/Button";

const Catalog = () => {
    const { goods, setServerGoods } = useContext(AppContext)
    const [sort, setSort] = useState(null)
    const filterSt = {
        gridColumnEnd: "span 4",
        display: "flex",
        gap: "20px"
    }
    const sortHandler = (vector) => {
        if (vector === sort) {
            setSort(null)
            goods.sort((a, b) => new Date(a.created_at).getTime() - new Date(b.created_at).getTime());
        } else {
            setSort(vector)
            goods.sort((a, b) => {
                return vector === "up" ? (a.price - b.price) : (b.price - a.price)
            })
        }
    }
    return <div className="container">
        <div style={filterSt}>
            <Button 
                style={{color: '#88a3e2', backgroundColor: sort === "up" ? "#fc8dca" : "#aaecfc"}}
                onClick={() => sortHandler("up")}
            >По возростанию цены</Button>
            <Button
                style={{color: '#88a3e2', backgroundColor: sort === "down" ? "#fc8dca" : "#aaecfc"}}
                onClick={() => sortHandler("down")}
            >По убыванию цены</Button>
            <Button 
                style={{color: '#88a3e2', backgroundColor: sort === "up" ? "#fc8dca" : "#aaecfc"}}
                onClick={() => sortHandler("up")}>Новинки</Button>
            <Button 
                style={{color: '#88a3e2', backgroundColor: sort === "up" ? "#fc8dca" : "#aaecfc"}}
                onClick={() => sortHandler("up")}>Скидки</Button>
        </div>
        {goods.map(g => <BsCard 
            key={g._id} 
            {...g} 
            img={g.pictures} 
            setServerGoods={setServerGoods}
        />)}   
    </div>
}

export default Catalog;
