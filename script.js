let currentPlayer = 'X';
let board = ['', '', '', '', '', '', '', '', ''];
let xScore = 0;
let oScore = 0;

function makeMove(cell) {
    const index = Array.from(cell.parentNode.children).indexOf(cell);
    if (board[index] === '') {
        board[index] = currentPlayer;
        cell.innerText = currentPlayer;

        if (checkWinner(currentPlayer)) {
            setTimeout(() => {
                alert(`${currentPlayer} WINS!`);
                document.body.style.backgroundColor = 'lightgreen'; // Change background color on win
                updateScore(currentPlayer);
            }, 100);
            // Disable further clicks after win
            document.querySelectorAll('.cell').forEach(cell => cell.onclick = null);
        } else if (!board.includes('')) { // Check for draw
            setTimeout(() => alert("It's a draw!"), 100);
        } else {
            currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        }
    }
}

function checkWinner(player) {
    const winPatterns = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],
        [0, 3, 6], [1, 4, 7], [2, 5, 8],
        [0, 4, 8], [2, 4, 6]
    ];
    return winPatterns.some(pattern => {
        return pattern.every(index => board[index] === player);
    });
}

function resetGame() {
    board = ['', '', '', '', '', '', '', '', ''];
    document.querySelectorAll('.cell').forEach(cell => {
        cell.innerText = '';
        cell.onclick = () => makeMove(cell); // Re-enable clicks
    });
    currentPlayer = 'X';
    document.body.style.backgroundColor = ''; // Reset background color
}

function updateScore(player) {
    if (player === 'X') {
        xScore++;
        document.getElementById('x-score').innerText = xScore;
    } else {
        oScore++;
        document.getElementById('o-score').innerText = oScore;
    }
}