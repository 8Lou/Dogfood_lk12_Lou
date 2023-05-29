import { useContext } from "react";
import BsCard from "../components/BsCard";
import AppContext from "../context/AppContext";

const Favorites = () => {    
    const { goods, userId, setServerGoods } = useContext(AppContext)
    return <div className="container">
        {goods.filter(el => el.likes.includes(userId)).map(g => <BsCard 
            {...g} 
            key={g._id}
            img={g.pictures}
        />)}
    </div>
}

export default Favorites;