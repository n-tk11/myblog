

<script>
    import  Summary from '$lib/Summary.svelte';
    import Sidebar from '$lib/Sidebar.svelte';

    let { data } = $props();
    console.log(data);

</script>

<div class="main">
    <div class="contents">
        {#each data.blogs as blog}
            <Summary title={blog.title} date={blog.date} summary={blog.summary} id={blog.id} />
        {/each}
        <form method="POST">
            <button>Add Blog</button>
        </form>
    </div>
    <div class="sidebar">
        <Sidebar categories={['Tech', 'Life', 'Travel']} />
    </div>
</div>


<style>
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