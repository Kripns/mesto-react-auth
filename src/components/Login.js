import React from "react";


function Login() {

  return(
    <div className="auth">
      <h2 className="auth__heading">Вход</h2>
      <form className="auth__form">
        <input placeholder="Email" />
        <input placeholder="Пароль" />
        <button type="submit">Войти</button>
      </form>
    </div>
  )
}

export default Login;