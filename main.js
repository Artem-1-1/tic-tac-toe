function gameBoard() {
	const ROWS = 3;
	const COLUMNS = 3;
	const EMPTY_MARK = "";
	const board = [];

	const createEmptyBoard = () => {
		for (let i = 0;i < ROWS;i++) {
			board[i] = [];
			for (let j = 0; j < COLUMNS;j++) {
				board[i][j] = EMPTY_MARK;
			}		
		}
	}
	createEmptyBoard();

	const getBoard = () => board;

	const markOnBoard = (row, column, mark) => {
		if (row >= 0 && row < ROWS && column >= 0 && column < COLUMNS) {
			if (board[row][column] === EMPTY_MARK) {
			board[row][column] = mark;
			return true;
			}
		}
		return false; 
	};

	const resetBoard = () => {
        createEmptyBoard();
	}	

	return { getBoard, markOnBoard, resetBoard, ROWS, COLUMNS, EMPTY_MARK};
}

function GameController(playerOneName, playerTwoName) {
	const board = gameBoard();
	const players = [
		{ name: playerOneName, token: '0' },
		{ name: playerTwoName, token: 'X' }
	];
	let activePlayer = players[0];
	let isGameOver = false;
	let turns = 0;

	const playerTurnRow = document.getElementById('player-turn');
	playerTurnRow.textContent = "";
	const playerTurn = document.createElement('p');
	playerTurnRow.appendChild(playerTurn);

	const getActivePlayer = () => activePlayer;

	const switchPlayerTurn = () => {
		activePlayer = activePlayer === players[0] ? players[1] : players[0];
	};

	const checkWin = (boardArray, playerToken) => {
		for (let i = 0; i < board.ROWS; i++) {
			if (boardArray[i][0] === playerToken && boardArray[i][1] === playerToken && boardArray[i][2] === playerToken)
				return true;
		}
		for (let j = 0; j < board.COLUMNS; j++) {
			if (boardArray[0][j] === playerToken && boardArray[1][j] === playerToken && boardArray[2][j] === playerToken)
				return true;
		}
		if (boardArray[0][0] === playerToken && boardArray[1][1] === playerToken && boardArray[2][2] === playerToken)
			return true;
		if (boardArray[0][2] === playerToken && boardArray[1][1] === playerToken && boardArray[2][0] === playerToken)
			return true;

		return false;
	};

	const printNewRound = () => {
		if (!isGameOver) {
			playerTurn.textContent = `${getActivePlayer().name}'s turn.`;
		}
	};

	const playRound = (row, col) => {
		if (isGameOver) return;
		if (board.markOnBoard(row, col, getActivePlayer().token)) {
			turns++;
			if (checkWin(board.getBoard(), getActivePlayer().token)) {
				playerTurn.textContent = `${getActivePlayer().name} wins!`;
				isGameOver = true;
				return;
			}
			if (turns === board.ROWS * board.COLUMNS) {
				playerTurn.textContent = "It's a draw!";
				isGameOver = true;
				return;
			}
			switchPlayerTurn();
			printNewRound();
		} else {
			console.log(`Cell [${row}, ${col}] is already occupied!`);
		}
	};

	const cells = document.querySelectorAll('.cell');
	cells.forEach(cell => {
		cell.addEventListener('click', (event) => {
			if (isGameOver) return;
			const positionStr = event.target.getAttribute('data-position');
			const cellNumber = parseInt(positionStr);
			const row = Math.floor((cellNumber - 1) / board.COLUMNS);
			const col = (cellNumber - 1) % board.COLUMNS;
			if (board.getBoard()[row][col] === board.EMPTY_MARK) {
				playRound(row, col);
				event.target.textContent = board.getBoard()[row][col];
			}
		});
	});

	const resetGame = () => {
		board.resetBoard();
		isGameOver = false;
		activePlayer = players[0];
		turns = 0;
		cells.forEach(cell => (cell.textContent = board.EMPTY_MARK));
		playerTurn.textContent = `${getActivePlayer().name}'s turn.`;
		startBtn.disabled = false;
	};

	printNewRound();

	return {
		playRound,
		getActivePlayer,
		getBoard: board.getBoard,
		resetGame
	};
}

const dialog = document.getElementById('dialog');
const startBtn = document.getElementById('start');
const resetBtn = document.getElementById('reset');
const form = document.getElementById('form');
const playerOneInput = document.getElementById('playerOne');
const playerTwoInput = document.getElementById('playerTwo');
const closeBtn = document.getElementById('close');

let game;

form.addEventListener('submit', (event) => {
	event.preventDefault();
	const playerOne = playerOneInput.value;
	const playerTwo = playerTwoInput.value;
	game = GameController(playerOne, playerTwo);
	dialog.close();
	startBtn.disabled = true;
})

startBtn.addEventListener('click', (event) => {
	dialog.showModal();
})

resetBtn.addEventListener('click', (event) => {
	if (game) {
		game.resetGame();
	}
});

closeBtn.addEventListener("click", () => {
  dialog.close();
})