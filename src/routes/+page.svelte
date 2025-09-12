

<script>
    import  Summary from '$lib/Summary.svelte';

    let { data } = $props();
    console.log(data);

</script>


{#each data.blogs as blog}
    <Summary title={blog.title} date={blog.date} summary={blog.summary} id={blog.id} isAdmin={data.user?.name === 'admin'} />
{/each}
{#if data.user?.name === 'admin'}
    <a class="btn btn-primary" href="/blogs/add">Add Blog</a>
{/if}


<style>

</style>