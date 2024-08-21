const RANDOM_QUOTE_API = 'https://dummyjson.com/quotes/random';
const displayQuote = document.getElementById('quoteDisplay');
const inputQuote = document.getElementById('quoteInput');
const timerElement = document.getElementById('timer');
const wpmElement = document.getElementById('wpm');

inputQuote.addEventListener('input', () => {
    const arrayQuote = displayQuote.querySelectorAll('span')
    const arrayValue = inputQuote.value.split('')
    let correct = true
    arrayQuote.forEach((characterSpan, index) => {
        const character = arrayValue[index]
        if (character == null) {
            characterSpan.classList.remove('correct')
            characterSpan.classList.remove('incorrect')
            correct = false
        }

        else if (character == characterSpan.innerText) {
            characterSpan.classList.add('correct')
            characterSpan.classList.remove('incorrect')
        }
        else {
            characterSpan.classList.add('incorrect')
            characterSpan.classList.remove('correct')
            correct = false
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
    startTimer();
}
let startTime;
function startTimer() {
    timerElement.innerText = 0
    startTime = new Date();
    setInterval(() => {
        timer.innerText = getTimer()
    }, 1000)
}

function getTimer() {
    return Math.floor((new Date() - startTime) / 1000)
}
function wordsPerMin() {
    const timeInSec = getTimer();
    const timeInMin = (timeInSec / 60);
    const noOfWords = inputQuote.value.trim().split(' ').length;
    const wpm = timeInMin > 0 ? Math.floor(noOfWords / timeInMin) : 0;

    wpmElement.innerText = `WPM: ${wpm}`;
    renderNewQuote();



}

renderNewQuote()
