<script lang="ts">
	import favicon from '$lib/assets/favicon.svg';
	import Sidebar from '$lib/Sidebar.svelte';

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
		<a href="/admin">Admin</a>
	</nav>
</div>

<div class="main">
	<div class="contents">
		{@render children?.()}
	</div>
    <div class="sidebar">
        <Sidebar categories={['Tech', 'Life', 'Travel']} />
    </div>
</div>

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

	.main {
        display: flex;
        justify-content: space-between;
        margin-top: 20px;
        gap: 20px;
    }

	.contents {
        flex: 3;
        margin-right: 20px;
    }

    .sidebar {
        flex: 1;
    }

</style>