<script lang="ts">
	import favicon from '$lib/assets/favicon.svg';
	import Sidebar from '$lib/Sidebar.svelte';
	import { enhance } from '$app/forms';
	
	let { children, data } = $props();
	
	
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

<div class="header">
	<h1>Tul's Blog</h1>

	<nav>
		<a href="/blogs">Home</a>
		<a href="/about">About</a>
		{#if data.user?.name === "admin"}
			<a href="/admin">Admin</a>
			<form method="POST" action="/logout" use:enhance style="display: inline;">
				<button type="submit" class="logout-btn">Logout</button>
			</form>
		{:else}
			<a href="/login">Login</a>
		{/if}
	</nav>
</div>

<div class="main">
	<div class="contents">
		{@render children?.()}
	</div>
    <div class="sidebar">
        <Sidebar categories={data.tags} />
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

	.logout-btn {
		margin-left: 20px;
		background: none;
		border: none;
		color: inherit;
		font-weight: bold;
		font-size: inherit;
		font-family: inherit;
		cursor: pointer;
		text-decoration: none;
	}

	.logout-btn:hover {
		opacity: 0.7;
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