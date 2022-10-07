import React from 'react';
import PopupWithForm from './PopupWithForm';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import { useForm } from '../hooks/useForm';

function EditPropfilePopup(props) {
  const { isOpen, onClose, isLoading, onUpdateUser } = props;
  const currentUser = React.useContext(CurrentUserContext);
  const { values, setValues, handleChange } = useForm({});

  function handleSubmit(e) {
    e.preventDefault();
    onUpdateUser(values);
  }

  React.useEffect(() => {
    setValues({ name: currentUser.name, about: currentUser.about });
  }, [currentUser, isOpen, setValues]);

  return (
    <PopupWithForm
      name='edit-profile'
      title='Редактировать профиль'
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      buttonText={isLoading ? 'Сохранение...' : 'Сохранить'}
    >
      <input
        className='popup__input popup__input_type_name'
        name='name'
        id='user-name-input'
        type='text'
        onChange={handleChange}
        value={values.name || ''}
        placeholder='Имя'
        minLength='2'
        maxLength='40'
        required
      />
      <span className='popup__error user-name-input-error'></span>
      <input
        className='popup__input popup__input_type_job'
        name='about'
        id='user-job-input'
        type='text'
        onChange={handleChange}
        value={values.about || ''}
        placeholder='О себе'
        minLength='2'
        maxLength='200'
        required
      />
      <span className='popup__error user-job-input-error'></span>
    </PopupWithForm>
  );
}

export default EditPropfilePopup;
