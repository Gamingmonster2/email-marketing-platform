import { defineCollection, z } from 'astro:content';

const blogCollection = defineCollection({
    schema: z.object({
        title: z.string(),
        date: z.string(),
        image: z.string().optional(),
        author: z.string().optional(),
        authorImage: z.string().optional(),
    }),
});

export const collections = {
    'blog': blogCollection,
};
