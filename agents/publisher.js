import { Groq } from 'groq-sdk';
import * as fs from 'fs';
import * as path from 'path';
import 'dotenv/config';

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

const MODEL_WRITER = 'llama-3.3-70b-versatile'; 
const MODEL_FAST = 'llama-3.1-8b-instant';     

// دالة لالتقاط الأنفاس
const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

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

// تعديل: كاتب واحد فقط
const authorsPool = [
    { name: "أحمد بالخير", avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&h=150" }
];

async function getDynamicImage(keyword) {
    if (!process.env.PEXELS_API_KEY) {
        return "https://images.pexels.com/photos/1591056/pexels-photo-1591056.jpeg"; 
    }
    try {
        const searchQuery = `email marketing ${keyword}`;
        const response = await fetch(`https://api.pexels.com/v1/search?query=${encodeURIComponent(searchQuery)}&per_page=1`, {
            headers: { 'Authorization': process.env.PEXELS_API_KEY }
        });
        const data = await response.json();
        return data.photos[0]?.src?.large || "https://images.pexels.com/photos/1591056/pexels-photo-1591056.jpeg";
    } catch (error) {
        return "https://images.pexels.com/photos/1591056/pexels-photo-1591056.jpeg";
    }
}

async function generateArticle() {
    try {
        const randomIndex = Math.floor(Math.random() * keywordsPool.length);
        const selectedKeyword = keywordsPool[randomIndex];

        // اختيار الكاتب الوحيد في المصفوفة
        const selectedAuthor = authorsPool[0];

        console.log(`🚀 الموضوع المختار: ${selectedKeyword}`);
        console.log(`✍️ الكاتب الحالي: ${selectedAuthor.name}`);

        fs.writeFileSync('last_author.txt', selectedAuthor.name);

        // استخراج الكلمة المفتاحية للصورة
        const keywordResponse = await groq.chat.completions.create({
            messages: [
                {
                    role: 'system',
                    content: 'You are an SEO expert. Read the Arabic email marketing topic and output exactly one or two English keywords suitable for finding a professional business/tech photo on Pexels. Output only the keywords, no explanation.'
                },
                { role: 'user', content: selectedKeyword }
            ],
            model: MODEL_FAST,
        });

        const extractedKeyword = keywordResponse.choices[0]?.message?.content?.trim() || 'newsletter';
        const imageUrl = await getDynamicImage(extractedKeyword);

        await delay(2000);

        // إدارة الذاكرة المحلية للربط الداخلي
        const knowledgeDir = path.join(process.cwd(), 'src/content');
        const knowledgePath = path.join(knowledgeDir, 'knowledge.json');
        
        if (!fs.existsSync(knowledgeDir)) {
            fs.mkdirSync(knowledgeDir, { recursive: true });
        }

        let pastArticles = [];
        if (fs.existsSync(knowledgePath)) {
            try {
                pastArticles = JSON.parse(fs.readFileSync(knowledgePath, 'utf8'));
            } catch (e) {
                pastArticles = [];
            }
        }

        const pastArticlesContext = pastArticles.length > 0
            ? pastArticles.map(art => `- المقال القديم: "${art.title}" -> رابط توجيهه: (/blog/${art.slug})`).join('\n')
            : "لا توجد مقالات سابقة في الموقع.";

        // ==========================================
        // محرك الكتابة المباشر الصارم (SEO & Keyword Density)
        // ==========================================
        console.log(`⏳ جاري توليد المقال مباشرة مع تطبيق معايير SEO صارمة وكثافة كلمات عالية...`);
        const writerResponse = await groq.chat.completions.create({
            model: MODEL_WRITER,
            messages: [
                {
                    role: 'system',
                    content: `أنت خبير SEO عالمي وكاتب محتوى محترف. اسمك (${selectedAuthor.name}).
مهمتك كتابة مقال نهائي واحترافي باللغة العربية الفصحى مباشرة، بدون أي كلمات لاتينية مهشمة.

⚠️ تعليمات صارمة جداً:
1. زيادة كثافة الكلمة المفتاحية (Keyword Density): قم بتكرار الكلمة المفتاحية المستهدفة ومرادفاتها بكثافة عالية جداً عبر الفقرات، العناوين الفرعية، والخاتمة، على أن يبدو السياق طبيعياً واحترافياً.
2. التنسيق: استخدم تنسيقات Markdown باحترافية تامة (عناوين H2 و H3، قوائم نقطية).
3. الربط الداخلي (Internal Links): الذاكرة الحالية للمقالات السابقة هي:
${pastArticlesContext}
يجب عليك إلزامياً تضمين روابط المقالات السابقة سياقياً داخل النص باستخدام صيغة [اسم المقال](/blog/slug-المقال). إن تعذر دمجها سياقياً، أضف قسم "مقالات ذات صلة" في النهاية.
4. اختم المقال بعبارة ترحيبية وتوقيع يحمل اسمك (${selectedAuthor.name}).`
                },
                { role: 'user', content: `اكتب المقال حصرياً ومكثفاً حول هذه الكلمة المفتاحية: ${selectedKeyword}` }
            ],
            temperature: 0.5 // تقليل درجة الحرارة قليلاً للتركيز على الكلمات المفتاحية
        });

        const finalArticleContent = writerResponse.choices[0]?.message?.content || '';

        // الحفظ
        const slug = `article-${Date.now()}`;
        const dateStr = new Date().toISOString().split('T')[0];
        const directoryPath = path.join(process.cwd(), 'src/content/blog');
        
        if (!fs.existsSync(directoryPath)){
            fs.mkdirSync(directoryPath, { recursive: true });
        }

        const fileData = `---
title: "${selectedKeyword}"
date: "${dateStr}"
image: "${imageUrl}"
author: "${selectedAuthor.name}"
authorImage: "${selectedAuthor.avatar}"
---

${finalArticleContent}`;

        fs.writeFileSync(path.join(directoryPath, `${slug}.md`), fileData);
        console.log(`✅ [نجاح] تم توليد المقال المكثف وحفظه بنجاح بقلم: ${selectedAuthor.name}`);

        pastArticles.push({
            title: selectedKeyword,
            slug: slug,
            date: dateStr
        });
        fs.writeFileSync(knowledgePath, JSON.stringify(pastArticles, null, 2), 'utf8');
        console.log(`💾 تم تحديث الذاكرة المحلية بنجاح.`);

    } catch (error) {
        console.error('❌ خطأ أثناء تشغيل المحرك المباشر:', error.message || error);
    }
}

generateArticle();
