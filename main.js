(()=>{"use strict";var e=document.querySelector("#card-template").content;function t(t,n,o,r){var c=e.querySelector(".places__item").cloneNode(!0);c.querySelector(".card__title").textContent=t.name,c.querySelector(".card__image").src=t.link,c.querySelector(".card__image").alt=t.name;var p=c.querySelector(".card__delete-button"),a=c.querySelector(".card__like-button");return p.addEventListener("click",n),a.addEventListener("click",o),c.querySelector(".card__image").addEventListener("click",r),c}function n(e){e.target.closest(".places__item").remove()}function o(e){e.target.classList.add("card__like-button_is-active")}function r(e){e.classList.add("popup_is-opened"),e.classList.add("popup_is-animated"),document.addEventListener("keydown",p)}function c(e){e.classList.remove("popup_is-opened"),document.removeEventListener("keydown",p)}function p(e){"Escape"===e.key&&c(document.querySelector(".popup_is-opened"))}document.querySelectorAll(".popup").forEach((function(e){e.addEventListener("mousedown",(function(t){t.target.classList.contains("popup_is-opened")&&c(e),t.target.classList.contains("popup__close")&&c(e)}))}));var a=document.querySelector(".places__list"),d=document.querySelector(".profile__add-button"),u=document.querySelector(".profile__edit-button"),s=document.querySelector(".popup_type_edit"),i=document.querySelector(".popup_type_new-card"),l=document.querySelector(".popup_type_image"),_=document.querySelector(".popup__image"),m=document.querySelector(".popup__caption"),y=document.querySelector(".popup__input_type_name"),v=document.querySelector(".popup__input_type_description"),f=document.querySelector(".profile__title"),k=document.querySelector(".profile__description"),q=document.forms["edit-profile"],S=document.forms["new-place"],g=document.querySelector(".popup__input_type_card-name"),L=document.querySelector(".popup__input_type_url");function E(e){r(l),_.src=e.target.src,_.alt=e.target.alt,m.textContent=e.target.alt}[{name:"Архыз",link:"https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg"},{name:"Челябинская область",link:"https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg"},{name:"Иваново",link:"https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg"},{name:"Камчатка",link:"https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg"},{name:"Холмогорский район",link:"https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg"},{name:"Байкал",link:"https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg"}].forEach((function(e){a.append(t(e,n,o,E))})),d.addEventListener("click",(function(e){r(i)})),u.addEventListener("click",(function(e){r(s),y.value=f.textContent,v.value=k.textContent})),q.addEventListener("submit",(function(e){e.preventDefault(),f.textContent=y.value,k.textContent=v.value,c(s)})),S.addEventListener("submit",(function(e){e.preventDefault();var r=t({name:g.value,link:L.value},n,o,E);a.prepend(r),c(i),e.target.reset()}))})();