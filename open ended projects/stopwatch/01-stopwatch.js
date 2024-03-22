let timer = 0;

const timerElement = document.querySelector('.js-timer');

displayTimer();

function displayTimer() {
    timerElement.innerHTML = timer < 10 ? `0${timer}` : timer;
};

document.querySelector('.js-start-button')
    .addEventListener('click', () => {
        startTimer();
    });

document.querySelector('.js-stop-button')
    .addEventListener('click', () => {
        stopTimer();
    });

document.querySelector('.js-reset-button')
    .addEventListener('click', () => {
        resetTimer();
    });

let intervalId = '';
function startTimer() {
    if (intervalId) {
        clearInterval(intervalId);
    };

    intervalId = setInterval(() => {
        timer++;
        displayTimer();
    }, 1000)
};

function stopTimer() {
    clearInterval(intervalId);
    intervalId = '';
};

function resetTimer() {
    timer = 0;
    displayTimer();
    clearInterval(intervalId);
}

