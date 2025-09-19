import { listElement } from './vars.js'
import { updateComments } from './utils.js'
import { renderComments } from './comments.js'

export function loadComments() {
    listElement.innerHTML =
        '<div class="loading">Загрузка комментариев...</div>'

    return fetch('https://wedev-api.sky.pro/api/v2/vitaly-dudkin/comments', {})
        .then((response) => {
            if (!response.ok) {
                throw new Error('Сетевая ошибка: ' + response.statusText)
            }
            if (response.status == 401) {
                throw new Error('Ошибка 401: Неверная авторизация')
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

export function register() {
    console.log('register')
    const registrationForm = document.getElementById('registration-form')

    if (!registrationForm) {
        console.error('Форма регистрации не найдена!')
        return
    }

    const userData = {
        name: document.getElementById('reg-name').value,
        login: document.getElementById('reg-email').value,
        password: document.getElementById('reg-password').value,
    }
    console.log('Отправляемые данные:', userData)

    const registrationUrl = 'https://wedev-api.sky.pro/api/user'
    console.log('register1')
    fetch(registrationUrl, {
        method: 'POST',
        body: JSON.stringify(userData),
    })
        .then((response) => {
            if (!response.ok) {
                return response.json().then((err) => {
                    throw new Error(err.error || 'Network response was not ok')
                })
            }
            return response.json()
        })
        .then((data) => {
            if (data.user && data.user.token) {
                localStorage.setItem('token', data.user.token)
                console.log('Success:', data)

                alert('Регистрация прошла успешно!')
            }
        })
        .catch((error) => {
            console.error('Error:', error)
            alert('Ошибка регистрации: ' + error.message)
        })
}
