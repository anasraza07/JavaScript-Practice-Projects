const score = JSON.parse(localStorage.getItem('playerScore')) || {
    wins: 0,
    losses: 0,
    ties: 0
};

updateScoreElement();

document.body.addEventListener('keydown', (event) => {
    if (event.key === 'r') {
        playGame('rock');
    } else if (event.key === 'p') {
        playGame('paper');
    } else if (event.key === 's') {
        playGame('scissors');
    } else if (event.key === 'Backspace') {
        displayConfirmationMessage();
    } else if (event.key === 'a') {
        autoPlay();
    };
});

document.querySelector('.js-reset-score-button')
    .addEventListener('click', () => {
        // resetScore();
        displayConfirmationMessage();
    });

document.querySelector('.js-auto-play-button')
    .addEventListener('click', () => {
        autoPlay();
    });

document.querySelector('.js-rock-button')
    .addEventListener('click', () => {
        playGame('rock');
    });

document.querySelector('.js-paper-button')
    .addEventListener('click', () => {
        playGame('paper');
    });

document.querySelector('.js-scissors-button')
    .addEventListener('click', () => {
        playGame('scissors');
    });

function displayConfirmationMessage() {
    const confirmationMessageElement = document.querySelector('.js-confirmation-message');

    confirmationMessageElement.innerHTML = `
        Are you sure you want to reset the score?
        <button class="js-yes-button">Yes</button>
        <button class="js-no-button">No</button>
    `;

    document.querySelector('.js-yes-button')
        .addEventListener('click', () => {
            resetScore();
            confirmationMessageElement.innerHTML = '';
        });

    document.querySelector('.js-no-button')
        .addEventListener('click', () => {
            confirmationMessageElement.innerHTML = '';
        });
}

function resetScore() {
    score.wins = 0;
    score.losses = 0;
    score.ties = 0;
    localStorage.removeItem('playerScore');
    updateScoreElement();
};

let intervalId = '';
function autoPlay() {
    if (intervalId) { // if auto playing
        clearInterval(intervalId);
        intervalId = '';

        document.querySelector('.js-auto-play-button').innerHTML = 'Auto Play';
    } else { // if not playing
        intervalId = setInterval(() => {
            const playerMove = pickComputerMove();
            playGame(playerMove);
        }, 1000);

        document.querySelector('.js-auto-play-button').innerHTML = 'Stop Playing';
    }
};

function playGame(playerMove) {
    const computerMove = pickComputerMove();
    let result;

    if (playerMove === 'rock') {
        if (computerMove === 'rock') {
            result = 'Tie';
        } else if (computerMove === 'paper') {
            result = 'You lose';
        } else if (computerMove === 'scissors') {
            result = 'You win';
        }

    } else if (playerMove === 'paper') {
        result = 'You win';
        if (computerMove === 'rock') {
        } else if (computerMove === 'paper') {
            result = 'Tie';
        } else if (computerMove === 'scissors') {
            result = 'You lose';
        }

    } else if (playerMove === 'scissors') {
        if (computerMove === 'rock') {
            result = 'You lose';
        } else if (computerMove === 'paper') {
            result = 'You win';
        } else if (computerMove === 'scissors') {
            result = 'Tie';
        }
    };

    if (result === 'You win') {
        score.wins++;
    } else if (result === 'You lose') {
        score.losses++;
    } else if (result === 'Tie') {
        score.ties++;
    };

    localStorage.setItem('playerScore', JSON.stringify(score));

    document.querySelector('.js-result')
        .innerHTML = result;

    document.querySelector('.js-moves')
        .innerHTML = `
            You
            <img class="move-icon" src="../images/${playerMove}-emoji.png" alt="">
            <img class="move-icon" src="../images/${computerMove}-emoji.png" alt="">
            Computer
        `;

    updateScoreElement();
}

function updateScoreElement() {
    document.querySelector('.score')
        .innerHTML = `Wins: ${score.wins}, Losses: ${score.losses}, Ties: ${score.ties}`;
};

function pickComputerMove() {
    const randomNumber = Math.random();
    let computerMove;

    if (randomNumber >= 0 && randomNumber < 1 / 3) {
        computerMove = 'rock';
    } else if (randomNumber >= 1 / 3 && randomNumber < 2 / 3) {
        computerMove = 'paper';
    } else if (randomNumber >= 2 / 3 && randomNumber < 1) {
        computerMove = 'scissors';
    }

    return computerMove;
};