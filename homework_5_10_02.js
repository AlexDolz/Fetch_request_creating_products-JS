// ************************* Task 1 **********************************
// Задана ссылка на api:
// let url = "https://dummyjson.com/products"
// Напишите fetch-запрос, который получит данные от сервера в виде массива и для каждого полученного элемента формирует div элемент с описанием товара.

// В div необходимо указать следующую информацию:
// Изображение товара
// Имя продукта
// Стоимость продукта
// Рейтинг продукта (*)

// Требования к работе:
// 1) В работе должна присутствовать небольшая стилизация (grid/flex сетка). Все элементы можно расположить по правилам grid сетки (по 3 элемента)
// 2) Скрипт должен быть разделен на назначенные функции (fetch, render, rating (*) )
// 3) (*) У каждого товара назначен рейтинг (дробное число). Необходимо написать функцию rating(n), которая получает рейтинг и выводит в разметке 5 иконок звезды. В зависимости от n аргумента на разметке должно появиться n активных звезд из 5.
// Внутри функции аргумент необходимо округлить до целого числа по правилам математики

let url = 'https://dummyjson.com/products';

// Fetch function
function getProducts(url) {
  fetch(url)
    .then(res => res.json())
    .then(json => renderProducts(json.products));
}

getProducts(url);

// Render function
const cardsContainer = document.createElement('div');

function renderProducts(products) {
  const allProducts = products.map(
    ({ thumbnail, title, price, description, rating }) => {
      const card = document.createElement('div');
      const imgElem = document.createElement('img');
      const titleElem = document.createElement('p');
      const priceElem = document.createElement('p');
      const ratingContainer = document.createElement('div');

      imgElem.src = thumbnail;
      imgElem.alt = 'img';
      imgElem.title = description;

      cardsContainer.classList.add('cards_container');
      card.classList.add('card');
      imgElem.classList.add('img_elem');
      titleElem.classList.add('text');
      priceElem.classList.add('text');

      titleElem.innerText = `Title: ${title}`;
      priceElem.innerText = `Price: ${price}$`;

      ratingContainer.classList.add('rating_container');
      ratingContainer.innerHTML = getRatings(rating);

      card.append(imgElem, titleElem, priceElem, ratingContainer);
      return card;
    }
  );

  cardsContainer.append(...allProducts);
}

document.body.append(cardsContainer);

// Ratings function
function getRatings(rating) {
  const roundedAmount = Math.round(rating);
  const ratingMax = 5;
  let stars = '';
  let starInactive = '<span class="fa fa-star"></span>';
  let starActive = '<span class="fa fa-star active"></span>';
  for (let i = 0; i < ratingMax; i++)
    i >= roundedAmount ? (stars += starInactive) : (stars += starActive);
  return stars;
}
