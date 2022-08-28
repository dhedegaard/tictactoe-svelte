<script>
	import Game from '../components/Game.svelte';
</script>

<div class="container">
	<h1>Tic tac toe</h1>
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

	h1 {
		text-align: center;
	}
</style>
