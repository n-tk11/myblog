<script lang="ts">
    let { categories } = $props();
    import { goto } from '$app/navigation';

    let tags: string[] = $state([]);
    
    $effect(() => {
        const query = tags.map(tag => `${encodeURIComponent(tag)}`).join(',');
        const url = query ? `/blogs?tag=${query}` : '/blogs';
        // Use goto for client-side navigation
        goto(url);
    });
</script>

<div class="sidebar">
    <h2>Tags</h2>
    <div class="tags">
        {#each categories as category}
        <label data-sveltekit-reload>
            <input type="checkbox" 
                name="tag"
                value={category}
                bind:group={tags}
            />
            {category}
        </label>
        {/each}
    </div>
</div>

<style>
    .sidebar {
        background-color: white;
        padding: 20px;
        border-radius: 8px;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        width: 100%;
    }


    .tags {
        display: flex;
        flex-direction: column;
        gap: 4px;
    }
    h2 {
        margin-top: 0;
    }
</style>