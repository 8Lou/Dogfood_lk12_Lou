import { Link } from "react-router-dom";
import BsCard from "../components/BsCard/index";
import Promo from "../components/example/Example";

const promoData = [
  "Карточка1",
  "Карточка2",
  "Карточка3",
  "Карточка4",
  "Карточка5",
];

const OldData = ({ searchText, goods }) => {
  return (
    <>
      <h1>Старая страница</h1>
      <nav>
        <Link to="/">Стр 1</Link>
        <Link to="/catalog">Стр 2</Link>
        <Link to="/old">Стр 3</Link>
      </nav>
      <div className="container">
        {searchText && <p className="search-result">{searchText}</p>}
        {goods.map((pro, i) => (
          <BsCard
            key={i}
            img={pro.pictures}
            name={pro.name}
            price={pro.price}
          />
        ))}
        {promoData.map((el) => (
          <Promo key={el} text={el} />
        ))}
      </div>
    </>
  );
};

export default OldData;
