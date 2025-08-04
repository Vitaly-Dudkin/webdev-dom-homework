const pubDate = document.getElementById('pub-date')

const addButton = document.getElementById('add-form-button');
const deleteButton = document.getElementById('delete-form-button');

const listElement = document.getElementById('list');
const nameElement = document.getElementById('input-name');
const textElement = document.getElementById('text-area');

function deleteComment() {
    const comments = listElement.getElementsByTagName('li'); // Получаем все комментарии
    if (comments.length > 0) {
        listElement.removeChild(comments[comments.length - 1]); // Удаляем последний комментарий
    }
}

function formatDate(date) {
    const day = String(date.getDate()).padStart(2, '0'); // Получаем день и добавляем ведущий ноль
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Получаем месяц (0-11) и добавляем ведущий ноль
    const year = String(date.getFullYear()).slice(-2); // Получаем последние две цифры года
    const hours = String(date.getHours()).padStart(2, '0'); // Получаем часы и добавляем ведущий ноль
    const minutes = String(date.getMinutes()).padStart(2, '0'); // Получаем минуты и добавляем ведущий ноль

    return `${day}.${month}.${year} ${hours}:${minutes}`; // Форматируем строку
}

function addComment() {
    const nameUser = nameElement.value; 
    const text = textElement.value;

    if (nameUser || text) {

    const newComment = `<li class="comment">
            <div class="comment-header">
                <div>${nameUser}</div>
                <div>${formatDate(new Date())}</div>
            </div>
            <div class="comment-body">
                <div class="comment-text">
                ${text}
                </div>
            </div>
            <div class="comment-footer">
                <div class="likes">
                <span class="likes-counter">${0}</span>
                <button class="like-button"></button>
                </div>
            </div>
    </li>`;

    // Добавляем новый комментарий в список
    listElement.innerHTML += newComment
    } else {
        nameElement.classList.add('error')
    }

    // Очищаем поля ввода
    nameElement.value = '';
    textElement.value = '';

}

function updateButtonState() {
    // Проверяем, заполнены ли оба поля
    const isNameFilled = nameElement.value.trim() !== '';
    const isCommentFilled = textElement.value.trim() !== '';
    
    // Если оба поля заполнены, активируем кнопку, иначе - отключаем
    addButton.disabled = !(isNameFilled && isCommentFilled);
}

addButton.addEventListener("click", addComment);

nameElement.addEventListener('input', updateButtonState);
textElement.addEventListener('input', updateButtonState);

textElement.addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        event.preventDefault(); // предотвращаем переход на новую строку
        if (!addButton.disabled) { // Проверяем, не отключена ли кнопка
            addComment();
        }
}});
deleteButton.addEventListener('click', deleteComment);

// Получаем все кнопки лайков
const likeButtons = document.querySelectorAll('.like-button');

// Обходим каждую кнопку лайка
likeButtons.forEach(button => {
  // Добавляем обработчик события клика
  button.addEventListener('click', function() {
    // Находим родительский элемент li (комментарий)
    const comment = this.closest('.comment');
    
    // Находим счетчик лайков внутри этого комментария
    const likesCounter = comment.querySelector('.likes-counter');
    
    // Получаем текущее количество лайков
    let currentLikes = parseInt(likesCounter.textContent);
    
    // Проверяем, есть ли у кнопки класс '-active-like'
    if (this.classList.contains('-active-like')) {
      // Если есть, значит лайк убираем
      this.classList.remove('-active-like'); // Убираем активный класс
      currentLikes--; // Уменьшаем количество лайков на 1
    } else {
      // Если нет, значит ставим лайк
      this.classList.add('-active-like'); // Добавляем активный класс
      currentLikes++; // Увеличиваем количество лайков на 1
    }
    
    // Обновляем текст счетчика лайков
    likesCounter.textContent = currentLikes;
  });
});