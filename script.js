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

const createLink = e => {
    e.preventDefault()
    showOutput(input.value)
}

const pasteData = async e => {
    try {
        e.preventDefault()
        await navigator.clipboard.readText()
            .then(d => input.value = d)
    }
    catch (e) { /* silence is golden! */ }
    finally { input.focus() }
}

// single events
input.addEventListener('focus', hideOutput)
form.addEventListener('submit', createLink)
clipboard.addEventListener('click', pasteData)

// multiple events, same element
'keyup,blur'.split(',').forEach(t =>
    input.addEventListener(t, sanitizeInput))
