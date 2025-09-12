

<script lang="ts">
    let { title, date, summary, id, isAdmin , tags} = $props();
</script>

<div class="summary">
    <h2>{title}</h2> 
    {#if tags && tags.length > 0}
        <p>Tags: {tags.join(', ')}</p>
    {/if}
    <p>{date}</p>
    <p>{summary}</p>
    <a href="/blogs/{id}">Read more</a>
    {#if isAdmin}
    <div class="admin-actions" style="margin-top: 10px;">
        <form method="POST" action="?/delete" >
            <a class="btn btn-secondary" href="/blogs/{id}/edit">Edit</a>
            <input type="hidden" name=blog_id value={id} />
            <button type="submit" class="btn btn-danger">Delete</button>
        </form>
    </div>
    {/if}
</div>

<style>
    .summary {
        background-color: white;
        padding: 20px;
        border-radius: 8px;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        margin-bottom: 20px;
    }


    h2 {
        margin-top: 0;
    }
</style>