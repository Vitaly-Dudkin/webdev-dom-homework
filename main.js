const pubDate = document.getElementById('pub-date')

const addButton = document.getElementById('add-form-button')
const deleteButton = document.getElementById('delete-form-button')

const listElement = document.getElementById('list')
const nameElement = document.getElementById('input-name')
const textElement = document.getElementById('text-area')

// Массив для хранения комментариев

const sanitizeHtml = (value) => {
    return value.replaceAll('<', '&lt').replaceAll('>', '&gt')
}
const comments = [
    {
        author: 'Глеб Фокин',
        date: '12.02.25 12:18',
        text: 'Это будет первый комментарий на этой странице',
        likes: 3,
    },
    {
        author: 'Варвара Н.',
        date: '13.02.25 19:22',
        text: 'Мне нравится как оформлена эта страница! ❤️',
        likes: 75,
        activeLike: false,
    },
]

// Функция для рендеринга комментариев
function renderComments() {
    const list = document.getElementById('list')
    list.innerHTML = '' // Очищаем список перед рендерингом

    comments.forEach((comment, index) => {
        const li = document.createElement('li')
        li.classList.add('comment')

        li.innerHTML = `
            <div class="comment-header">
                <div>${comment.author}</div>
                <div>${comment.date}</div>
            </div>
            <div class="comment-body">
                <div class="comment-text">${comment.text}</div>
            </div>
            <div class="comment-footer">
                <div class="likes">
                    <span class="likes-counter">${comment.likes}</span>
                    <button class="like-button ${comment.activeLike ? '-active-like' : ''}"></button>
                </div>
            </div>`

        // Сохраняем индекс комментария в атрибуте data-attribute для дальнейшего использования
        li.setAttribute('data-index', index)

        list.appendChild(li)

        li.addEventListener('click', () => {
            const currentComment = comments[index] // Используем индекс из замыкания
            textElement.value = `${currentComment.author}: ${currentComment.text}` // Исправлено здесь
        })

        // Находим кнопку лайка внутри текущего комментария и добавляем обработчик
        const likeButton = li.querySelector('.like-button')
        likeButton.addEventListener('click', (event) => {
            event.stopPropagation() // Останавливаем всплытие события

            // Обновляем количество лайков
            comment.likes = comment.activeLike
                ? comment.likes - 1
                : comment.likes + 1
            comment.activeLike = !comment.activeLike // Переключаем состояние лайка

            renderComments() // Обновляем рендеринг комментариев
        })
    })
}

// Изначальный рендеринг комментариев
renderComments()

function formatDate(date) {
    const day = String(date.getDate()).padStart(2, '0') // Получаем день и добавляем ведущий ноль
    const month = String(date.getMonth() + 1).padStart(2, '0') // Получаем месяц (0-11) и добавляем ведущий ноль
    const year = String(date.getFullYear()).slice(-2) // Получаем последние две цифры года
    const hours = String(date.getHours()).padStart(2, '0') // Получаем часы и добавляем ведущий ноль
    const minutes = String(date.getMinutes()).padStart(2, '0') // Получаем минуты и добавляем ведущий ноль

    return `${day}.${month}.${year} ${hours}:${minutes}` // Форматируем строку
}

function addComment() {
    const nameUser = nameElement.value
    const text = textElement.value

    if (nameUser || text) {
        comments.push({
            author: `${sanitizeHtml(nameUser)}`,
            date: formatDate(new Date()),
            text: `${sanitizeHtml(text)}`,
            likes: 0,
            activeLike: false,
        })

        renderComments()
        // Добавляем новый комментарий в список
    } else {
        nameElement.classList.add('error')
    }

    // Очищаем поля ввода
    nameElement.value = ''
    textElement.value = ''
}

function updateButtonState() {
    // Проверяем, заполнены ли оба поля
    const isNameFilled = nameElement.value.trim() !== ''
    const isCommentFilled = textElement.value.trim() !== ''

    // Если оба поля заполнены, активируем кнопку, иначе - отключаем
    addButton.disabled = !(isNameFilled && isCommentFilled)
}

addButton.addEventListener('click', addComment)

nameElement.addEventListener('input', updateButtonState)
textElement.addEventListener('input', updateButtonState)

textElement.addEventListener('keypress', function (event) {
    if (event.key === 'Enter') {
        event.preventDefault() // предотвращаем переход на новую строку
        if (!addButton.disabled) {
            // Проверяем, не отключена ли кнопка
            addComment()
        }
    }
})

// Делегирование событий для кнопок лайков
// document.getElementById('list').addEventListener('click', function(event) {
//     if (event.target.classList.contains('like-button')) {
//         const button = event.target;
//         const index = button.getAttribute('data-index'); // Получаем индекс комментария из атрибута
//         const comment = comments[index]; // Получаем соответствующий комментарий

//         // Получаем текущее количество лайков
//         let currentLikes = comment.likes;

//         // Проверяем, есть ли у кнопки класс '-active-like'
//         if (button.classList.contains('-active-like')) {
//             // Если есть, значит лайк убираем
//             button.classList.remove('-active-like'); // Убираем активный класс
//             currentLikes--; // Уменьшаем количество лайков на 1
//             comment.activeLike = false; // Обновляем состояние лайка в массиве
//         } else {
//             // Если нет, значит ставим лайк
//             button.classList.add('-active-like'); // Добавляем активный класс
//             currentLikes++; // Увеличиваем количество лайков на 1
//             comment.activeLike = true; // Обновляем состояние лайка в массиве
//         }

//         // Обновляем текст счетчика лайков
//         comment.likes = currentLikes; // Обновляем количество лайков в массиве
//         button.previousElementSibling.textContent = currentLikes; // Обновляем текст счетчика лайков
//     }
// });
// Обходим каждую кнопку лайка и добавляем обработчик события клика
// Обработчик для кнопки очистки полей ввода (если есть)
document
    .getElementById('delete-form-button')
    .addEventListener('click', function () {
        nameElement.value = ''
        textElement.value = ''
    })
