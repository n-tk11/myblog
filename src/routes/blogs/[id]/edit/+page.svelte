<script>
	// Import markdown conversion library
    import { marked } from 'marked'
	let { data } = $props();
	// Declare a variable to store the markdown data
    let markdown = $state(data.blog.content);
</script>



<!-- Declare a textarea where the user can enter markdown, and bind it to the variable `markdown` -->
<form method="POST">
	<input type="hidden" name="id" value="{data.blog.id}" />
    <input type="text" name="title" placeholder="Title" value="{data.blog.title}" />
	<input type="text" name="tags" placeholder="Tags (comma separated)" value="{data.blog.tags.join(', ')}" />
    <textarea name="summary" placeholder="Summary" required>{data.blog.summary}</textarea>
    <h1>Markdown Editor</h1>
    <textarea bind:value={markdown} placeholder="Enter markdown here" name="content"></textarea>
    <div class="preview">{@html marked(markdown || '')}</div>
    <button type="submit">Save Blog Post</button>
</form>
<!-- Make it look (slightly) nicer ;) -->
<style>
	textarea, .preview {
		box-sizing: border-box;
		display: block;
		max-width: 100%;
		width: auto;
	}
	
	textarea {
		font-family: monospace, Roboto;
		height: 25%;
		border: none;
		margin: 0;
		padding: 1rem;
        width: 100%;
        resize: vertical;
        box-sizing: border-box;
        margin-bottom: 1rem;
        
        
	}
	
	.preview {
		height: 75%;
		padding: 2rem;
        background-color: white;
        border-radius: 8px;
        margin-bottom: 1rem;
	}
	
	h1 {
		background: #e1e1e1;
		margin: 0px;
        margin-top: 0.5rem;
		padding: 0.8rem;
		font-size: 1.2rem;
	}

    input {
        padding: 0.8rem;
        margin-bottom: 1rem;
        border: none;
        border-radius: 8px;
    }
	
	:global(body) {
		padding: 0;
	}
</style>