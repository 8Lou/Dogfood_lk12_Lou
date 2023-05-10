/* import Card from "../components/Card/Card"; */
import { Container, Row, Col } from 'react-bootstrap';
import BsCard from '../components/BsCard';

const Catalog = ({ goods, setBaseData, userId }) => { /* принять из Апп */
  console.log(goods);
  return <Container className="d-block">
    <Row className="g-4">
			<Col xs={12}>
				<h1 style={{margin: 0, gridColumnEnd: "span 3"}}>Каталог</h1>
			</Col>

   {/*  <div className='container'>
      <h1 style={{ margin: 0, gridColumnEnd: 'span 4' }}>Каталог</h1> */}

      {goods.map((pro, i) => (

        // {name, price, likes, _id} => name={pro.name} price={pro.price} _id={pro._id} likes={pro.likes}
        
        {/* <Card key={i} img={pro.pictures} name={pro.name} price={pro.price} /> */}

        <Col key={i} xs={12} sm={6} md={4} lg={3}>
					<BsCard img={pro.pictures} {...pro} setBaseData={setBaseData} user={userId}/> {/* отправить в Кард */}
				</Col>
      ))}
		</Row>
	</Container>
};

export default Catalog;