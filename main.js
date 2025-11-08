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
	const getActivePlayer = () => activePlayer;
	const printNewRound = () => {
		board.printBoard();
		console.log(`${getActivePlayer().name}'s turn.`)
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