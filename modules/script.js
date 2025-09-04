// script.js
import { renderComments, addComment } from './comments.js'
import { updateButtonState } from './utils.js'
import { addButton, nameElement, textElement } from './vars.js'

// Изначальный рендеринг комментариев
renderComments()

addButton.addEventListener('click', () => {
    const nameUser = nameElement.value
    const text = textElement.value

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
