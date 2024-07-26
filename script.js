document.addEventListener('DOMContentLoaded', () => {
    const cells = document.querySelectorAll('.cell');
    const message = document.getElementById('message');
    const resetButton = document.getElementById('reset');
    const homeButton = document.getElementById('home');
    const modeButtons = document.getElementById('mode');
    const pvpButton = document.getElementById('pvp');
    const pvcButton = document.getElementById('pvc');
    const musicButton = document.getElementById('music');
    const backgroundMusic = document.getElementById('background-music');
    const gameElement = document.getElementById('game');
    
    let board = Array(9).fill(null);
    let currentPlayer = 'X';
    let gameActive = true;
    let isPvP = true;

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

    function handleCellClick(e) {
        const index = e.target.getAttribute('data-index');

        if (board[index] !== null || !gameActive) return;

        board[index] = currentPlayer;
        e.target.textContent = currentPlayer;

        if (checkWin()) {
            message.textContent = `${currentPlayer} wins!`;
            gameActive = false;
        } else if (board.every(cell => cell !== null)) {
            message.textContent = 'Draw!';
            gameActive = false;
        } else {
            currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
            if (!isPvP && currentPlayer === 'O') {
                setTimeout(computerMove, 500);
            }
        }
    }

    function computerMove() {
        let availableCells = board
            .map((val, index) => (val === null ? index : null))
            .filter(val => val !== null);

        let randomIndex = availableCells[Math.floor(Math.random() * availableCells.length)];

        board[randomIndex] = currentPlayer;
        cells[randomIndex].textContent = currentPlayer;

        if (checkWin()) {
            message.textContent = `${currentPlayer} wins!`;
            gameActive = false;
        } else if (board.every(cell => cell !== null)) {
            message.textContent = 'Draw!';
            gameActive = false;
        } else {
            currentPlayer = 'X';
        }
    }

    function checkWin() {
        return winningConditions.some(condition => {
            return condition.every(index => board[index] === currentPlayer);
        });
    }

    function resetGame() {
        board.fill(null);
        cells.forEach(cell => cell.textContent = '');
        currentPlayer = 'X';
        gameActive = true;
        message.textContent = '';
    }

    function startGame(isPvPMode) {
        isPvP = isPvPMode;
        modeButtons.classList.add('hidden');
        gameElement.classList.remove('hidden');
    }

    function goHome() {
        gameElement.classList.add('hidden');
        modeButtons.classList.remove('hidden');
        resetGame();
    }
    function toggleMusic() {
        if (backgroundMusic.paused) {
            backgroundMusic.play();
            musicButton.textContent = 'Pause Music';
        } else {
            backgroundMusic.pause();
            musicButton.textContent = 'Play Music';
        }
    }

    cells.forEach(cell => cell.addEventListener('click', handleCellClick));
    resetButton.addEventListener('click', resetGame);
    homeButton.addEventListener('click', goHome);
    pvpButton.addEventListener('click', () => startGame(true));
    pvcButton.addEventListener('click', () => startGame(false));
    musicButton.addEventListener('click', toggleMusic);

});
