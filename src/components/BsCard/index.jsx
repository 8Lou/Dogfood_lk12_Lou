import { useState } from "react";
import { Link } from "react-router-dom";
import { SuitHeart, SuitHeartFill } from "react-bootstrap-icons";
import { Card, Button } from "react-bootstrap";
import "./style.scss";

const BsCard = ({
  discount,
  likes,
  name,
  pictures,
  price,
  tags,
  _id,
  user,
  setBaseData,
}) => {
  const [isLike, setIsLike] = useState(likes.includes(user));

  const likeHandler = () => {
    setIsLike(!isLike);
    setBaseData((old) =>
      old.map((el) => {
        if (el._id === _id) {
          isLike
            ? (el.likes = el.likes.filter((lk) => lk !== user))
            : el.likes.push(user);
        }
        return el;
      })
    );
  };

  return (
    <Card className="pt-3 h-100" id={"pro_" + _id}>
      <span className="card-like" onClick={likeHandler}>
        {isLike ? <SuitHeartFill /> : <SuitHeart />}
      </span>
      <Card.Img
        variant="top"
        src={pictures}
        alt={name}
        className="align-self-center w-auto"
        height="100"
      />
      <Card.Body className="d-flex flex-column">
        <Card.Title as="h4">{price} ₽</Card.Title>
        <Card.Text className="text-secondary fs-5 flex-grow-1">
          {name}
        </Card.Text>
        <Button variant="info">Купить</Button>
      </Card.Body>
      {/* <Link to={`/product/${_id}`} className="card-link"></Link> */}
      <Link to="/product/" className="card-link"></Link>
    </Card>
  );
};

export default BsCard;

/* <div className="card-lite" id={"pro_" + _id}>
      <span className="card-like" onClick={likeHandler}>
        {isLike ? <SuitHeartFill /> : <SuitHeart />}
      </span>
      <img src={pictures} alt={name} />
      <h4>{price} ₽</h4>
      <p>{name}</p>
      <Button variant="info">Купить</Button>
      <Link to={`/product/${_id}`} className="card-link"></Link>
    </div>; */
