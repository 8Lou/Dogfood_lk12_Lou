import { Link } from 'react-router-dom';

import Logo from './Logo';
import {
  Heart,
  Cart4,
  PersonCircle,
  HouseDoorFill,
} from 'react-bootstrap-icons';

import Search from '../Search';

// const Header = (props) => {
//     console.log(props.user)
// }
// const Header = ({user}) => {
//     console.log(user)
// }

const Header = ({
  user,
  upd,
  searchArr,
  setGoods,
  setSearchResult,
  setModalOpen,
}) => {
  const login = () => {
    setModalOpen(true);
    /* localStorage.setItem("user-12", "Di");
        upd("Lou"); */
  };

  // const logout = () => {
  //     localStorage.removeItem("user-12");
  //     upd(null);
  // }

  return (
    <header>
      <Logo />
      <div className='search-block'>
        <Search
          data={searchArr}
          setGoods={setGoods}
          setSearchResult={setSearchResult}
        />
      </div>
      <nav className='header__menu'>
        {user && (
          <>
            {/* <a href=""> */} {/* замена */}
            <Link to='/'>
              <Heart title='Избранное' />
            </Link>
            {/*  </a> */}
            <Link to='/'>
              <Cart4 title='Корзина' />
            </Link>
            <Link to='/profile'>
              <PersonCircle title='Личный кабинет' />
            </Link>
          </>
        )}
        <span>{!user && <HouseDoorFill title='Войти' onClick={login} />}</span>
      </nav>
    </header>
  );
};

export default Header;
