const gameBoard = document.getElementById('game-board');
const rows = 10;
const cols = 10;
const mines = 15;

let board = [];

function initBoard() {
    for (let i = 0; i < rows; i++) {
        board[i] = [];
        for (let j = 0; j < cols; j++) {
            const cell = document.createElement('div');
            cell.classList.add('cell', 'hidden');
            cell.dataset.row = i;
            cell.dataset.col = j;
            cell.addEventListener('click', handleClick);
            gameBoard.appendChild(cell);
            board[i][j] = {
                isMine: false,
                isRevealed: false,
                element: cell
            };
        }
    }
    placeMines();
}

function placeMines() {
    let minesPlaced = 0;
    while (minesPlaced < mines) {
        const row = Math.floor(Math.random() * rows);
        const col = Math.floor(Math.random() * cols);
        if (!board[row][col].isMine) {
            board[row][col].isMine = true;
            minesPlaced++;
        }
    }
}

function handleClick(event) {
    const row = parseInt(event.target.dataset.row);
    const col = parseInt(event.target.dataset.col);

    if (board[row][col].isMine) {
        alert('Game Over');
        revealAll();
    } else {
        revealCell(row, col);
    }
}

function revealCell(row, col) {
    if (row < 0 || row >= rows || col < 0 || col >= cols || board[row][col].isRevealed) {
        return;
    }

    const cell = board[row][col];
    cell.isRevealed = true;
    cell.element.classList.remove('hidden');

    const mineCount = countAdjacentMines(row, col);

    if (mineCount > 0) {
        cell.element.textContent = mineCount;
    } else {
        for (let i = -1; i <= 1; i++) {
            for (let j = -1; j <= 1; j++) {
                revealCell(row + i, col + j);
            }
        }
    }
}

function countAdjacentMines(row, col) {
    let count = 0;
    for (let i = -1; i <= 1; i++) {
        for (let j = -1; j <= 1; j++) {
            const newRow = row + i;
            const newCol = col + j;
            if (newRow >= 0 && newRow < rows && newCol >= 0 && newCol < cols && board[newRow][newCol].isMine) {
                count++;
            }
        }
    }
    return count;
}

function revealAll() {
    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
            const cell = board[i][j];
            cell.element.classList.remove('hidden');
            if (cell.isMine) {
                cell.element.classList.add('mine');
            }
        }
    }
}

initBoard();