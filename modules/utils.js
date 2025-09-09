import { addButton, nameElement, textElement, listElement } from './vars.js'
import { renderComments } from './comments.js'

// Массив для хранения комментариев
export let comments = []

export const updateComments = (newComments) => {
    comments = newComments.map((comment) => {
        return {
            author: comment.author,
            date: formatDate(new Date()),
            text: comment.text,
            likes: 0,
            activeLike: false,
        }
    })

    console.log('Обновленные комментарии:', comments)
}

export const sanitizeHtml = (value) => {
    return value.replaceAll('<', '&lt').replaceAll('>', '&gt')
}

export function formatDate(date) {
    const day = String(date.getDate()).padStart(2, '0') // Получаем день и добавляем ведущий ноль
    const month = String(date.getMonth() + 1).padStart(2, '0') // Получаем месяц (0-11) и добавляем ведущий ноль
    const year = String(date.getFullYear()).slice(-2) // Получаем последние две цифры года
    const hours = String(date.getHours()).padStart(2, '0') // Получаем часы и добавляем ведущий ноль
    const minutes = String(date.getMinutes()).padStart(2, '0') // Получаем минуты и добавляем ведущий ноль

    return `${day}.${month}.${year} ${hours}:${minutes}` // Форматируем строку
}

export function updateButtonState() {
    // Проверяем, заполнены ли оба поля
    const isNameFilled = nameElement.value.trim() !== ''
    const isCommentFilled = textElement.value.trim() !== ''

    // Если оба поля заполнены, активируем кнопку, иначе - отключаем
    addButton.disabled = !(isNameFilled && isCommentFilled)
}

export function loadComments() {
    listElement.innerHTML =
        '<div class="loading">Загрузка комментариев...</div>'

    return fetch('https://wedev-api.sky.pro/api/v1/:vitaly-dudkin/comments')
        .then((response) => {
            if (!response.ok) {
                throw new Error('Сетевая ошибка: ' + response.statusText)
            }
            return response.json()
        })
        .then((data) => {
            updateComments(data.comments) // Обновляем комментарии
            renderComments() // Рендерим комментарии
        })
        .catch((error) => {
            console.error('Ошибка при загрузке комментариев:', error)
        })
}
