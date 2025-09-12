import MySQLBlogDatabase from "./mysql";
import type { BlogPost, BlogPostWithTags } from '../type';

export interface BlogDatabase {
    getAllBlogs(tag: string[]): Promise<BlogPostWithTags[]>;
    getBlogByid(id: number): Promise<BlogPostWithTags | null>;
    addBlogPost(post: BlogPost): Promise<void>;
    deleteBlogPost(id: number): Promise<void>;
    updateBlogPost(id: number, updatedPost: Partial<BlogPost>): Promise<void>;
    getAllTags(): Promise<string[]>;
}


export function createBlogDatabase(type: 'inmemory' | 'sqlite' | 'mysql'): BlogDatabase {
    switch(type) {
        // case 'inmemory': return new InmemoryBlogDatabase();
        // case 'sqlite': return new SQLiteBlogDatabase();
        case 'mysql': return new MySQLBlogDatabase();
        default: throw new Error('Unknown database type');
    }
}