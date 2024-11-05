const gameBoard = document.getElementById('game-board');
const audio = document.getElementById('background-audio');
const soundToggle = document.getElementById('sound-toggle');
const congratulations = document.getElementById('congratulations');

// Inicia o som de fundo automaticamente ao carregar a página
window.onload = () => {
    audio.play();
};

// Alterna o som de fundo
soundToggle.addEventListener('click', () => {
    if (audio.paused) {
        audio.play();
        soundToggle.textContent = '🔊 Pause Sound';
    } else {
        audio.pause();
        soundToggle.textContent = '🔇 Play Sound';
    }
});

// Imagens das cartas - Substitua pelas imagens do tema
const cardsArray = [
    { name: 'arthur', img: 'peça1.jpg' },
    { name: 'dutch', img: 'peça2.jpg' },
    { name: 'john', img: 'peça3.jpg' },
    { name: 'sadie', img: 'peça4.jpg' },
    { name: 'micah', img: 'peça5.jpg' },
    { name: 'hosea', img: 'peça6.jpg' },
    { name: 'charles', img: 'peça7.jpg' },
    { name: 'javier', img: 'peça8.jpg' }
];

// Duplica e embaralha as cartas
const shuffledCards = [...cardsArray, ...cardsArray]
    .sort(() => 0.5 - Math.random());

// Renderiza as cartas no tabuleiro
shuffledCards.forEach(card => {
    const cardElement = document.createElement('div');
    cardElement.classList.add('card');
    cardElement.dataset.name = card.name;

    const cardInner = document.createElement('div');
    cardInner.classList.add('card-inner');

    const cardFront = document.createElement('div');
    cardFront.classList.add('card-front');

    const cardBack = document.createElement('div');
    cardBack.classList.add('card-back');
    cardBack.style.backgroundImage = `url(${card.img})`;

    cardInner.appendChild(cardFront);
    cardInner.appendChild(cardBack);
    cardElement.appendChild(cardInner);

    gameBoard.appendChild(cardElement);
});

// Controle de clique e verificação de combinação
let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard;
let matchesFound = 0; // Contador de pares encontrados

function flipCard() {
    if (lockBoard) return;
    if (this === firstCard) return;

    this.classList.add('flip');

    if (!hasFlippedCard) {
        hasFlippedCard = true;
        firstCard = this;
        return;
    }

    secondCard = this;
    checkForMatch();
}

function checkForMatch() {
    const isMatch = firstCard.dataset.name === secondCard.dataset.name;

    if (isMatch) {
        disableCards();
        matchesFound++; // Incrementa o contador de pares encontrados
        if (matchesFound === cardsArray.length) {
            displayCongratulations(); // Exibe a parabenização se todos os pares forem encontrados
        }
    } else {
        unflipCards();
    }
}

function disableCards() {
    firstCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click', flipCard);
    resetBoard();
}

function unflipCards() {
    lockBoard = true;

    setTimeout(() => {
        firstCard.classList.remove('flip');
        secondCard.classList.remove('flip');
        resetBoard();
    }, 1500);
}

function resetBoard() {
    [hasFlippedCard, lockBoard] = [false, false];
    [firstCard, secondCard] = [null, null];
}

// Exibe a mensagem de parabenização
function displayCongratulations() {
    congratulations.style.display = 'block';
}

document.querySelectorAll('.card').forEach(card => {
    card.addEventListener('click', flipCard);
});