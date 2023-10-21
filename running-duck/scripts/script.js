const gridCell = document.querySelectorAll('.grid > div');
const scoreText = document.querySelector('#score');

const duckIndex = 1;
const duck = gridCell[duckIndex];
duck.classList.add('duck');

let speed = 3;
let score = -1;

function addObstacle() {
    let currObstacleIndex = gridCell.length - 1;
    gridCell[currObstacleIndex].classList.add('buoy');

    const obstacleIndexVal = setInterval(function () {
        if (score % 50 === 0) {
            speed = speed++;
        }

        gridCell[currObstacleIndex].classList.remove('buoy');
        currObstacleIndex--;

        // handle exception for negative index values
        if (currObstacleIndex < 0) {
            clearInterval(obstacleIndexVal);
            addObstacle();
            return;
        }

        // handle overlapping div (duck & obstacle)
        if (currObstacleIndex === duckIndex &&
            !gridCell[currObstacleIndex].classList.contains('jumping-duck')) {
            gridCell[currObstacleIndex].classList.remove('duck');
            gridCell[currObstacleIndex].classList.add('buoy');
            clearInterval(obstacleIndexVal);
            alert("IT'S A CRASH: GAME OVER!");
            return;
        }

        gridCell[currObstacleIndex].classList.add('buoy');
    }, 1000 / speed);
    score++;
    scoreText.innerText = score;
}
addObstacle();

function jump(event) {
    // when the spacebar is clicked, but it's not being held down
    if (event.code === 'Space' && !event.repeat) {
        duck.classList.add('jumping-duck');
        setTimeout(function () {
            duck.classList.remove('jumping-duck');
        }, 300);

    }
}

document.addEventListener('keydown', jump);