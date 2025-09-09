
type BlogPost = {
    id: number;
    title: string;
    content: string;
    summary: string;
    date: Date;
}

interface BlogDatabase {
    getAllBlogs(): Promise<BlogPost[]>;
    getBlogByid(id: number): Promise<BlogPost | null>;
    addBlogPost(post: BlogPost): Promise<void>;
    // deleteBlogPost(id: number): Promise<void>;
    // updateBlogPost(id: number, updatedPost: Partial<BlogPost>): Promise<void>;
}


class InmemoryBlogDatabase implements BlogDatabase {
    private blogs: BlogPost[] = [
        { id: 1, title: 'First Demo Post', content: 'This is the content of the first post.', summary: 'Summary of first post', date: new Date() },
        { id: 2, title: 'Second Demo Post', content: 'This is the content of the second post.', summary: 'Summary of second post', date: new Date() }
    ];

    async getAllBlogs(): Promise<BlogPost[]> {
        return this.blogs;
    }

    async getBlogByid(id: number): Promise<BlogPost | null> {
        return this.blogs.find(blog => blog.id === id) || null;
    }

    async addBlogPost(post: BlogPost): Promise<void> {
        this.blogs.push(post);
    }
}

class SQLiteBlogDatabase implements BlogDatabase {
    async getAllBlogs(): Promise<BlogPost[]> {
        // SQLite-specific implementation
        return [];
    }
    async getBlogByid(id: number): Promise<BlogPost | null> {
        // SQLite-specific implementation
        return null;
    }
    async addBlogPost(post: BlogPost): Promise<void> {
        // SQLite-specific implementation
    }
}

export function createBlogDatabase(type: 'inmemory' | 'sqlite' | 'mysql'): BlogDatabase {
    switch(type) {
        case 'inmemory': return new InmemoryBlogDatabase();
        case 'sqlite': return new SQLiteBlogDatabase();
        // case 'mysql': return new MySQLBlogDatabase();
        default: throw new Error('Unknown database type');
    }
}