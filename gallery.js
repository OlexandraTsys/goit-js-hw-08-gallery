import imgArray from "./gallery-items.js";

const gallery = {
  modalImg: document.querySelector("img.lightbox__image"),
  listImg: document.querySelector("ul.js-gallery"),
  modalWindowClose: document.querySelector(".js-lightbox"),
  modalWindow: document.querySelector(".lightbox"),
  infoPrevNext: {}, // info for button prev or next
  button: {prev: 'ArrowLeft', next: 'ArrowRight', esc: 'Escape'},

  addImageGallery(prev, orig, desc) {
    let li = document.createElement("li");
    let link = document.createElement("a");
    let img = document.createElement("img");

    li.classList.add("gallery__item");
    link.classList.add("gallery__link");
    img.classList.add("gallery__image");

    img.setAttribute("src", prev);
    img.setAttribute("data-source", orig);
    img.setAttribute("alt", desc);

    link.appendChild(img);
    li.appendChild(link);

    return li;
  },

  getImagesList(array) {
    return array.map((obj) =>
      this.addImageGallery(obj.preview, obj.original, obj.description)
    );
  },

  setImageInGallery(array, list) {
    list.append(...this.getImagesList(array));
  },

  modalShow(item) {
    this.clearWindow();
    this.modalSave(item); 
    this.modalImg.setAttribute("src", item.getAttribute("data-source"));
    !this.modalWindow.classList.contains("is-open")? this.modalWindow.classList.add("is-open") : null
  },

  modalHide() {
    this.modalWindow.classList.contains("is-open")? this.modalWindow.classList.remove("is-open") : null
    this.clearWindow();
  },

  clearWindow() {
    this.modalImg.setAttribute("src", "");
    this.modalImg.setAttribute("alt", "");
    this.infoPrevNext[this.button.prev] = null;
    this.infoPrevNext[this.button.next] = null;
  },

  keyDown(event) {
      let code = event.code;
      code === this.button.esc? this.modalHide() :  null
      code === this.button.prev || code === this.button.next? this.modalPrevNext(code) : null
  },

  modalPrevNext(item) {
    item === this.button.prev && this.infoPrevNext[item]  || item === this.button.next  && this.infoPrevNext[item]? this.modalShow(this.infoPrevNext[item]) : null
  },

  modalSave(item) {
    item = item.parentNode.parentNode;
    this.infoPrevNext[this.button.prev] = item.previousSibling? item.previousSibling.querySelector("a").querySelector("img") : null;
    this.infoPrevNext[this.button.next] = item.nextSibling? item.nextSibling.querySelector("a").querySelector("img") : null;
  },
};

gallery.setImageInGallery(imgArray, gallery.listImg);

gallery.listImg.addEventListener("click", (e) => {
  gallery.modalShow(e.target);
});

gallery.modalWindowClose.addEventListener("click", () => {
  gallery.modalHide();
});

document.addEventListener('keydown', event => gallery.keyDown(event));