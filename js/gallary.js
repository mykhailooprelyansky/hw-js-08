import { galleryItems } from "./app.js";

const galleryRef = document.querySelector(".js-gallery");
const lightboxRef = document.querySelector(".js-lightbox");
const closeBtnRef = document.querySelector(".lightbox__button");
const lightboxImageRef = document.querySelector(".lightbox__image");
const overlayRef = document.querySelector(".lightbox__overlay");

galleryRef.addEventListener("click", onImgContainerClick);
closeBtnRef.addEventListener("click", closeModalWindow);
overlayRef.addEventListener("click", closeModalWindow);

const createGallaryList = ({ original, preview, description, index }) => {
  const listRef = document.createElement("li");
  listRef.classList.add("gallery__item");
  const linkRef = document.createElement("a");
  linkRef.classList.add("gallery__link");
  linkRef.href = original;
  const imgRef = document.createElement("img");
  imgRef.classList.add("gallery__image");
  imgRef.src = preview;
  imgRef.dataset.source = original;
  imgRef.alt = description;
  imgRef.dataset.index = index;
  listRef.append(linkRef, imgRef);
  return listRef;
};
const gallery = galleryItems.map(createGallaryList);
galleryRef.append(...gallery);

function onImgContainerClick(evt) {
  if (evt.target.nodeName !== "IMG") {
    return;
  }
  openModalWindow(evt);
}
function openModalWindow(evt) {
  window.addEventListener("keydown", pressEsc);
  lightboxRef.classList.add("is-open");
  lightboxImageRef.src = evt.target.dataset.source;
  lightboxImageRef.alt = evt.target.alt;
  scrollLeftOrRight(evt);
}
function closeModalWindow() {
  window.removeEventListener("keydown", pressEsc);
  lightboxRef.classList.remove("is-open");
  lightboxImageRef.src = "";
}
function pressEsc(evt) {
  if (evt.code === "Escape") {
    closeModalWindow();
  }
}
function scrollLeftOrRight(evt) {
  let currentIndex = +evt.target.dataset.index;
  let count = 0;
  window.addEventListener("keydown", (e) => {
    count += 1;
    console.log(count);
    if (e.code === "ArrowRight") {
      currentIndex += 1;
      return (lightboxImageRef.src = galleryItems[currentIndex].original);
    }
    if (e.code === "ArrowLeft") {
      currentIndex -= 1;
      return (lightboxImageRef.src = galleryItems[currentIndex].original);
    }
  });
  //   if ((currentIndex = 8 || 0)) {
  //     console.log("stop");
  //   }
}
console.log(galleryRef);
// img.src = arr[index + 1 ].original
// ArrowRight;
// ArrowLeft;
