const boardContainer = document.getElementById('board-container');
boardContainer.addEventListener('click', function(event) {
	if (event.target.classList.contains('cell')) {
		const position = event.target.getAttribute('data-position');
		console.log('Clicked by position ', position)
	} 
})

function gameBoard() {
	const board = {
      a: [ "", "", ""],
      b: [ "", "", ""],
      c: [ "", "", ""]
    };
	const getBoard = () => board;

	const putToken = (cellItem) => {
		const [row, col] = cellItem;
		if (board[row][col] === "") {
			board[row][col] = game.getActivePlayer().token;
		} 
	};

	const printBoard = () => console.log(board);

	return { getBoard, putToken, printBoard};
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
	const playerTurnRow = document.getElementById('player-turn');
	const PlayerTurn = document.createElement('p');
	playerTurnRow.appendChild(PlayerTurn);
	const getActivePlayer = () => activePlayer;
	const printNewRound = () => {
		board.printBoard();
		PlayerTurn.textContent = `${getActivePlayer().name}'s turn.`
	};
	const playRound = (cellItem) => {
		board.putToken(cellItem);
		switchPlayerTurn();
		printNewRound();
	};
	printNewRound();
	return {
		playRound, getActivePlayer
	};
}

const game = GameController();
game.playRound('a1')