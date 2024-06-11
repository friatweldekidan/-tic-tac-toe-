document.addEventListener('DOMContentLoaded', () => {
    const cells = document.querySelectorAll('.cell');
    const statusText = document.querySelector('h1');
    const playAgainButton = document.querySelector('button');
    let currentPlayer = 'X';
    let gameActive = true;
    const gameState = ['', '', '', '', '', '', '', '', ''];
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

    function handleCellClick(event) {
        const clickedCell = event.target;
        const clickedCellIndex = Array.from(cells).indexOf(clickedCell);

        if (gameState[clickedCellIndex] !== '' || !gameActive) {
            return;
        }

        gameState[clickedCellIndex] = currentPlayer;
        clickedCell.innerText = currentPlayer;

        if (checkWin()) {
            statusText.innerText = `Player ${currentPlayer} has won!`;
            gameActive = false;
            return;
        }

        if (gameState.every(cell => cell !== '')) {
            statusText.innerText = 'Draw!';
            gameActive = false;
            return;
        }

        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        statusText.innerText = `Player ${currentPlayer} to move`;
    }

    function checkWin() {
        return winningConditions.some(condition => {
            const [a, b, c] = condition;
            return gameState[a] === currentPlayer && gameState[a] === gameState[b] && gameState[a] === gameState[c];
        });
    }

    function resetGame() {
        gameActive = true;
        currentPlayer = 'X';
        gameState.fill('');
        statusText.innerText = `Player ${currentPlayer} to move`;
        cells.forEach(cell => cell.innerText = '');
    }

    cells.forEach(cell => cell.addEventListener('click', handleCellClick));
    playAgainButton.addEventListener('click', resetGame);
});
