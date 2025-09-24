<script lang="ts">
	let { data } = $props();
</script>


<h1>Image Files Page</h1>

<div class="image-gallery">
	{#each data.image_files as image}
		<div class="image-item">
			<img src={`/images/blogs/${image}`} alt={image} />
			<p style="max-width: 200px; word-wrap: break-word; overflow-wrap: break-word;">{image}</p>
		</div>
	{/each}
</div>



<style>
	.image-gallery {
		display: flex;
		flex-wrap: wrap;
		gap: 20px;
	}
	.image-item {
		margin-bottom: 20px;
	}
	.image-item img {
		width: 200px;
		height: 200px;
		display: block;
		margin-bottom: 5px;
	}
</style>