
<script lang="ts">
    import { marked } from 'marked';
    import Sidebar from '$lib/Sidebar.svelte';
    let { data } = $props(); 
    console.log(data);
</script>

<h1>{data.blog.title}</h1>
<p>{data.blog.date}</p>

<div class="content">
    {@html marked(data.blog.content || '')} 
</div>


<style>
    .content {
        background-color: white;
        padding: 20px;
        border-radius: 8px;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    }

    :global(.content img) {
        max-width: 100%;
        height: auto;
        display: block;
        border-radius: 8px;
        margin-top: 10px;
    }



</style>