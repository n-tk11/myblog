import { createBlogDatabase } from "$lib/database/database";
import { redirect,error } from "@sveltejs/kit";
import { writeFile, existsSync } from "fs";

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
    save: async ({ request }) => {
        const formData = await request.formData();
        const newPost = {
            title: formData.get('title') as string,
            content: formData.get('content') as string,
            summary: formData.get('summary') as string,
            date: new Date()
        };
        await db.updateBlogPost(formData.get('id') as unknown as number, newPost);
        return redirect(303, '/');
    },

    upload: async ({ request }) => {
        const formData = await request.formData();
        const file = formData?.get('image') as File;
        if (file && file.size > 0) {
            const arrayBuffer = await file.arrayBuffer();
            const buffer = Buffer.from(arrayBuffer);
            let filename = file.name; 
            if (existsSync(`static/images/blogs/${filename}`)) {
                filename = file.name + '_' + Math.random().toString(36).substring(2, 7);
            }
            writeFile(`static/images/blogs/${filename}`, buffer, (err) => {
                if (err) {
                    return { error: 'File upload failed' };
                }
            });
            return { success: true, filename: filename };
        } else {
            return { error: 'No file uploaded' };
        }
        
    }
};