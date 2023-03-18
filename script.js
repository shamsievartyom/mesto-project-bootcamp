const profileName = document.querySelector('.profile__name');
const profileDescription = document.querySelector('.profile__description');
const popupEdit = document.querySelector('.popup-edit');
const closeEditButton = popupEdit.querySelector('.profile-edit-form__close-icon');
const popupEditNameInput = popupEdit.querySelector('.name-input');
const popupEditDescriptionInput = popupEdit.querySelector('.description-input');
const popupEditSubmit = popupEdit.querySelector('.profile-edit-form__submit-btn');
const popupEditForm = popupEdit.querySelector('.profile-edit-form');

const popupAdd = document.querySelector('.popup-add-card');
const placesGrid = document.querySelector('.places-grid');
const cardTemplate = document.querySelector('.card-template');
const popupAddForm = popupAdd.querySelector('.profile-edit-form');
const popupAddNameInput = popupAdd.querySelector('.name-input');
const popupAddDescriptionInput = popupAdd.querySelector('.description-input');
const closeAddButton = popupAdd.querySelector('.profile-edit-form__close-icon');

const popupImage = document.querySelector('.popup-image');
const popupImagePicture = popupImage.querySelector('.popup-image-section__picture');
const popupImageTitle = popupImage.querySelector('.popup-image-section__title');
const closeImageButton = popupImage.querySelector('.profile-edit-form__close-icon');

const initialCards = [
    {
        name: 'Архыз',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg',
        alt: 'Зеленые горы',
    },
    {
        name: 'Челябинская область',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg',
        alt: 'Озрео среди снега',
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

function fillPopupInputs() {
    popupEditNameInput.value = profileName.textContent;
    popupEditDescriptionInput.value = profileDescription.textContent;
}

function openClosePopup(popup) {
    popup.classList.toggle('popup_opened');
}

function handleSubmitEditPopup(event) {
    event.preventDefault();

    profileName.textContent = popupEditNameInput.value
    profileDescription.textContent = popupEditDescriptionInput.value;
    openClosePopup(popupEdit)
}

function handleEditButton() {
    openClosePopup(popupEdit);
    fillPopupInputs();
}

function createCard(obj) {
    const card = cardTemplate.content.cloneNode('.places-grid__card');
    const cardImage = card.querySelector('.place__image');
    cardImage.src = obj.link;
    obj.alt ? cardImage.alt = obj.alt : cardImage.alt = obj.name;//add alt=name if alt=undefined
    card.querySelector('.place__name').textContent = obj.name;
    card.querySelector('.place__like-btn').addEventListener('click', (event) => {//add listener 4 like
        event.target.classList.toggle('place__like-btn_active');
    })
    card.querySelector('.place__delete-btn').addEventListener('click', (event) => {//add listener 4 delete
        event.target.closest('.places-grid__card').remove();
    })
    card.querySelector('.place__image-btn').addEventListener('click', () => {//add listener 4 image
        popupImagePicture.src = cardImage.src;
        popupImagePicture.alt = cardImage.alt;
        popupImageTitle.textContent = obj.name;
        openClosePopup(popupImage);
    })
    placesGrid.prepend(card);
}

function handleSubmitAddPopup(event) {
    event.preventDefault();

    const placeCard = {
        name: popupAddNameInput.value,
        link: popupAddDescriptionInput.value,
    }
    createCard(placeCard);
    popupAddForm.reset();
    openClosePopup(popupAdd);
}

initialCards.reverse().forEach(obj => createCard(obj));//default cards

closeImageButton.addEventListener('click', () => openClosePopup(popupImage));
//add popup
popupAddForm.addEventListener('submit', handleSubmitAddPopup);
closeAddButton.addEventListener('click', () => openClosePopup(popupAdd));
document.querySelector('.profile__add-btn').addEventListener('click', () => openClosePopup(popupAdd));
//edit popup
popupEditForm.addEventListener('submit', handleSubmitEditPopup);
closeEditButton.addEventListener('click', () => openClosePopup(popupEdit));
document.querySelector('.profile__edit-btn').addEventListener('click', handleEditButton);