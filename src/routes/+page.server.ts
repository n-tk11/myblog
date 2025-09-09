import { createBlogDatabase } from "$lib/database/database";

const db = createBlogDatabase('inmemory');


export async function load() {
    const blogs = await db.getAllBlogs();
    return { blogs };
}