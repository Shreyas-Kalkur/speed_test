const RANDOM_QUOTE_API = 'https://dummyjson.com/quotes/random';
const displayQuote = document.getElementById('quoteDisplay');
const inputQuote = document.getElementById('quoteInput');

inputQuote.addEventListener('input', () => {
    const arrayQuote = displayQuote.querySelectorAll('span')
    const arrayValue = inputQuote.value.split('')
    arrayQuote.forEach((characterSpan, index) => {
        const character = arrayValue[index]
        if (character == null) {
            characterSpan.classList.remove('correct')
            characterSpan.classList.remove('incorrect')
        }

        else if (character == characterSpan.innerText) {
            characterSpan.classList.add('correct')
            characterSpan.classList.remove('correct')
        }
        else {
            characterSpan.classList.add('incorrect')
            characterSpan.classList.remove('correct')
        }
    })
})

function getRandomQuote() {
    return fetch(RANDOM_QUOTE_API)
        .then(response => response.json())
        .then(quotes => quotes.quote)
}

async function renderNewQuote() {
    const quote = await getRandomQuote();
    displayQuote.innerHTML = ''
    quote.split('').forEach(character => {
        const characterSpan = document.createElement('span')
        characterSpan.innerText = character
        displayQuote.appendChild(characterSpan)
    })
    inputQuote.value = null
}

renderNewQuote()