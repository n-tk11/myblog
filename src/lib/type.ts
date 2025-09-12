export type BlogPost = {
    id: number | null;
    title: string;
    content: string;
    summary: string;
    date: Date;
}

export type BlogPostWithTags = BlogPost & { tags: string[] | null };