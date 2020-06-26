/**
 * author: HCTorres02
 * site: https://github.com/hctorres02
 * description:
 * 
 * v0.2
 */

const _sanitizeInput = e => e.target.value = e.target.value.replace(/\D/g, '')
const _hideOutput = () => output_container.classList.add('is-hidden')
const _showOutput = () => output_container.classList.remove('is-hidden')

const _preventDefault = e => {
    e.preventDefault()
    input.focus()
}

const _createLink = e => {
    _preventDefault(e)

    let allowedLenghts = [11, 12]
    let telephone = input.value
    let isAllowed = allowedLenghts.includes(telephone.length)

    output.innerHTML = isAllowed
        ? `<a href="https://wa.me/${telephone}" class="is-link">Message +${telephone}</a>`
        : `<strong>${telephone}</strong> isn't a valid number`

    _showOutput()
}

input.addEventListener('focus', _hideOutput)
input.addEventListener('keyup', _sanitizeInput)
form.addEventListener('submit', _createLink)
