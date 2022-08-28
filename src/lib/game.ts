export type CellValue = 'X' | 'O' | ' ';
export type Player = 'X' | 'O';
const isPlayer = (value: CellValue): value is Player => value !== ' ';
export type Board = [
	[CellValue, CellValue, CellValue],
	[CellValue, CellValue, CellValue],
	[CellValue, CellValue, CellValue]
];
type Winner = Player | 'DRAW';

const createInitialState = () => {
	const board: Board = [
		[' ', ' ', ' '],
		[' ', ' ', ' '],
		[' ', ' ', ' ']
	];
	const currentPlayer: Player = 'X';
	const winner = undefined as Winner | undefined;

	return {
		board: board as Board,
		currentPlayer: currentPlayer as Player,
		winner
	} as const;
};

export const createGame = () => {
	const { board, currentPlayer, winner } = createInitialState();

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
		if (result.board.every((row) => row.every((cell) => cell !== ' '))) {
			result.winner = 'DRAW';
			return;
		}
	};

	/** Resets the game state to the initial result. */
	const reset = () => {
		for (const [key, value] of Object.entries(createInitialState())) {
			// @ts-expect-error - Looping on key/value pairs assigning without recreating the object.
			result[key] = value;
		}
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
