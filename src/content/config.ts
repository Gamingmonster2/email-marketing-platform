import { z, defineCollection } from 'astro:content';

// تعريف هيكلية بيانات المدونة (Schema) ليفهمها محرك Astro
const blogCollection = defineCollection({
    type: 'content',
    schema: z.object({
        title: z.string(),
        date: z.string(),
        image: z.string().optional(),
    }),
});

// تصدير المجموعة تحت اسم 'blog'
export const collections = {
    'blog': blogCollection,
};
