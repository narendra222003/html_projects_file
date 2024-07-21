const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
canvas.width = 800;
canvas.height = 600;

const player = {
    x: 100,
    y: 300,
    width: 50,
    height: 50,
    speed: 5,
    dx: 0,
    dy: 0
};

const obstacles = [];
let gameSpeed;
let score = 0;
let highScore = localStorage.getItem('highScore') || 0;
let gameOver = false;

function drawPlayer() {
    ctx.fillStyle = 'red';
    ctx.fillRect(player.x, player.y, player.width, player.height);
}

function clear() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function newPos() {
    player.x += player.dx;
    player.y += player.dy;
    detectWalls();
}

function detectWalls() {
    if (player.x < 0) player.x = 0;
    if (player.x + player.width > canvas.width) player.x = canvas.width - player.width;
    if (player.y < 0) player.y = 0;
    if (player.y + player.height > canvas.height) player.y = canvas.height - player.height;
}

function updateScore() {
    score++;
    document.getElementById('score').innerText = score;
    if (score > highScore) {
        highScore = score;
        localStorage.setItem('highScore', highScore);
    }
    document.getElementById('highScore').innerText = highScore;
}

function drawObstacle(obstacle) {
    ctx.fillStyle = 'blue';
    ctx.fillRect(obstacle.x, obstacle.y, obstacle.width, obstacle.height);
}

function moveObstacle(obstacle) {
    obstacle.x -= gameSpeed;
    if (obstacle.x + obstacle.width < 0) {
        obstacle.x = canvas.width;
        obstacle.y = Math.random() * (canvas.height - obstacle.height);
    }
}

function addObstacle() {
    const width = 50;
    const height = 50;
    const x = canvas.width;
    const y = Math.random() * (canvas.height - height);
    obstacles.push({ x, y, width, height });
}

function checkCollision(obstacle) {
    if (
        player.x < obstacle.x + obstacle.width &&
        player.x + player.width > obstacle.x &&
        player.y < obstacle.y + obstacle.height &&
        player.y + player.height > obstacle.y
    ) {
        gameOver = true;
    }
}

function showGameOver() {
    document.getElementById('gameOver').style.display = 'block';
}

function showLevelScreen() {
    document.getElementById('startScreen').style.display = 'none';
    document.getElementById('levelScreen').style.display = 'flex';
    document.getElementById('gameContainer').style.display = 'none';
}

function startGame(level) {
    switch (level) {
        case 'easy':
            gameSpeed = 4;
            break;
        case 'medium':
            gameSpeed = 6;
            break;
        case 'hard':
            gameSpeed = 9;
            break;
    }
    document.getElementById('levelScreen').style.display = 'none';
    document.getElementById('gameContainer').style.display = 'block';
    restartGame();
}

function restartGame() {
    score = 0;
    player.x = 100;
    player.y = 300;
    obstacles.length = 0;
    addObstacle();
    addObstacle();
    addObstacle();
    gameOver = false;
    document.getElementById('gameOver').style.display = 'none';
    update();
}

function update() {
    if (gameOver) {
        showGameOver();
        return;
    }

    clear();
    drawPlayer();
    newPos();

    obstacles.forEach(obstacle => {
        drawObstacle(obstacle);
        moveObstacle(obstacle);
        checkCollision(obstacle);
    });

    updateScore();
    requestAnimationFrame(update);
}

function moveUp() {
    player.dy = -player.speed;
}

function moveDown() {
    player.dy = player.speed;
}

function moveRight() {
    player.dx = player.speed;
}

function moveLeft() {
    player.dx = -player.speed;
}

function keyDown(e) {
    if (e.key === 'ArrowRight' || e.key === 'Right') {
        moveRight();
    } else if (e.key === 'ArrowLeft' || e.key === 'Left') {
        moveLeft();
    } else if (e.key === 'ArrowUp' || e.key === 'Up') {
        moveUp();
    } else if (e.key === 'ArrowDown' || e.key === 'Down') {
        moveDown();
    }
}

function keyUp(e) {
    if (
        e.key == 'Right' ||
        e.key == 'ArrowRight' ||
        e.key == 'Left' ||
        e.key == 'ArrowLeft' ||
        e.key == 'Up' ||
        e.key == 'ArrowUp' ||
        e.key == 'Down' ||
        e.key == 'ArrowDown'
    ) {
        player.dx = 0;
        player.dy = 0;
    }
}

document.addEventListener('keydown', keyDown);
document.addEventListener('keyup', keyUp);

update();

