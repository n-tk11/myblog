

<script lang="ts">
    let { title, date, summary, id } = $props();
</script>

<div>
    <h2>{title}</h2>
    <p>{date}</p>
    <p>{summary}</p>
    <a href="/blogs/{id}">Read more</a>
</div>

<style>
    div {
        background-color: white;
        padding: 20px;
        border-radius: 8px;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        margin-bottom: 20px;
    }
</style>