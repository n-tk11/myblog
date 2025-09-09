<script lang="ts">
    let { categories } = $props();
</script>

<div>
    <h2>Categories</h2>
    <ul>
        {#each categories as category}
            <li><a href="/blogs?category={category}">{category}</a></li>
        {/each}
    </ul>
</div>

<style>
    div {
        background-color: white;
        padding: 20px;
        border-radius: 8px;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        width: 100%;
    }
</style>