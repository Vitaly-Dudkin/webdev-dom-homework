import { sanitizeHtml, formatDate, comments } from './utils.js'
import { nameElement, textElement, addButton } from './vars.js'
import { loadComments } from './api.js'
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
                <div>${formatDate(new Date(comment.date))}</div>
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
    const nameUser = nameElement.value.trim()
    const text = textElement.value.trim()

    // Проверка на клиенте перед отправкой
    if (nameUser.length < 3) {
        alert('Имя должно содержать не менее 3 символов')
        return
    }

    if (text.length < 3) {
        alert('Текст комментария должен содержать не менее 3 символов')
        return
    }

    addButton.disabled = true
    addButton.textContent = 'Публикация...'

    // Сохраняем текущие значения для восстановления в случае ошибки
    const currentName = nameUser
    const currentText = text

    fetch('https://wedev-api.sky.pro/api/v1/:vitaly-dudkin/comments', {
        method: 'POST',
        body: JSON.stringify({
            text: sanitizeHtml(text),
            name: sanitizeHtml(nameUser),
        }),
    })
        .then((response) => {
            // Проверяем статус ответа
            if (!response.ok) {
                if (response.status === 400) {
                    throw new Error(
                        'Имя и текст должны содержать не менее 3 символов',
                    )
                } else if (response.status >= 500) {
                    throw new Error('Ошибка сервера. Попробуйте позже.')
                } else {
                    throw new Error(
                        `Ошибка: ${response.status} ${response.statusText}`,
                    )
                }
            }
            return response.json()
        })
        .then(() => {
            addButton.disabled = false
            addButton.textContent = 'Написать'

            // Очищаем поля только при успешной отправке
            nameElement.value = ''
            textElement.value = ''

            loadComments()
        })
        .catch((error) => {
            addButton.disabled = false
            addButton.textContent = 'Написать'

            // Восстанавливаем значения полей при ошибке
            nameElement.value = currentName
            textElement.value = currentText

            // Обработка ошибок сети
            if (
                error instanceof TypeError &&
                error.message === 'Failed to fetch'
            ) {
                alert(
                    'Проблема с подключением к интернету. Пожалуйста, проверьте ваше соединение.',
                )
            } else {
                // Показываем alert с сообщением об ошибке
                alert(error.message)
            }

            console.error('Ошибка при добавлении комментария:', error)
        })
}
