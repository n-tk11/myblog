

<script lang="ts">
    import  Summary from '$lib/Summary.svelte';
    import Pagination from '$lib/Pagination.svelte';
    import type { BlogPost } from '$lib/database/database'

    let { data } = $props();
    const sorted_data = data.blogs.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

    let blogs: BlogPost[] = $state([]);
</script>


{#each blogs as blog}
    <Summary title={blog.title} date={blog.date} summary={blog.summary} id={blog.id} isAdmin={data.user?.name === 'admin'} />
{/each}
{#if data.user?.name === 'admin'}
    <a class="btn btn-primary" href="/blogs/add">Add Blog</a>
{/if}

<Pagination rows={sorted_data} perPage={5} bind:trimmedRows={blogs} />

<style>

</style>