<script>
    import  Summary from '$lib/Summary.svelte';
    import Sidebar from '$lib/Sidebar.svelte';

    let { data } = $props();
    console.log(data);

    
</script>

{#each data.blogs as blog}
    <Summary title={blog.title} date={blog.date} summary={blog.summary} id={blog.id} />
{/each}
<a href="/admin/add"><button>Add Blog</button></a>


<style>
    form {
        background-color: white;
        padding: 20px;
        border-radius: 8px;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        margin-top: 20px;
        display: flex;
        flex-direction: column;
        gap: 10px;
    }
</style>