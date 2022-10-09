import path from '../images/header-logo.svg';
import { Routes, Route, Link } from 'react-router-dom';

function Header(props) {
  const { email, handleLogout } = props;
  return (
    <header className='header'>
      <img className='header__logo' src={path} alt='логотип' />
      <nav className='header__menu'>
        <Routes>
          <Route
            path='/'
            element={
              <div className='header__auth-info'>
                <p className='header__email'>{email}</p>
                <button className='header__button' onClick={handleLogout}>
                  Выйти
                </button>
              </div>
            }
          />
          <Route
            path='/sign-in'
            element={
              <div className='header__auth-info'>
                <Link className='header__link' to='/sign-up'>Регистрация</Link>
              </div>
            }
          />
          <Route
            path='/sign-up'
            element={
              <div className='header__auth-info'>
                <Link className='header__link' to='/sign-in'>Войти</Link>
              </div>
            }
          />
        </Routes>
      </nav>
    </header>
  );
}

export default Header;
