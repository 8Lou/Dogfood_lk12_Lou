import Card from "../components/Card/Card";

const Catalog = ({goods}) => {
    console.log(goods);
    return <div className="container">
        <h1 style={{margin: 0, gridColumnEnd: "span 4"}}>Каталог</h1>
        {goods.map((pro, i) => (
            <Card key={i} img={pro.pictures} name={pro.name} price={pro.price} />
        ))}
    </div>
}

export default Catalog;