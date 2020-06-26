const configs = {
    allowedLengths: [11, 12]
}

const isValid = t =>
    configs.allowedLengths.includes(t.length)

const sanitizeInput = e =>
    e.target.value = e.target.value.replace(/\D/g, '')

const hideOutput = () =>
    output.classList.add('is-hidden')

const showOutput = t => {
    output.classList.remove('is-hidden')
    output.innerHTML = isValid(t)
        ? `<a href="https://wa.me/${t}" class="is-link">Message +${t}</a>`
        : `<strong>${t}</strong> isn't a valid number`
}

const preventDefault = e => {
    e.preventDefault()
    input.focus()
}

const createLink = e => {
    preventDefault(e)
    showOutput(input.value)
}

input.addEventListener('focus', hideOutput)
form.addEventListener('submit', createLink)

// multiple events, same element
'keyup,blur'.split(',').forEach(t =>
    input.addEventListener(t, sanitizeInput))
