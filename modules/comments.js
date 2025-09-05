import { sanitizeHtml, formatDate, comments } from './utils.js'
import { nameElement, textElement } from './vars.js'

// Функция для рендеринга комментариев
export function renderComments() {
    const list = document.getElementById('list')
    list.innerHTML = '' // Очищаем список перед рендерингом

    comments.forEach((comment, index) => {
        const li = document.createElement('li')
        li.classList.add('comment')

        li.innerHTML = `
            <div class="comment-header">
                <div>${comment.author.name}</div>
                <div>${formatDate(new Date())}</div>
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
            textElement.value = `${currentComment.author.name}: ${currentComment.text}` // Исправлено здесь
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

export function addComment() {
    const nameUser = nameElement.value
    const text = textElement.value

    if (nameUser || text) {
        comments.push({
            author: { name: `${sanitizeHtml(nameUser)}` },
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
