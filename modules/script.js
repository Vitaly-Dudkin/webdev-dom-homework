// script.js
import { renderComments, addComment } from './comments.js'
import { updateButtonState, updateComments } from './utils.js'
import { addButton, nameElement, textElement } from './vars.js'

fetch('https://wedev-api.sky.pro/api/v1/:vitaly-dudkin/comments')
    .then((response) => {
        return response.json()
    })
    .then((data) => {
        updateComments(data.comments)
        renderComments() // Передаем комментарии в функцию рендеринга
    })
    .catch((error) => {
        console.error('Ошибка при загрузке комментариев:', error)
    })
// Изначальный рендеринг комментариев
// renderComments()

addButton.addEventListener('click', () => {
    let nameUser = nameElement.value
    let text = textElement.value

    addComment() // Добавляем комментарий
    nameUser = '' // Очищаем поля ввода
    text = ''
})

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
