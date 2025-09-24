<script lang="ts">
	// Import markdown conversion library
    import { marked } from 'marked'
	import { enhance } from '$app/forms';
	import { writable } from 'svelte/store';
	let { data,form } = $props();
	let imagesFiles = writable<string[]>([]);
	// Declare a variable to store the markdown data
    let markdown = $state(data.blog.content);
	let title = $state(data.blog.title);
	let summary = $state(data.blog.summary);
	let tags = $state(data.blog.tags?.join(', '));
	console.log(data);

</script>

{#if form?.success}
    <div class="success-message">
        {#if form.filename}
            Image "{form.filename}" uploaded successfully!
        {:else}
            Action completed successfully!
        {/if}
    </div>
{/if}

{#if form?.error}
    <div class="error-message">
        {form.error}
    </div>
{/if}

<!-- Main blog edit form -->
<form method="POST" action="?/save" use:enhance>
	<input type="hidden" name="id" value="{data.blog.id}" />
    <input type="text" name="title" placeholder="Title" bind:value="{title}" />
	<input type="text" name="tags" placeholder="Tags (comma separated)" bind:value="{tags}" />
    <textarea name="summary" placeholder="Summary" required bind:value="{summary}"></textarea>
    <h1>Markdown Editor</h1>
    <textarea bind:value={markdown} placeholder="Enter markdown here" name="content"></textarea>
    <div class="preview">{@html marked(markdown || '')}</div>

    <button class="save-button" type="submit">Save Blog Post</button>
</form>

<!-- Separate upload form -->
<div class="upload-section">
    <h3>Upload Images</h3>
	<form method="POST" action="?/upload" enctype="multipart/form-data" use:enhance={() => {
		return async ({ result, formElement }) => {
			if (result.type === 'success' && result.data?.filename) {
				imagesFiles.update(files => [...files, result.data?.filename as string]);
				// Clear the file input after successful upload
				formElement.reset();
			}
		};
	}}>
        <div class="upload-form">
            <input type="file" accept="image/*" name="image"/>
            <button type="submit">Upload Image</button>
        </div>
    </form>
    <div>
        <ul>
            {#each $imagesFiles as img}
                <li>{img}</li>
            {/each}
        </ul>
    </div>
</div>
<!-- Make it look (slightly) nicer ;) -->
<style>
	.success-message {
		background-color: #d4edda;
		color: #155724;
		padding: 10px;
		border-radius: 4px;
		margin-bottom: 15px;
		border: 1px solid #c3e6cb;
	}
	
	.error-message {
		background-color: #f8d7da;
		color: #721c24;
		padding: 10px;
		border-radius: 4px;
		margin-bottom: 15px;
		border: 1px solid #f5c6cb;
	}
	
	.upload-section {
		background-color: #f8f9fa;
		padding: 20px;
		border-radius: 8px;
		margin: 20px 0;
		border: 2px dashed #dee2e6;
	}
	
	.upload-section h3 {
		margin-top: 0;
		color: #495057;
	}
	
	.upload-form {
		display: flex;
		gap: 10px;
		align-items: center;
	}
	
	.upload-section input[type="file"] {
		flex: 1;
	}
	
	.upload-section button {
		background-color: #6c757d;
		color: white;
		border: none;
		padding: 8px 16px;
		border-radius: 4px;
		cursor: pointer;
	}
	
	.upload-section button:hover {
		background-color: #5a6268;
	}
	
	.save-button {
		background-color: #007bff;
		color: white;
		border: none;
		padding: 12px 24px;
		border-radius: 4px;
		cursor: pointer;
		font-size: 16px;
		margin-top: 20px;
		width: 100%;
	}
	
	.save-button:hover {
		background-color: #0056b3;
	}

	textarea, .preview {
		box-sizing: border-box;
		display: block;
		max-width: 100%;
		width: auto;
	}
	
	textarea {
		font-family: monospace, Roboto;
		font-size: 0.875rem;
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

	:global(.preview img) {
        max-width: 100%;
        height: auto;
        display: block;
        border-radius: 8px;
        margin-top: 10px;
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