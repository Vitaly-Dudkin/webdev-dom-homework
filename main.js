const pubDate = document.getElementById('pub-date')

const addButton = document.getElementById('add-form-button');
const listElement = document.getElementById('list');
const nameElement = document.getElementById('input-name');
const textElement = document.getElementById('text-area');

function formatDate(date) {
    const day = String(date.getDate()).padStart(2, '0'); // Получаем день и добавляем ведущий ноль
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Получаем месяц (0-11) и добавляем ведущий ноль
    const year = String(date.getFullYear()).slice(-2); // Получаем последние две цифры года
    const hours = String(date.getHours()).padStart(2, '0'); // Получаем часы и добавляем ведущий ноль
    const minutes = String(date.getMinutes()).padStart(2, '0'); // Получаем минуты и добавляем ведущий ноль

    return `${day}.${month}.${year} ${hours}:${minutes}`; // Форматируем строку
}

// Использование функции
const currentDate = new Date();
const formattedDate = formatDate(currentDate);



addButton.addEventListener("click", () => {
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
});

