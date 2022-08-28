export type CellValue = 'X' | 'O' | ' ';
export type Player = 'X' | 'O';
const isPlayer = (value: CellValue): value is Player => value !== ' ';
export type Board = [
	[CellValue, CellValue, CellValue],
	[CellValue, CellValue, CellValue],
	[CellValue, CellValue, CellValue]
];

const createInitialState = () => {
	const board: Board = [
		[' ', ' ', ' '],
		[' ', ' ', ' '],
		[' ', ' ', ' ']
	];
	const currentPlayer: Player = 'X';
	const winner = undefined as Player | undefined;

	return {
		board: board as Board,
		currentPlayer: currentPlayer as Player,
		winner
	};
};

export const createGame = () => {
	let { board, currentPlayer, winner } = createInitialState();

	/** Triggers a click on the given position, for the current player. */
	const clickPosition = (x: number, y: number): 'position-already-taken' | 'ok' | 'game-ended' => {
		if (x < 0 || x > 2 || y < 0 || y > 2) {
			throw new Error('Invalid position');
		}

		if (result.board[y][x] !== ' ') {
			return 'position-already-taken';
		}
		if (result.winner != null) {
			return 'game-ended';
		}

		// Update the board.
		result.board[y][x] = result.currentPlayer;
		result.currentPlayer = (result.currentPlayer === 'X' ? 'O' : 'X') as Player;

		checkWinner();

		return 'ok';
	};

	const checkWinner = () => {
		if (result.winner != null) {
			return;
		}
		for (let y = 0; y < 3; y++) {
			const row = result.board[y];
			const firstElem = row[0];
			if (isPlayer(firstElem) && firstElem === row[1] && firstElem === row[2]) {
				result.winner = firstElem;
				return;
			}
		}
		for (let x = 0; x < 3; x++) {
			const firstElem = result.board[0][x];
			if (
				isPlayer(firstElem) &&
				firstElem === result.board[1][x] &&
				firstElem === result.board[2][x]
			) {
				result.winner = firstElem;
				return;
			}
		}
		const firstElem = result.board[0][0];
		if (
			isPlayer(firstElem) &&
			firstElem === result.board[1][1] &&
			firstElem === result.board[2][2]
		) {
			result.winner = firstElem;
			return;
		}
		const secondElem = result.board[0][2];
		if (
			isPlayer(secondElem) &&
			secondElem === result.board[1][1] &&
			secondElem === result.board[2][0]
		) {
			result.winner = secondElem;
			return;
		}
	};

	/** Resets the game state to the initial result. */
	const reset = () => {
		const newState = createInitialState();
		(board = newState.board), (currentPlayer = newState.currentPlayer), (winner = newState.winner);
	};

	const result = {
		// State
		board,
		currentPlayer,
		winner,
		// Actions
		clickPosition,
		reset
	};
	return result;
};
