<script lang="ts">
	import { createGame } from '../lib/game';
	import Board from './Board.svelte';

	let game = createGame();

	const clickPosition = (x: number, y: number) => {
		const rc = game.clickPosition(x, y);
		switch (rc) {
			case 'game-ended':
				alert('Game ended');
				return;
			case 'ok':
				// State changed, trigger reactivity.
				game = game;
				return;
			case 'position-already-taken':
				alert('Position already taken');
				return;
			default:
				throw new TypeError(`Unexpected game state: ${rc}`);
		}
	};
</script>

<p>Current player: <b>{game.currentPlayer}</b></p>

{#if game.winner != null}
	<h2>{game.winner} has won the game!</h2>
	<button type="button" on:click={game.reset}>Reset game</button>
{/if}

<Board board={game.board} {clickPosition} />
