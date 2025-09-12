import type { BlogPostWithTags ,BlogPost } from '$lib/type';
import type { BlogDatabase} from './database'
import mysql from 'mysql2/promise';

const pool = mysql.createPool({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASS || '1q2w3e4r',
    database: process.env.DB_NAME || 'blog'
});

type DBBlogPostWithTags = BlogPost & { tags: string | null };
export default class MySQLBlogDatabase implements BlogDatabase {

    async getAllBlogs(tags: string[]): Promise<BlogPostWithTags[]> {
        let query = 'SELECT b.id, b.title, b.content, b.summary, b.date, GROUP_CONCAT(tags.name) AS tags FROM blogs b LEFT JOIN blog_tag ON b.id = blog_tag.blog_id LEFT JOIN tags ON blog_tag.tag_id = tags.id';
        const params: any[] = [];
        if (tags.length > 0) {
            query += ' WHERE b.id IN (SELECT blog_id FROM blog_tag JOIN tags ON blog_tag.tag_id = tags.id WHERE tags.name IN (?))';
            params.push(tags);
        }
        query += ' GROUP BY b.id, b.title, b.content, b.summary, b.date ORDER BY b.date DESC';
        const [rows] = await pool.query(query, params);
        for (let i = 0; i < (rows as any[]).length; i++) {
            (rows as any[])[i].tags = (rows as any[])[i].tags ? (rows as any[])[i].tags.split(',') : [];
        }
        return rows as BlogPostWithTags[];
    }
    async getBlogByid(id: number): Promise<BlogPostWithTags | null> {
        const [rows] = await pool.query('SELECT b.id, b.title, b.content, b.summary, b.date, GROUP_CONCAT(tags.name) AS tags FROM blogs b LEFT JOIN blog_tag ON b.id = blog_tag.blog_id LEFT JOIN tags ON blog_tag.tag_id = tags.id WHERE b.id = ?', [id]);
        const blogs = rows as DBBlogPostWithTags[];
        if (!blogs || blogs.length === 0) return null;
        const blog = {
            id: blogs[0].id,
            title: blogs[0].title,
            content: blogs[0].content,
            summary: blogs[0].summary,
            date: blogs[0].date,
            tags: blogs[0].tags ? blogs[0].tags.split(',') : []
        }
        return blog;
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

    async getAllTags(): Promise<string[]> {
        const [rows] = await pool.query('SELECT name FROM tags');
        return (rows as { name: string }[]).map(row => row.name);
    }
}