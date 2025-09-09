<script lang="ts">
	import favicon from '$lib/assets/favicon.svg';

	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

<div class="header">
	<h1>Tul's Blog</h1>

	<nav>
		<a href="/">Home</a>
		<a href="/about">About</a>
		<a href="/posts">Posts</a>
	</nav>
</div>

{@render children?.()}

<style>

	.header {
		display: flex;
		align-items: center;
		justify-content: space-between;
	}

	.header nav a {
		margin-left: 20px;
		text-decoration: none;
		color: inherit;
		font-weight: bold;
	}

</style>