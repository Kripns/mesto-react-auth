import React from 'react';
import PopupWithForm from './PopupWithForm';

function EditAvatarPopup(props) {
  const { isOpen, onClose, isLoading, onUpdateAvatar } = props;
  const inputRef = React.useRef();

  function handleSubmit(e) {
    e.preventDefault();
    onUpdateAvatar({ avatar: inputRef.current.value });
  }

  React.useEffect(() => {
    inputRef.current.value = '';
  }, [isOpen]);

  return (
    <PopupWithForm
      name='edit-avatar'
      title='Обновить аватар'
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      buttonText={isLoading? 'Сохранение...' : 'Сохранить'}
    >
      <input
        className='form__input form__input_place_popup form__input_type_url'
        name='avatar'
        ref={inputRef}
        id='avatar-link-input'
        type='url'
        placeholder='Ссылка на аватар'
        required
      />
      <span className='form__error avatar-link-input-error'></span>
    </PopupWithForm>
  );
}

export default EditAvatarPopup;
