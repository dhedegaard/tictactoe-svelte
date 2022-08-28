<script>
	import Game from '../components/Game.svelte';
</script>

<div class="container">
	<div class="title">
		<h1>Tic tac toe in Svelte</h1>
		<a
			class="github-link"
			href="https://github.com/dhedegaard/tictactoe-svelte"
			target="_blank"
			rel="noopener noreferer">Github</a
		>
	</div>

	<hr />

	<Game />
</div>

<style>
	:global(body) {
		font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif,
			'Apple Color Emoji', 'Segoe UI Emoji';
		margin: 0;
		padding: 0;
	}

	.container {
		max-width: 800px;
		margin: 16px auto 0;
	}

	.title {
		display: flex;
		justify-content: space-between;
		align-items: center;
		gap: 8px;
	}

	h1 {
		margin: 0;
		flex: auto;
	}

	.github-link {
		flex: none;
	}

	h1 {
		text-align: center;
	}
</style>
