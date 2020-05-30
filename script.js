// enter a new number
input.addEventListener('focus', () => {
    output.classList.add('hide')
})

// submit event
form.addEventListener('submit', (e) => {

    // don't refresh page
    e.preventDefault()

    // clear input focus
    input.blur()

    // vars
    let allowed_lenghts = [12, 13]
    let telephone = input.value.replace(/\D/g, '')

    // output message
    output.innerHTML = allowed_lenghts.includes(telephone.length)
        ? `<a href="https://wa.me/${telephone}">message +${telephone}</a>`
        : `<strong>+${input.value}</strong> isn't a valid number`

    // show output
    output.classList.remove('hide')
})