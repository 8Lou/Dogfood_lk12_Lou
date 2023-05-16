import BsCard from "../components/BsCard";

const Favorites = ({goods, userId, setServerGoods}) => {
    return <div className="container">
        {goods.filter(el => el.likes.includes(userId)).map(g => <BsCard 
            {...g} 
            key={g._id}
            img={g.pictures}
            setServerGoods={setServerGoods}
        />)}
    </div>
}

export default Favorites;