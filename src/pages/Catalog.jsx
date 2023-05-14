import { Container, Row, Col } from "react-bootstrap";
import BsCard from "../components/BsCard";

const Catalog = ({goods, setBaseData, userId}) => {
	
	return <Container className="d-block">
		<Row className="g-4">
			<Col xs={12}>
				<h1 style={{margin: 0, gridColumnEnd: "span 3"}}>Каталог</h1>
			</Col>
			{goods.map((pro, i) => (
				// {name, price, likes, _id} => name={pro.name} price={pro.price} _id={pro._id} likes={pro.likes}
				<Col key={i} xs={12} sm={6} md={4} lg={3}>
					<BsCard img={pro.pictures} {...pro} setBaseData={setBaseData} user={userId}/>
				</Col>
			))}
		</Row>
	</Container>
}

export default Catalog;

/* стили библиотеки Реакт-Бутстрап и адаптивные инструменты
xs, sm, md, lg для отображения на разных экранах;
d-block - display: block
g-4 - gap: 4

{
  /*  <div className='container'>
<h1 style={{ margin: 0, gridColumnEnd: 'span 4' }}>Каталог</h1> */

// {name, price, likes, _id} => name={pro.name} price={pro.price} _id={pro._id} likes={pro.likes}

/* <Card key={i} img={pro.pictures} name={pro.name} price={pro.price} /> */


/* const sortedItems = [
    { id: "Популярные", title: "POPULAR" },
    { id: "Новые", title: "NEWEST" },
    { id: "Все", title: "ALL" },
  ]; */
 {/* <div className="sort-cards">
        {sortedItems.map(e => (
          <span className="sort-item" key={e.id} onClick={() => onSort(e.id)}>
            {e.id}
          </span>
        ))}
      </div> */}