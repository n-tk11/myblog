

<script>
    import  Summary from '$lib/Summary.svelte';
    import Sidebar from '$lib/Sidebar.svelte';
</script>

<div class="main">
    <div class="contents">
        <Summary title="First Post" date="2024-06-01" summary="This is the summary of the first post." id="first-post" />
        <Summary title="Second Post" date="2024-06-02" summary="This is the summary of the second post." id="second-post" />
        <Summary title="Third Post" date="2024-06-03" summary="This is the summary of the third post." id="third-post" />
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