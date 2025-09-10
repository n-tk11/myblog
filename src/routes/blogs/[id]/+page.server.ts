import { createBlogDatabase } from "$lib/database/database";
import { error } from "@sveltejs/kit";

const db = createBlogDatabase('mysql');


export async function load({ params }: { params: { id: number } }) {
    const blog = await db.getBlogByid(params.id);
    if (!blog) {
        error(404, 'Blog not found');
    }
    return { blog };
}