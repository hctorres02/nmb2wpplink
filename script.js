// --- APP CONFIGS
const rules = {
    allowedLengths: [12, 13]
}

// --- SCOPE
var form = document.getElementById('form'),
    input = document.getElementById('input'),
    clipboard = document.getElementById('clipboard')

// --- METHODS
const maxAllowedLength = () =>
    Math.max.apply(null, rules.allowedLengths)

const minAllowedLength = () =>
    Math.min.apply(null, rules.allowedLengths)

const hasAllowedLength = t =>
    rules.allowedLengths.includes(t.length)

const sanitizeInput = e =>
    input.value = (e.target ? e.target.value : e)
        .replace(/\D/g, '')
        .substr(0, maxAllowedLength())

const hideOutput = () =>
    output.classList.add('is-hidden')

const showOutput = () =>
    output.classList.remove('is-hidden')

const outputMessage = t => {
    output.innerHTML = hasAllowedLength(t)
        ? `<a href="https://wa.me/${t}" class="is-link">Message +${t}</a>`
        : `<strong>${t}</strong> isn't a valid number`
}

const createLink = e => {
    e.preventDefault()
    showOutput()
    outputMessage(input.value)
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
input.minLength = minAllowedLength()
input.maxLength = maxAllowedLength()
input.pattern = `[0-9]\{${input.minLength},${input.maxLength}\}`
input.title = `Input required between ${input.minLength} and ${input.maxLength} chars`
