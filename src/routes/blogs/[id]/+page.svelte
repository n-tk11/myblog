
<script lang="ts">
    import { marked } from 'marked';
    import Sidebar from '$lib/Sidebar.svelte';
    let { data } = $props(); 
    console.log(data);
</script>

<h1>{data.blog.title}</h1>
<p>{data.blog.date}</p>
<div class="post">

        <div class="content">
            {@html marked(data.blog.content)} 
        </div>
        <div class="sidebar">
            <Sidebar categories={['Tech', 'Life', 'Travel']} />
        </div>
</div>

<style>
    .post {
        display: flex;
        justify-content: space-between;
        margin-top: 20px;
        gap: 20px;
    }

    .content {
        flex: 3;
        margin-right: 20px;
        background-color: white;
        padding: 20px;
        border-radius: 8px;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        width: 100%;
    }

    :global(.content img) {
        max-width: 100%;
        height: auto;
        display: block;
        border-radius: 8px;
        margin-top: 10px;
    }

    .sidebar {
        flex: 1;
    }

    .post div {
        width: 100%;
    }

   
</style>