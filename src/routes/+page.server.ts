import { createBlogDatabase } from "$lib/database/database";

const db = createBlogDatabase('mysql');


export async function load(event) {
    const blogs = await db.getAllBlogs();
    return { blogs, user: event.locals.user ? event.locals.user : null };
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