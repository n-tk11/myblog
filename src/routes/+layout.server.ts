import { createBlogDatabase } from "$lib/database/database";

const db = createBlogDatabase('mysql');

export async function load(event) {
    const tags = await db.getAllTags();
    return {
        user: event.locals.user ? event.locals.user : null,
        tags
    };
}
