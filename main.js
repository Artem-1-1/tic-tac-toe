function gameBoard() {
	const ROWS = 3;
	const COLUMNS = 3;
	const EMPTY_MARK = "";
	const board = [];

	const createEmptyBoard = () => {
		for (i = 0;i < ROWS;i++) {
			board[i] = [];
			for (j = 0; j < COLUMNS;j++) {
				board[i][j] = EMPTY_MARK;
			}		
		}
	}
	createEmptyBoard();

	const getBoard = () => board;

	const markOnBoard = (row, column, mark) => {
		if (row >= 0 && row < ROWS && column >= 0 && column < COLUMNS) {
			board[row][column] = mark;
			return true;
		}
		return false; 
	};

	const resetBoard = () => {
        createEmptyBoard();
	}	

	return { getBoard, markOnBoard, resetBoard, ROWS, COLUMNS, EMPTY_MARK};
}

function GameController(
	playerOneName = 'PlayerOne',
	playerTwoName = 'PlayerTwo'
) {
	const board = gameBoard();
	const players = [
		{
			name: playerOneName,
			token: '0'
		},
		{
			name: playerTwoName,
			token: 'X'
		}];
	let activePlayer = players[0];

	const switchPlayerTurn = () => {
		activePlayer = activePlayer === players[0] ? players[1] : players[0];
	}
	const boardContainer = document.getElementById('board-container');
	boardContainer.addEventListener('click', function(event) {
	if (event.target.classList.contains('cell')) {
		const positionStr = event.target.getAttribute('data-position');
		console.log('Clicked by position ', positionStr);
		const cellNumber = parseInt(positionStr); 
    const row = Math.floor((cellNumber - 1) / board.COLUMNS);
    const col = (cellNumber - 1) % board.COLUMNS;
		playRound(row, col);
	} 
})
	const playerTurnRow = document.getElementById('player-turn');
	const PlayerTurn = document.createElement('p');
	playerTurnRow.appendChild(PlayerTurn);

	const getActivePlayer = () => activePlayer;
	const printNewRound = () => {
		board.getBoard();
		PlayerTurn.textContent = `${getActivePlayer().name}'s turn.`
	};

	const playRound = (row, col) => {
		if (board.getBoard()[row][col] === board.EMPTY_MARK) {
			board.markOnBoard(row, col, getActivePlayer().token);
			switchPlayerTurn();
			printNewRound();
		} else {
			console.log(`Cell [${row}, ${col}] is already occupied!`);
			return
		}
};
	printNewRound();
	return {
		playRound, getActivePlayer, getBoard: board.getBoard
	};
}

const game = GameController();