// Получаем форму, контейнер для отзывов и начальный порядковый номер
const postForm = document.getElementById('postForm');
const postContent = document.getElementById('postContent');
const nameInput = document.getElementById('name');
const reviewsContainer = document.getElementById('reviewsContainer');
let reviewCount = localStorage.getItem('reviewCount') || 0; // Загрузка порядкового номера из локального хранилища

// Функция для сохранения отзывов и порядкового номера в локальное хранилище
function saveDataToLocalStorage() {
  localStorage.setItem('reviews', reviewsContainer.innerHTML);
  localStorage.setItem('reviewCount', reviewCount);
}

// Функция для загрузки отзывов и порядкового номера из локального хранилища
function loadDataFromLocalStorage() {
  const savedReviews = localStorage.getItem('reviews');
  if (savedReviews) {
    reviewsContainer.innerHTML = savedReviews;
  }
}

// Обработчик события отправки формы
postForm.addEventListener('submit', function(event) {
  event.preventDefault(); // отменяем стандартное поведение формы

  reviewCount++; // увеличиваем порядковый номер
  const newReview = document.createElement('div');
  newReview.innerHTML = `<b>${reviewCount}. ${nameInput.value}</b>: ${postContent.value}`;
  reviewsContainer.appendChild(newReview);

  postContent.value = ''; // очищаем текстовое поле после отправки отзыва
  nameInput.value = ''; // очищаем поле для имени

  saveDataToLocalStorage(); // сохраняем отзывы и порядковый номер в локальное хранилище
});

// Загружаем отзывы и порядковый номер из локального хранилища при загрузке страницы
window.addEventListener('load', function() {
  loadDataFromLocalStorage();
});

var container = document.getElementsByClassName("container")[0];
var button = document.getElementById("myButton");

// Добавляем обработчик события на нажатие кнопки
button.addEventListener("click", function() {
  container.innerHTML = '';

fetch('https://jsonplaceholder.typicode.com/posts')
  .then((response) => response.json())
  .then((obj) => {
    for (let i = 0; i < obj.length; i++) {
      var container = document.getElementsByClassName("container")[0];
      var idElement = document.createElement("p");
      idElement.textContent = 'ID: ' + obj[i].id;
      container.appendChild(idElement);
      var titleElement = document.createElement("p");
      titleElement.textContent = 'TITLE: ' + obj[i].title;
      container.appendChild(titleElement);

    }
  });
});

var input = document.getElementById("post");
var button = document.getElementById("Posts");

// Добавляем обработчик события на нажатие кнопки
button.addEventListener("click", function() {
  // Получаем значение из поля ввода
    var value = input.value;
    container.innerHTML = '';

  // Выполняем запрос к API для получения поста с указанным id
  fetch('https://jsonplaceholder.typicode.com/posts/' + value)
    .then((response) => response.json())
    .then((obj) => {
      // Создаем элементы для отображения полученной информации
      var container = document.getElementsByClassName("container")[0];
      var idElement = document.createElement("p");
      idElement.textContent = 'ID: ' + obj.id;
      container.appendChild(idElement);
      var titleElement = document.createElement("p");
      titleElement.textContent = 'TITLE: ' + obj.title;
      container.appendChild(titleElement);
      input.value = '';
    });
});

var inputName = document.getElementById("nameFil");
var Filter = document.getElementById("Filter");
var container = document.getElementsByClassName("container")[0]; // Находим контейнер по классу

// Добавляем обработчик события на нажатие кнопки
Filter.addEventListener("click", function() {
  // Получаем значение из поля ввода
  var value = inputName.value;
  container.innerHTML = ''; // Очищаем контейнер перед добавлением новых элементов

  // Выполняем запрос к API для получения постов с указанным именем
  fetch('https://jsonplaceholder.typicode.com/posts?userId=' + value)
    .then((response) => response.json())
    .then((posts) => {
      // Создаем элементы для отображения полученной информации
      posts.forEach(function(post) {
        var idElement = document.createElement("p");
        idElement.textContent = 'ID: ' + post.id;
        container.appendChild(idElement);
        var titleElement = document.createElement("p");
        titleElement.textContent = 'TITLE: ' + post.title;
        container.appendChild(titleElement);
          inputName.value = '';
      });
    });
});
