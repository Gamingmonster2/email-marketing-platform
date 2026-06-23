import { Groq } from 'groq-sdk';
import * as fs from 'fs';
import * as path from 'path';
import 'dotenv/config';

// تهيئة عميل Groq باستخدام المفتاح السري الممرر من البيئة
const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

// النماذج المستخرجة من حسابك الخاص
const MODEL_WRITER = 'llama-3.3-70b-versatile'; // النموذج القوي للكتابة الاحترافية بالسيو
const MODEL_FAST = 'llama-3.1-8b-instant';     // النموذج السريع للمهام الإضافية

// 10 كلمات ومواضيع مفتاحية استراتيجية يبدأ بها المحرك العمل تلقائياً
const keywordsPool = [
    "استراتيجيات زيادة معدل فتح الرسائل البريدية (Open Rate)",
    "كيفية بناء قائمة بريدية (Email List) متفاعلة من الصفر",
    "أفضل أدوات التسويق عبر البريد الإلكتروني للمشاريع الناشئة",
    "تجنب مجلد السبام (Spam): كيف تضمن وصول رسائلك للبريد الوارد",
    "كتابة عنوان بريد إلكتروني جاذب يضمن نقر المشتركين",
    "أتمتة البريد الإلكتروني (Email Automation) لزيادة المبيعات تلقائياً",
    "الفرق بين التسويق عبر البريد الإلكتروني والتسويق عبر الواتساب",
    "كيفية صياغة نشرة بريدية (Newsletter) احترافية ومربحة",
    "أفضل طرق قياس وتحليل نتائج الحملات البريدية (Analytics)",
    "كتابة نصوص رسائل بريدية تقنع العميل بالشراء الفوري"
];

async function generateArticle() {
    try {
        // اختيار كلمة مفتاحية عشوائياً من المسبح التلقائي
        const randomIndex = Math.floor(Math.random() * keywordsPool.length);
        const selectedKeyword = keywordsPool[randomIndex];

        console.log(`🚀 الموضوع المختار لليوم: ${selectedKeyword}`);

        // استدعاء نموذج الـ 70B القوي المتاح في حسابك لصياغة المقال
        const response = await groq.chat.completions.create({
            messages: [
                {
                    role: 'system',
                    content: 'أنت خبير سيو (SEO) محترف وكاتب محتوى تسويقي متخصص في البريد الإلكتروني. اكتب مقالاً غنياً وعملياً باللغة العربية ومقسماً بعناوين فرعية جذابة ونقاط واضحة تلائم أصحاب الشركات والمطورين.'
                },
                {
                    role: 'user',
                    content: `اكتب مقالاً كاملاً ومفصلاً ومحسناً لمحركات البحث بناءً على هذا العنوان: ${selectedKeyword}`
                }
            ],
            model: MODEL_WRITER,
        });

        const articleContent = response.choices[0]?.message?.content || '';
        
        // توليد اسم الرابط (Slug) بناءً على الوقت الحالي لمنع التداخل
        const slug = `article-${Date.now()}`;
        const directoryPath = path.join(process.cwd(), 'src/content/blog');
        
        if (!fs.existsSync(directoryPath)){
            fs.mkdirSync(directoryPath, { recursive: true });
        }

        const dateStr = new Date().toISOString().split('T')[0];

        // قالب Markdown النهائي الجاهز للبناء في Astro
        const fileData = `---
title: "${selectedKeyword}"
date: "${dateStr}"
image: "https://images.pexels.com/photos/1591056/pexels-photo-1591056.jpeg"
---

${articleContent}`;

        fs.writeFileSync(path.join(directoryPath, `${slug}.md`), fileData);
        console.log(`✅ تم توليد المقال بنجاح وحفظه باستخدام النموذج الخاص بك: ${slug}.md`);

    } catch (error) {
        console.error('❌ خطأ أثناء توليد المقال:', error);
    }
}

generateArticle();
