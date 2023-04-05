import { cardTemplate, popupImage, popupImagePicture, popupImageTitle, popupDeleteCard } from './utils';
import { openPopup } from './modal';
import { addLike, deleteLike } from './api';
import { errorShow } from './error';
import { myId } from '../index';

function createCard(obj) {
    const card = cardTemplate.content.cloneNode('.places-grid__card');
    const cardImage = card.querySelector('.place__image');
    const cardDeleteButton = card.querySelector('.place__delete-btn');
    const cardLikeButton = card.querySelector('.place__like-btn');
    const cardLikeCounter = card.querySelector('.place__like-counter');

    function isContainMyLike(likes) {
        return likes.includes(myId);
    }

    cardImage.src = obj.link;
    obj.alt ? cardImage.alt = obj.alt : cardImage.alt = obj.name;//add alt=name if alt=undefined

    card.querySelector('.place__name').textContent = obj.name;
    cardLikeCounter.textContent = obj.likes.length;

    cardLikeButton.likes = obj.likes.map((el) => { return el._id })//add likes inside button 

    if (isContainMyLike(cardLikeButton.likes)) cardLikeButton.classList.toggle('place__like-btn_active');

    cardLikeButton.addEventListener('click', (event) => {//add listener 4 like

        function updateLikeSection(res) {
            event.target.likes = res.likes.map((el) => { return el._id });
            event.target.classList.toggle('place__like-btn_active');
            cardLikeCounter.textContent = event.target.likes.length;
        }

        if (isContainMyLike(event.target.likes)) {
            deleteLike(obj._id)
                .then(updateLikeSection)
                .catch(err => errorShow(err.message))
        }
        else {
            addLike(obj._id)
                .then(updateLikeSection)
                .catch(err => errorShow(err.message))
        }
    })
    if (obj.owner._id !== myId) {//remove delete /OR/ add listener
        cardDeleteButton.remove()
    }
    else {
        cardDeleteButton.addEventListener('click', (event) => {//add listener 4 delete
            openPopup(popupDeleteCard);
            popupDeleteCard.deleteInfo = {};//add info about card inside popupDeleteCard
            popupDeleteCard.deleteInfo.id = obj._id;
            popupDeleteCard.deleteInfo.node = event.target.closest('.places-grid__card');
        })
    }
    card.querySelector('.place__image-btn').addEventListener('click', () => {//add listener 4 image
        popupImagePicture.src = cardImage.src;
        popupImagePicture.alt = cardImage.alt;
        popupImageTitle.textContent = obj.name;
        openPopup(popupImage);
    })
    return card;
}

export { createCard };