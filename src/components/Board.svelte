<script lang="ts">
	import type { Board } from '../lib/game';

	export let board: Board;
	export let clickPosition: (x: number, y: number) => void;
</script>

<div class="grid">
	{#each board as row, y}
		<div class="row">
			{#each row as cell, x}
				<button type="button" role="button" tabindex="0" class="cell" on:click={() => clickPosition(x, y)}>
					{cell}
				</button>
			{/each}
		</div>
	{/each}
</div>

<style class="grid">
	.grid {
		box-sizing: border-box;
		max-width: 100%;
		aspect-ratio: 1 / 1;
		max-height: calc(100vh - 140px);
		background-color: #ccc;
		padding: 1px;
		display: flex;
		gap: 1px;
		display: flex;
		margin: 0 auto;
		flex-direction: column;
		justify-content: stretch;
	}

	.row {
		flex: 1 1 0px;
		box-sizing: border-box;
		width: 100%;
		display: flex;
		gap: 1px;
		background-color: transparent;
	}

	.cell {
		aspect-ratio: 1 / 1;
		box-sizing: border-box;
		flex: 1 1 0px;
		background-color: #fff;
		font-size: 4em;
		display: flex;
		align-items: center;
		justify-content: center;
		user-select: none;
		border: none;
		cursor: pointer;
	}
</style>
