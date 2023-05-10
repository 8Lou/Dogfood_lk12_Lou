import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';

const Product = () => {
  const { id } = useParams(); //передается _id свойство товара из базы данных
  const [data, setData] = useState({}); //стэйт в квадратные скобки

  useEffect(() => {
    fetch(`https://api.react-learning.ru/products/${id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token12')}`,
      },
    })
      .then((res) => res.json())
      .then((serverData) => {
        console.log(id, serverData);
        setData(serverData);
      });
  }, []); //квадратные внутри круглых - точка останова - юзэффект выполнить 1 раз
  return (
    <>
      <Link to={`/catalog#pro_${id}`}>Назад</Link>
      {data.name ? ( //проверка имени товара
        <>
          <h1>{data.name}</h1>
          <img src={data.pictures} alt={data.name} />
        </>
      ) : (
        <div className='info' style={{ textAlign: 'center' }}>
          Товара {id} не существует
          <br />
          или
          <br />
          он еще не загружен
        </div>
      )}
    </>
  );
};

export default Product;
