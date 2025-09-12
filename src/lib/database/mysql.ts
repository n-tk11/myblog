import type { BlogDatabase,BlogPost } from './database'
import mysql from 'mysql2/promise';

const pool = mysql.createPool({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASS || '1q2w3e4r',
    database: process.env.DB_NAME || 'blog'
});

export default class MySQLBlogDatabase implements BlogDatabase {

    async getAllBlogs(): Promise<BlogPost[]> {
        const [rows] = await pool.query('SELECT * FROM blogs');
        return rows as BlogPost[];
    }
    async getBlogByid(id: number): Promise<BlogPost | null> {
        const [rows] = await pool.query('SELECT * FROM blogs WHERE id = ?', [id]);
        return (rows as BlogPost[])[0] || null;
    }
    async addBlogPost(post: BlogPost): Promise<void> {
        await pool.query('INSERT INTO blogs SET ?', post);
    }

    async deleteBlogPost(id: number): Promise<void> {
        await pool.query('DELETE FROM blogs WHERE id = ?', [id]);
    }

    async updateBlogPost(id: number, updatedPost: Partial<BlogPost>): Promise<void> {
        await pool.query('UPDATE blogs SET ? WHERE id = ?', [updatedPost, id]);
    }
}