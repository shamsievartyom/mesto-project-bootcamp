import './index.css';
import { popupEdit, buttonForCloseEdit, popupEditForm, popupAdd, placesGrid, popupAddForm, buttonForCloseAdd, popupImage, popupImagePicture, buttonForCloseImage } from './components/utils';
import * as validation from './components/validate';
import { openPopup, closePopup, handleSubmitEditPopup, handleEditButton, handleSubmitAddPopup } from './components/modal'
import { createCard } from './components/card';

const initialCards = [
    {
        name: 'Архыз',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg',
        alt: 'Зелёные горы',
    },
    {
        name: 'Челябинская область',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg',
        alt: 'Озеро среди снега',
    },
    {
        name: 'Иваново',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg',
        alt: 'Серые 9-ти этажки',
    },
    {
        name: 'Камчатка',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg',
        alt: 'Мелкая растительность возле гор',
    },
    {
        name: 'Холмогорский район',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg',
        alt: 'Железная дорога в лесу',
    },
    {
        name: 'Байкал',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg',
        alt: 'Скала возле водоёма',
    }
];





initialCards.reverse().forEach(obj => placesGrid.prepend(createCard(obj)));//default cards

buttonForCloseImage.addEventListener('click', () => closePopup(popupImage));
popupImage.addEventListener('click', () => closePopup(popupImage));
popupImagePicture.addEventListener('click', (evt) => evt.stopPropagation());
//add popup
popupAddForm.addEventListener('submit', handleSubmitAddPopup);
buttonForCloseAdd.addEventListener('click', () => closePopup(popupAdd));
document.querySelector('.profile__add-btn').addEventListener('click', () => openPopup(popupAdd));
popupAdd.addEventListener('click', () => closePopup(popupAdd));
//edit popup
popupEditForm.addEventListener('submit', handleSubmitEditPopup);
buttonForCloseEdit.addEventListener('click', () => closePopup(popupEdit));
document.querySelector('.profile__edit-btn').addEventListener('click', handleEditButton);
popupEdit.addEventListener('click', () => closePopup(popupEdit));
//esc for exit all popups
document.addEventListener('keydown', (evt) => {
    if (evt.key === 'Escape') {
        if (popupEdit.classList.contains('popup_opened')) closePopup(popupEdit)
        else if (popupAdd.classList.contains('popup_opened')) closePopup(popupAdd)
        else if (popupImage.classList.contains('popup_opened')) closePopup(popupImage)
    }
});
//popups window stop propagation
document.querySelectorAll('.popup-edit-window').forEach((el) => {
    el.addEventListener('click', (evt) => evt.stopPropagation());
})

const configValidation = {
    formSelector: '.profile-edit-form',
    inputFieldSelector: '.profile-edit-form__input',
    buttonSubmitSelector: '.profile-edit-form__submit-btn',
    inputErrorClass: 'profile-edit-form__input_invalid',
}

validation.enableValidation(configValidation);