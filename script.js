// --- APP CONFIGS
const rules = {
    allowedLengths: [12, 13]
}

// --- SCOPE
var form = document.querySelector('#form'),
    input = document.querySelector('#input'),
    clipboard = document.querySelector('#clipboard')

// --- METHODS
const maxAllowedLength = () =>
    rules.allowedLengths[rules.allowedLengths.length - 1]

const hasAllowedLength = t =>
    rules.allowedLengths.includes(t.length)

const sanitizeInput = e =>
    input.value = (e.target != undefined ? e.target.value : e)
        .replace(/\D/g, '')
        .substr(0, maxAllowedLength())

const hideOutput = () =>
    output.classList.add('is-hidden')

const showOutput = t => {
    output.classList.remove('is-hidden')
    output.innerHTML = hasValidLength(t)
        ? `<a href="https://wa.me/${t}" class="is-link">Message +${t}</a>`
        : `<strong>${t}</strong> isn't a valid number`
}

const createLink = e => {
    e.preventDefault()
    showOutput(input.value)
}

const pasteData = async e => {
    try {
        e.preventDefault()
        await navigator.clipboard
            .readText()
            .then(d => sanitizeInput(d))
    } catch (e) {
        console.log(e)
    } finally {
        input.focus()
    }
}

// --- EVENTS LISTENERS
form.addEventListener('submit', createLink)
input.addEventListener('focus', hideOutput)
input.addEventListener('input', sanitizeInput)
clipboard.addEventListener('click', pasteData)

// --- BUSINESS RULES
input.maxLength = maxAllowedLength()