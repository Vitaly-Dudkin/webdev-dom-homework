import { toggleForms } from './utils.js'
import { register } from './api.js'
import { singUp } from './vars.js'

document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM загружен, инициализируем формы...')
    const toRegisterElement = document.getElementById('to-register')
    const toLoginElement = document.getElementById('to-login')
    console.log('1')

    // Добавляем обработчик события для регистрации
    if (toRegisterElement) {
        toRegisterElement.addEventListener('click', (event) => {
            event.preventDefault() // предотвращаем переход по ссылке
            toggleForms() // вызываем только здесь
        })
    } else {
        console.error("Элемент с id 'to-register' не найден.")
    }

    // Добавляем обработчик события для входа
    if (toLoginElement) {
        toLoginElement.addEventListener('click', (event) => {
            event.preventDefault() // предотвращаем переход по ссылке
            toggleForms() // вызываем только здесь
        })
    } else {
        console.error("Элемент с id 'to-login' не найден.")
    }
})

singUp.addEventListener('click', register)
