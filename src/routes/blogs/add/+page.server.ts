import { goto } from "$app/navigation";
import { createBlogDatabase } from "$lib/database/database";
import { redirect,error } from "@sveltejs/kit";
;

const db = createBlogDatabase('mysql');

export async function load(event) {
    if (event.locals.user?.name !== 'admin') {
        throw error(403, 'You are not authorized to access this page');
    }
}


export const actions = {
    default: async ({ request }) => {
        const formData = await request.formData();
        const newPost = {
            id: null,
            title: formData.get('title') as string,
            content: formData.get('content') as string,
            summary: formData.get('summary') as string,
            date: new Date()
        };
        await db.addBlogPost(newPost);
        return redirect(303, '/admin');
    }
};