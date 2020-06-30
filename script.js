// --- APP CONFIGS
const configs = {
    allowedLengths: [11, 12],
    props: ['name', 'tel'],
    options: {
        multiple: false
    }
}

// --- SCOPE
var form = document.querySelector('#form'),
    input = document.querySelector('#input'),
    clipboard = document.querySelector('#clipboard'),
    contact_container = document.querySelector('#contact_container'),
    contact = document.querySelector('#contact')

// --- METHODS
const maxAllowedLength = () =>
    configs.allowedLengths[configs.allowedLengths.length - 1]

const isValid = t =>
    configs.allowedLengths.includes(t.length)

const sanitizeInput = e =>
    input.value = (e.target == undefined ? e : e.target.value)
        .replace(/\D/g, '')
        .substr(0, maxAllowedLength())

const hideOutput = () =>
    output.classList.add('is-hidden')

const showOutput = t => {
    output.classList.remove('is-hidden')
    output.innerHTML = isValid(t)
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
    } catch (e) { /* silence is golden! */
    } finally { input.focus() }
}

const readContact = async e => {
    e.preventDefault()

    try {
        await navigator.contacts
            .select(configs.props, configs.options)
            .then(c => sanitizeInput(c[0].tel))
    } catch (e) { /* silence is golden! */
    } finally { input.focus() }
}

// --- EVENTS LISTENERS
form.addEventListener('submit', createLink)
input.addEventListener('focus', hideOutput)
input.addEventListener('input', sanitizeInput)
clipboard.addEventListener('click', pasteData)
contact.addEventListener('click', readContact)

// --- BUSINESS RULES
input.maxLength = maxAllowedLength()

if (!window.ContactManager)
    contact_container.classList.add('is-hidden')