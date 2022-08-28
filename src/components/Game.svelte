<script lang="ts">
	import { createGame } from '../lib/game';
	import Board from './Board.svelte';

	let game = createGame();

	const clickPosition = (x: number, y: number) => {
		const rc = game.clickPosition(x, y);
		switch (rc) {
			case 'ok':
				// State changed, trigger reactivity.
				game = game;
				return;
			case 'game-ended':
				alert('Game ended');
				return;
			case 'position-already-taken':
				alert('Position already taken');
				return;
			default:
				throw new TypeError(`Unexpected game state: ${rc}`);
		}
	};

	const clickReset = () => {
		game.reset();
		game = game;
	};
</script>

<div class="player-row">
	<p>Current player: <b>{game.currentPlayer}</b></p>
	{#if game.winner != null}
		<div class="winner">
			<h4>{game.winner} has won the game!</h4>
			<button type="button" on:click={clickReset}>Reset game</button>
		</div>
	{/if}
</div>

<Board board={game.board} {clickPosition} />

<style>
	.player-row {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-bottom: 1em;
	}

	.winner {
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 1em;
	}
</style>
