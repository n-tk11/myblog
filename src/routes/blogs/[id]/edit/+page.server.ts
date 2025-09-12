import { createBlogDatabase } from "$lib/database/database";
import { redirect,error } from "@sveltejs/kit";


const db = createBlogDatabase('mysql');

export async function load({ locals, params }: { locals: any, params: { id: string } }) {
    if (locals.user?.name !== 'admin') {
        throw error(403, 'You are not authorized to access this page');
    }
    const blog = await db.getBlogByid(Number(params.id));
    if (!blog) {
        throw error(404, 'Blog not found');
    }
    return { blog };
}


export const actions = {
    default: async ({ request }) => {
        const formData = await request.formData();
        const newPost = {
            title: formData.get('title') as string,
            content: formData.get('content') as string,
            summary: formData.get('summary') as string,
            date: new Date()
        };
        await db.updateBlogPost(formData.get('id') as unknown as number, newPost);
        return redirect(303, '/');
    }
};