import { listElement } from './vars.js'
import { updateComments } from './utils.js'
import { renderComments } from './comments.js'

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
