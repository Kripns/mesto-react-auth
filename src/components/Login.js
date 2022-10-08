import React from "react";
import { useForm } from "../hooks/useForm";

function Login(props) {
  const { loggedIn, onSubmit } = props;
  const { values, setValues, handleChange } = useForm({});

  function handleSubmit(e) {
    e.preventDefault();
    onSubmit(values.email, values.password);
  }

  React.useEffect(() => {
    setValues({ email: '', password: '' })
  }, [loggedIn, setValues])

  return(
    <div className="auth">
      <h2 className="auth__heading">Вход</h2>
      <form className="auth__form" onSubmit={handleSubmit}>
      <input 
          name="email"
          placeholder="Email" 
          type="email"
          value={values.email || ''}
          onChange={handleChange}
          />
        <input 
          name="password"
          placeholder="Пароль" 
          type="password"
          value={values.password || ''}
          onChange={handleChange}
          />
        <button type="submit">Войти</button>
      </form>
    </div>

  )
  
}

export default Login;