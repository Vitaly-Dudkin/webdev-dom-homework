// script.js
import { addComment } from './comments.js'
import { updateButtonState } from './utils.js'
import { addButton, nameElement, textElement } from './vars.js'
import { loadComments } from './api.js'

loadComments()

addButton.addEventListener('click', addComment)

nameElement.addEventListener('input', updateButtonState)
textElement.addEventListener('input', updateButtonState)
