import React from 'react';
import PopupWithForm from './PopupWithForm';
import { useForm } from '../hooks/useForm';

function AddPlacePopup(props) {
  const { isOpen, onClose, isLoading, onSubmit } = props;
  const { values, setValues, handleChange } = useForm({});

  function handleSubmit(e) {
    e.preventDefault();
    onSubmit(values);
  }

  React.useEffect(() => {
    setValues({ name: '', link: '' });
  }, [isOpen, setValues]);

  return (
    <PopupWithForm
      name='card-adding'
      title='Новое место'
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      buttonText={isLoading ? 'Сохранение...' : 'Создать'}
    >
      <input
        className='popup__input popup__input_type_place-name'
        name='name'
        value={values.name || ''}
        onChange={handleChange}
        id='place-name-input'
        type='text'
        placeholder='Название'
        minLength='2'
        maxLength='30'
        required
      />
      <span className='popup__error place-name-input-error'></span>
      <input
        className='popup__input popup__input_type_url'
        name='link'
        value={values.link || ''}
        onChange={handleChange}
        id='picture-link-input'
        type='url'
        placeholder='Ссылка на картинку'
        required
      />
      <span className='popup__error picture-link-input-error'></span>
    </PopupWithForm>
  );
}

export default AddPlacePopup;
