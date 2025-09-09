
export interface BlogDatabase<T> {
    getAllBlogs(): Promise<T[]>;
    getBlogByid(id: number): Promise<T | null>;
    addBlogPost(post: T): Promise<void>;
    deleteBlogPost(id: number): Promise<void>;
    updateBlogPost(id: number, updatedPost: Partial<T>): Promise<void>;
}

