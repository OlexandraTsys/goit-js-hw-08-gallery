import gallery_items from '../gallery-items.js';

const listEl = document.querySelector('.js-gallery');
const modalEl = document.querySelector('.js-lightbox');
const modalImgEl = modalEl.querySelector('img');

const galleryEls = gallery_items.map(({ preview, original, description }) => {
    return `
    <li class="gallery__item">
        <a
          class="gallery__link"
          href="${original}"
        >
          <img
            class="gallery__image"
            src="${preview}"
            data-source="${original}"
            alt="${description}"
          />
        </a>
    </li>
`;
}).join('');

listEl.insertAdjacentHTML('afterbegin', galleryEls);

listEl.addEventListener('click', onGalleryItemClick);

function onGalleryItemClick(e) {
    e.preventDefault();
    if (e.target.nodeName !== 'IMG') return;

    modalEl.classList.add('is-open');
    modalImgEl.src = e.target.dataset.source;
    modalImgEl.alt = e.target.alt;

    modalEl.addEventListener('click', onModalImgClick);
    window.addEventListener('keydown', onModalEscKeydown);
    window.addEventListener('keydown', onModalRightKeydown);
    window.addEventListener('keydown', onModalLeftKeydown);
}

function onModalImgClick(e) {
    
    if (
        e.target.className !== 'lightbox__button'
        &&
        e.target.className !== 'lightbox__overlay'
    ) return;

    closeModal();
}

function onModalEscKeydown(e) {
    if (e.code !== 'Escape') return;

    closeModal()
}

function onModalRightKeydown(e) {
    
    if (e.code !== 'ArrowRight') return;
    
    const collectionImgs = Array.from(listEl.querySelectorAll('img'));
    const collectionImgLinks = collectionImgs.map(el => {
        const obj = {};

        obj.link = el.getAttribute('data-source');
        obj.alt = el.getAttribute('alt');
        return obj;
    });

    const modalCurrentLink = modalImgEl.src;

    for (let ind = 0; ind < collectionImgLinks.length; ind++) {
        if (collectionImgLinks[ind].link === modalCurrentLink) {
            let nextInd = ind + 1;

            if (collectionImgLinks.length - 1 === ind) {
                nextInd = 0;
            }

            modalImgEl.src = collectionImgLinks[nextInd].link;
            modalImgEl.alt = collectionImgLinks[nextInd].alt;
            break;
        }

    }
    

}

function onModalLeftKeydown(e) {
    
    if (e.code !== 'ArrowLeft') return;
    
    const collectionImgs = Array.from(listEl.querySelectorAll('img'));
    const collectionImgLinks = collectionImgs.map(el => {
        const obj = {};

        obj.link = el.getAttribute('data-source');
        obj.alt = el.getAttribute('alt');
        return obj;
    });

    const modalCurrentLink = modalImgEl.src;

    for (let ind = 0; ind < collectionImgLinks.length; ind++) {
        if (collectionImgLinks[ind].link === modalCurrentLink) {
            let nextInd = ind - 1;

            if (0 === ind) {
                nextInd = collectionImgLinks.length - 1;
            }

            modalImgEl.src = collectionImgLinks[nextInd].link;
            modalImgEl.alt = collectionImgLinks[nextInd].alt;
            break;
        }

    }

}

function closeModal() {
    modalEl.classList.remove('is-open');
    modalImgEl.src = '';
    modalImgEl.alt = '';

    modalEl.removeEventListener('click', onModalImgClick);
    window.removeEventListener('keydown', onModalEscKeydown);
    window.removeEventListener('keydown', onModalRightKeydown);
    window.removeEventListener('keydown', onModalLeftKeydown);
}