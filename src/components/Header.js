import path from '../images/header-logo.svg';
import { Routes, Route, Link } from 'react-router-dom';

function Header() {
  return (
    <header className='header'>
      <img className='header__logo' src={path} alt='логотип' />
      <nav className='header__menu'>
        <Routes>
          <Route
            path='/'
            element={
              <div>
                <p className='header__email'>mail@mail.ru</p>
                <button className='header__button'>exit</button>
              </div>
            }
          />
          <Route
            path='/sign-in'
            element={<Link to='/sign-up'>Регистрация</Link>}
          />
          <Route path='/sign-up' element={<Link to='/sign-in'>Войти</Link>} />
        </Routes>
      </nav>
    </header>
  );
}

export default Header;
