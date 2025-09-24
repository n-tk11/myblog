import { readdir } from 'fs/promises';
import path from 'path';

// This file ensures the /files route works without redirecting
export async function load() {

    let image_files: string[] = [];
    try {
        const imagesPath = path.join(process.cwd(), 'static', 'images', 'blogs');
        image_files = await readdir(imagesPath);
    } catch (error) {
        console.error('Error reading images directory:', error);
    }

    return { image_files };
}
