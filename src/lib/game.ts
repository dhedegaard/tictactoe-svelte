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
	let state = createInitialState();

	const clickPosition = (x: number, y: number): 'position-already-taken' | 'ok' | 'game-ended' => {
		if (x < 0 || x > 2 || y < 0 || y > 2) {
			throw new Error('Invalid position');
		}

		if (state.board[y][x] !== ' ') {
			return 'position-already-taken';
		}
		if (state.winner != null) {
			return 'game-ended';
		}

		// Update the board.
		state.board[y][x] = state.currentPlayer;
		state.currentPlayer = state.currentPlayer === 'X' ? ('O' as Player) : ('X' as Player);

		checkWinner();

		return 'ok';
	};

	const checkWinner = () => {
		if (state.winner != null) {
			return;
		}
		for (let y = 0; y < 3; y++) {
			const row = state.board[y];
			const firstElem = row[0];
			if (isPlayer(firstElem) && firstElem === row[1] && firstElem === row[2]) {
				state.winner = firstElem;
				return;
			}
		}
		for (let x = 0; x < 3; x++) {
			const firstElem = state.board[0][x];
			if (
				isPlayer(firstElem) &&
				firstElem === state.board[1][x] &&
				firstElem === state.board[2][x]
			) {
				state.winner = firstElem;
				return;
			}
		}
		const firstElem = state.board[0][0];
		if (isPlayer(firstElem) && firstElem === state.board[1][1] && firstElem === state.board[2][2]) {
			state.winner = firstElem;
			return;
		}
		const secondElem = state.board[0][2];
		if (
			isPlayer(secondElem) &&
			secondElem === state.board[1][1] &&
			secondElem === state.board[2][0]
		) {
			state.winner = secondElem;
			return;
		}
	};

	const reset = () => {
		state = createInitialState();
	};

	return {
		board: Object.freeze(state.board) as Board,
		currentPlayer: Object.freeze(state.currentPlayer),
		clickPosition,
		winner: state.winner,
		state,
		reset
	};
};
