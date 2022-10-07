import path from '../images/header-logo.svg';

function Header() {
  return (
    <header className='header'>
      <img className='header__logo' src={path} alt='логотип' />
    </header>
  );
}

export default Header;
