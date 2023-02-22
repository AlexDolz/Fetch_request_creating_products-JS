const selectItem = document.querySelector('.select_item');

function preRender() {
  const storageData = JSON.parse(localStorage.getItem('products'));
  if (storageData) {
    renderProducts(storageData);
  } else {
    getProducts();
  }
}

// Fetch function
function getProducts() {
  fetch('https://dummyjson.com/products')
    .then(res => res.json())
    .then(data => {
      localStorage.setItem('products', JSON.stringify(data.products));
      renderProducts(data.products);
    });
}

// Render function
const cardsContainer = document.createElement('div');

function renderProducts(products) {
  cardsContainer.innerHTML = '';
  for (let elem of products) {
    const card = document.createElement('div');
    const imgElem = document.createElement('img');
    const titleElem = document.createElement('p');
    const priceElem = document.createElement('p');
    const xMark = document.createElement('i');
    xMark.className = 'las la-times';

    xMark.addEventListener('click', event => {
      event.stopPropagation();
      products = products.filter(value => value.id != elem.id);
      localStorage.setItem('products', JSON.stringify(products));
      renderProducts(products);
    });

    imgElem.src = elem.images[0];
    imgElem.alt = 'img';

    cardsContainer.classList.add('cards_container');
    card.classList.add('card');

    imgElem.classList.add('img_elem');
    titleElem.classList.add('text');
    priceElem.classList.add('text');

    titleElem.innerText = `Title: ${elem.title}`;
    priceElem.innerText = `Price: ${elem.price}$`;

    card.append(imgElem, titleElem, priceElem, getRatings(elem.rating), xMark);

    card.addEventListener('click', () => {
      modal(elem);
      cardsContainer.style.filter = 'blur(8px)';
    });
    cardsContainer.append(card);
  }

  selectItem.onchange = event => {
    renderProducts(sortElems(products, event.target.value));
  };
}

// sort function
function sortElems(data, type) {
  if (type === '1') {
    data.sort((crElem, nxElem) => crElem.price - nxElem.price);
  } else if (type === '2') {
    data.sort((crElem, nxElem) => nxElem.price - crElem.price);
  } else if (type === '0') {
    data.sort((crElem, nxElem) => crElem.id - nxElem.id);
  }
  localStorage.setItem('products', JSON.stringify(data));
  return data;
}

document.body.append(cardsContainer);

// modal function
function modal(elem) {
  // Modal area
  const divModalArea = document.createElement('div');
  divModalArea.className = 'modal_area';

  // Modal container
  const divModalContainer = document.createElement('div');
  divModalContainer.classList.add('modal_container');

  // Close-cross
  const cross = document.createElement('i');
  cross.className = 'las la-times';

  cross.addEventListener('click', () => {
    divModalArea.remove();
    cardsContainer.style.filter = 'blur(0px)';
  });

  document.body.addEventListener('keydown', event => {
    if (event.key == 'Escape') {
      divModalArea.remove();
      cardsContainer.style.filter = 'blur(0px)';
    }
  });

  // Making div element with content
  const divItemModal = document.createElement('div');
  divItemModal.className = 'item_modal';

  const imgItemModal = document.createElement('img');
  imgItemModal.src = elem.images[0];
  imgItemModal.height = 350;
  imgItemModal.width = 700;
  imgItemModal.style.objectFit = 'contain';

  const pItemDescription = document.createElement('p');
  pItemDescription.innerText = elem.description;

  // Making img
  const divImages = document.createElement('div');
  divImages.className = 'images_container';

  for (let img of elem.images) {
    let imgELem = document.createElement('img');
    imgELem.className = 'item_image_modal';
    imgELem.src = img;
    divImages.append(imgELem);

    imgELem.addEventListener('click', () => (imgItemModal.src = img));
  }

  divItemModal.append(imgItemModal, getRatings(elem.rating), pItemDescription);

  divModalContainer.append(cross, divImages, divItemModal);
  divModalArea.append(divModalContainer);
  document.body.append(divModalArea);

  function removeModal(evt) {
    let target = evt.target;
    while (target.parentNode) {
      if (target.classList.contains('modal_container')) {
        return;
      }
      target = target.parentNode;
    }
    document.body.removeChild(divModalArea);
    window.removeEventListener('click', removeModal, true);
    cardsContainer.style.filter = 'blur(0px)';
  }

  window.addEventListener('click', removeModal, true);
}

// Ratings function
function getRatings(rating) {
  const roundedAmount = Math.round(rating);
  const ratingContainer = document.createElement('div');
  ratingContainer.classList.add('rating_container');

  for (let i = 0; i < 5; i++) {
    const spanElem = document.createElement('span');
    if (roundedAmount > i) {
      spanElem.className = 'fa fa-star active';
    } else {
      spanElem.className = 'fa fa-star';
    }
    ratingContainer.append(spanElem);
  }

  return ratingContainer;
}

preRender();
