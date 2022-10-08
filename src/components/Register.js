import React from "react";
import { Link } from "react-router-dom";


function Register() {

  return(
    <div className="auth">
      <h2 className="auth__heading">Регистрация</h2>
      <form className="auth__form">
        <input placeholder="Email" />
        <input placeholder="Пароль" />
        <button type="submit">Зарегистрироваться</button>
      </form>
      <p>
        Уже зарегистрированы?<Link to='/sign-in'> Войти</Link>
      </p>
    </div>
  )
}

export default Register;