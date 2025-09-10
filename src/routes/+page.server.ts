import { createBlogDatabase } from "$lib/database/database";

const db = createBlogDatabase('mysql');


export async function load() {
    const blogs = await db.getAllBlogs();
    return { blogs };
}


export const actions = {
    default: async () => {
        const newPost = {
            id: null,
            title: 'New Blog Post',
            content: 'This is a new blog post.',
            summary: 'Summary of new blog post',
            date: new Date()
        };
        await db.addBlogPost(newPost);
        return { success: true };
    }
}