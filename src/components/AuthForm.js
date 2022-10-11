import React from 'react';
// import { Routes, Route, Link } from 'react-router-dom';
import { useForm } from '../hooks/useForm';

function AuthForm(props) {
  const { heading, buttonText, onSubmit, children } = props;
  const { values, setValues, handleChange } = useForm({});

  function handleSubmit(e) {
    e.preventDefault();
    onSubmit(values.email, values.password);
  }

  React.useEffect(() => {
    setValues({ email: '', password: '' });
  }, [setValues]);

  return (
    <div className='auth-page'>
      <h2 className='auth-page__heading'>{heading}</h2>
      <form className='form form_place_auth' onSubmit={handleSubmit}>
        <input
          className='form__input form__input_place_auth'
          name='email'
          placeholder='Email'
          type='email'
          value={values.email || ''}
          onChange={handleChange}
        />
        <span className='form__error email-input-error'></span>
        <input
          className='form__input form__input_place_auth'
          name='password'
          placeholder='Пароль'
          type='password'
          value={values.password || ''}
          onChange={handleChange}
        />
        <span className='form__error password-input-error'></span>
        <button className='form__button form__button_place_auth' type='submit'>
          {buttonText}
        </button>
        {children}
      </form>
      {/* <Routes>
        <Route
          path='/sign-up'
          element={
            <p className='auth__subheading'>
              Уже зарегистрированы?
              <Link className='auth-page__link' to='/sign-in'>
                {' '}
                Войти
              </Link>
            </p>
          }
        />
      </Routes> */}
    </div>
  );
}

export default AuthForm;
