import { cardTemplate, popupImage, popupImagePicture, popupImageTitle } from './utils'

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
        openPopup(popupImage);
    })
    return card;
}

export { createCard };