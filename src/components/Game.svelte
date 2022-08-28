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
	{#if game.winner != null}
		<h4>
			{#if game.winner === 'DRAW'}
				Draw
			{:else}
				Winner: {game.winner}
			{/if}
		</h4>
		<button type="button" on:click={clickReset}>Reset game</button>
	{:else}
		<p>Current player: <b>{game.currentPlayer}</b></p>
	{/if}
</div>

<Board board={game.board} {clickPosition} />

<style>
	.player-row {
		margin-bottom: 1em;
		display: flex;
		gap: 8px;
		align-items: center;
	}
</style>
