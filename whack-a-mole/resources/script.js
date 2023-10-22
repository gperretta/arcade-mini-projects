const scoreText = document.querySelector('#score');
const timerText = document.querySelector('#timer');
let score = 0;
let timeLeft = 60;
scoreText.innerText = score;
timerText.innerText = timeLeft;

const cellGrid = document.querySelectorAll('.grid > .cell')
let speed = 800;

// show the mole in a random position/cell in the grid
function addMole() {
    const randomIndex = Math.floor(Math.random() * cellGrid.length);
    const cell = cellGrid[randomIndex];
    // clean before adding a new mole
    removeBug();
    cell.classList.add('mole');
    // increase the speed of the mole
    switch (timeLeft) {
        case 40:
            speed = 600;
            break;
        case 30:
            speed = 450;
            break;
        case 15:
            speed = 300;
            break;
    }
}
const movement = setInterval(addMole, speed);

// cleaning up the grid
function removeBug() {
    cellGrid.forEach(cell => {
        cell.classList.remove('mole');
    });
}

// handle a 30 sec timer
function countDown() {
    timeLeft--;
    timerText.innerText = timeLeft;
    if (timeLeft === 0) {
        clearInterval(timer);
        clearInterval(movement);
        removeBug();
        alert("Time's up! Your score: " + score);
    }
}
const timer = setInterval(countDown, 1000);

const restartButton = document.getElementById('restart');
restartButton.addEventListener('click', function () {
    window.location.reload();
})

cellGrid.forEach(cell => {
    cell.addEventListener('click', function () {
        if (cell.classList.contains('mole')) {
            score++;
            scoreText.innerText = score;

            cell.classList.remove('mole');
            cell.classList.add('hit');

            setTimeout(function () {
                cell.classList.remove('hit');
            }, 200);
        }
    })
});




