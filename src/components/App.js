import React from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import Header from './Header';
import Main from './Main';
import Login from './Login';
import Register from './Register';
import ProtectedRoute from './ProtectedRoute';
import Footer from './Footer';
import EditPropfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import ConfirmationPopup from './ConfirmationPopup';
import ImagePopup from './ImagePopup';
import api from '../utils/Api';
import { register, login } from '../utils/Auth';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import InfoTooltip from './InfoTooltip';

function App() {
  //Переменные состояния
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] =
    React.useState(false);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] =
    React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isConfirmationPopupOpen, setIsConfirmationPopupOpen] =
    React.useState(false);
  const [isInfoTooltipOpen, setIsInfoTooltipOpen] = React.useState(false)
  const [isImagePopupOpen, setIsImagePopupOpen] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState({});
  const [cardForRemoving, setCardForRemoving] = React.useState({});
  const [currentUser, setCurrentUser] = React.useState({});
  const [cards, setCards] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(false);
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);

  //Проверяем открыт ли хоть один попап
  const isOpen =
    isAddPlacePopupOpen ||
    isEditAvatarPopupOpen ||
    isEditProfilePopupOpen ||
    isImagePopupOpen ||
    isConfirmationPopupOpen;

    const navigate = useNavigate();

  //Обработчики открытия попапов
  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  function handleRemoveCardclick(card) {
    setCardForRemoving(card);
    setIsConfirmationPopupOpen(true);
  }

  function handleCardClick(card) {
    setSelectedCard(card);
    setIsImagePopupOpen(true);
  }

  //Обработчик закрытия попапов
  function closeAllPopups() {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsImagePopupOpen(false);
    setIsConfirmationPopupOpen(false);
    setIsInfoTooltipOpen(false)
  }

  //Обработчики сабмитов
  function handleUpdateUser(data) {
    setIsLoading(true);
    api
      .editProfile(data)
      .then(updatedUser => {
        setCurrentUser(updatedUser);
        closeAllPopups();
      })
      .catch(err => console.log(err))
      .finally(() => setIsLoading(false));
  }

  function handleUpdateAvatar(url) {
    setIsLoading(true);
    api
      .updateAvatar(url)
      .then(updatedUser => {
        setCurrentUser(updatedUser);
        closeAllPopups();
      })
      .catch(err => console.log(err))
      .finally(() => setIsLoading(false));
  }

  function handleAddPlaceSubmit(data) {
    setIsLoading(true);
    api
      .saveCard(data)
      .then(newCard => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch(err => console.log(err))
      .finally(() => setIsLoading(false));
  }

  function handleRegister(email, password) {
    register(email, password)
      .then(res => {
        console.log(res);
        // setIsInfoTooltipOpen(true);
        navigate('/sign-in');
      })
      .catch(err => console.log(err));
  }

  function handleLogin(email, password) {
    login(email, password)
      .then(res => {
        console.log(res);
        setIsLoggedIn(true);
        navigate('/');
      })
  }

  //Обработчик лайков
  function handleCardLike(card) {
    const isLiked = card.likes.some(i => currentUser._id === i._id);
    api
      .changeLikeCardStatus(card._id, isLiked)
      .then((newCard) => {
        setCards(state => state.map((c) => c._id === card._id ? newCard : c));
      })
      .catch(err => console.log(err))
  }

  //Обработчик удаления карточки
  function handleCardDelete() {
    setIsLoading(true);
    api
      .deleteCard(cardForRemoving._id)
      .then(() => {
        setCards(state => state.filter(item => item._id !== cardForRemoving._id));
        closeAllPopups();
      })
      .catch(err => console.log(err))
      .finally(() => setIsLoading(false));
  }

  //Эффекты
  React.useEffect(() => {
    api
      .getCards()
      .then(cardList => setCards(cardList))
      .catch(err => console.log(err));
  }, []);

  React.useEffect(() => {
    api
      .getUser()
      .then(userInfo => setCurrentUser(userInfo))
      .catch(err => console.log(err));
  }, []);

  React.useEffect(() => {
    function closeByEscape(e) {
      if (e.key === 'Escape') {
        closeAllPopups();
      }
    }

    if (isOpen) {
      document.addEventListener('keydown', closeByEscape);
      return () => {
        document.removeEventListener('keydown', closeByEscape);
      };
    }
  }, [isOpen]);

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className='App'>
        <Header loggedIn={isLoggedIn} />
        <Routes>
          <Route
            path='/'
            element={
              <ProtectedRoute isLoggedIn={isLoggedIn}>
                <Main
                  onEditProfile={handleEditProfileClick}
                  onEditAvatar={handleEditAvatarClick}
                  onAddPlace={handleAddPlaceClick}
                  onCardClick={handleCardClick}
                  cards={cards}
                  onCardLike={handleCardLike}
                  onCardDelete={handleRemoveCardclick}
                />
              </ProtectedRoute>
            }
          />
          <Route path='/sign-in' element={<Login 
            onSubmit={handleLogin}
            loggedIn={isLoggedIn}
          />} />
          <Route path='/sign-up' element={<Register
            onSubmit={handleRegister}
            loggedIn={isLoggedIn}
          />} />
        </Routes>
        <Footer />
        <EditPropfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
          isLoading={isLoading}
        />
        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
          isLoading={isLoading}
        />
        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onSubmit={handleAddPlaceSubmit}
          isLoading={isLoading}
        />
        <ConfirmationPopup
          name='delete'
          title='Вы уверены?'
          isOpen={isConfirmationPopupOpen}
          onClose={closeAllPopups}
          onSubmit={handleCardDelete}
          buttonText={isLoading ? 'Удаление...' : 'Да'}
        />
        <ImagePopup
          name='image'
          isOpen={isImagePopupOpen}
          card={selectedCard}
          onClose={closeAllPopups}
        />
        <InfoTooltip 
          name='register'
          isOpen={isInfoTooltipOpen}
          onClose={closeAllPopups}
          loggedIn={isLoggedIn}
        />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
