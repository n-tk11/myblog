

<script lang="ts">
    import  Summary from '$lib/Summary.svelte';
    import Pagination from '$lib/Pagination.svelte';
    import type { BlogPostWithTags } from '$lib/type'

    let { data } = $props();
    let blogs: BlogPostWithTags[] = $state([]);

</script>


{#each blogs as blog}
    <Summary title={blog.title} date={blog.date} summary={blog.summary} id={blog.id} isAdmin={data.user?.name === 'admin'} tags={blog.tags} />
{/each}
{#if data.user?.name === 'admin'}
    <a class="btn btn-primary" href="/blogs/add">Add Blog</a>
{/if}

<Pagination rows={data.blogs} perPage={5} bind:trimmedRows={blogs} />

<style>

</style>