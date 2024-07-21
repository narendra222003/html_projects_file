document.addEventListener('DOMContentLoaded', function() {
    const board = document.getElementById('board');
    const cells = document.querySelectorAll('.cell');
    const singlePlayerButton = document.getElementById('singlePlayerButton');
    const twoPlayersButton = document.getElementById('twoPlayersButton');
    const status = document.querySelector('.status');
    const restartButton = document.getElementById('restartButton');

    let currentPlayer = 'X';
    let gameActive = false;
    let gameState = ['', '', '', '', '', '', '', '', ''];
    let singlePlayerMode = false;

    const winningConditions = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    function handleCellClick(clickedCellEvent) {
        const clickedCell = clickedCellEvent.target;
        const clickedCellIndex = parseInt(clickedCell.getAttribute('data-cell'));

        if (gameState[clickedCellIndex] !== '' || !gameActive) {
            return;
        }

        gameState[clickedCellIndex] = currentPlayer;
        clickedCell.textContent = currentPlayer;
        clickedCell.style.color = currentPlayer === 'X' ? '#2196F3' : '#FFEB3B';

        if (checkWin()) {
            endGame(false);
        } else if (!gameState.includes('')) {
            endGame(true);
        } else {
            if (singlePlayerMode && currentPlayer === 'X') {
                // Computer's turn
                setTimeout(computerMove, 500); // Delay for a better UX
            } else {
                currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
                status.textContent = `Player ${currentPlayer}'s turn`;
            }
        }
    }

    function computerMove() {
        const emptyCells = gameState.reduce((acc, cell, index) => {
            if (!cell) acc.push(index);
            return acc;
        }, []);

        const randomIndex = emptyCells[Math.floor(Math.random() * emptyCells.length)];
        gameState[randomIndex] = 'O';
        cells[randomIndex].textContent = 'O';
        cells[randomIndex].style.color = '#FFEB3B';

        if (checkWin()) {
            endGame(false);
        } else if (!gameState.includes('')) {
            endGame(true);
        } else {
            currentPlayer = 'X';
            status.textContent = `Player ${currentPlayer}'s turn`;
        }
    }

    function checkWin() {
        for (let i = 0; i < winningConditions.length; i++) {
            const [a, b, c] = winningConditions[i];
            if (gameState[a] && gameState[a] === gameState[b] && gameState[a] === gameState[c]) {
                return true;
            }
        }
        return false;
    }

    function endGame(draw) {
        if (draw) {
            status.textContent = `It's a draw!`;
        } else {
            status.textContent = singlePlayerMode && currentPlayer === 'O' ? `Computer wins!` : `Player ${currentPlayer} wins!`;
        }
        gameActive = false;
        restartButton.style.display = 'block';
    }

    function handleRestart() {
        gameActive = false;
        singlePlayerMode = false;
        currentPlayer = 'X';
        gameState = ['', '', '', '', '', '', '', '', ''];
        status.textContent = `Choose an option to start`;
        restartButton.style.display = 'none';

        cells.forEach(cell => {
            cell.textContent = '';
            cell.style.color = '#000';
        });
    }

    function handleSinglePlayer() {
        handleRestart();
        singlePlayerMode = true;
        gameActive = true;
        status.textContent = `Player ${currentPlayer}'s turn`;
    }

    function handleTwoPlayers() {
        handleRestart();
        singlePlayerMode = false;
        gameActive = true;
        status.textContent = `Player ${currentPlayer}'s turn`;
    }

    cells.forEach(cell => {
        cell.addEventListener('click', handleCellClick);
    });

    restartButton.addEventListener('click', handleRestart);
    singlePlayerButton.addEventListener('click', handleSinglePlayer);
    twoPlayersButton.addEventListener('click', handleTwoPlayers);
});
