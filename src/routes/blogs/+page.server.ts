import { createBlogDatabase } from "$lib/database/database";

const db = createBlogDatabase('mysql');


export async function load({locals, url}) {
    let tagsParam = url.searchParams.get('tag') || '';
    const tags = tagsParam ? tagsParam.split(',') : [];
    let blogs = await db.getAllBlogs(tags.length ? tags : []);
    return { blogs, user: locals.user ? locals.user : null };
}


export const actions = {
    delete: async ({ request }) => {
        const formData = await request.formData();
        const blogId = formData.get('blog_id');
        if (blogId) {
            await db.deleteBlogPost(Number(blogId));
            return { success: true };
        }
        return { success: false, error: 'Invalid blog ID' };
    }
}