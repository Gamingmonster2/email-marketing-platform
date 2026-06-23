import { Groq } from 'groq-sdk';
import * as fs from 'fs';
import * as path from 'path';
import 'dotenv/config';

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

const MODEL_WRITER = 'llama-3.3-70b-versatile'; 
const MODEL_FAST = 'llama-3.1-8b-instant';     

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

// مسبح الكتاب الثلاثة المختارين مع صورهم الشخصية المصغرة الاحترافية
const authorsPool = [
    { name: "أحمد بالخير", avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&h=150" },
    { name: "اخليف المهدي", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&h=150" },
    { name: "سيف الأمير", avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&h=150" }
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

        // اختيار كاتب عشوائي من القائمة لتوزيع الأدوار وتغيير الهوية
        const randomAuthorIndex = Math.floor(Math.random() * authorsPool.length);
        const selectedAuthor = authorsPool[randomAuthorIndex];

        console.log(`🚀 الموضوع المختار: ${selectedKeyword}`);
        console.log(`✍️ الكاتب الحالي: ${selectedAuthor.name}`);

        // حفظ اسم الكاتب في ملف نصي مؤقت ليقرأه نظام الـ GitHub Workflow لاحقاً
        fs.writeFileSync('last_author.txt', selectedAuthor.name);

        const keywordResponse = await groq.chat.completions.create({
            messages: [
                {
                    role: 'system',
                    content: 'You are an SEO expert. Read the Arabic email marketing topic and output exactly one or two English keywords suitable for finding a professional business/tech photo on Pexels. Output only the keywords, no explanation, no quotes.'
                },
                {
                    role: 'user',
                    content: selectedKeyword
                }
            ],
            model: MODEL_FAST,
        });

        const extractedKeyword = keywordResponse.choices[0]?.message?.content?.trim() || 'newsletter';
        const imageUrl = await getDynamicImage(extractedKeyword);

        const response = await groq.chat.completions.create({
            messages: [
                {
                    role: 'system',
                    content: `أنت كاتب محتوى خبير ومحترف واسمك هو (${selectedAuthor.name}). اكتب مقالاً غنياً باللغة العربية ومقسماً بعناوين فرعية جذابة تلائم أصحاب الشركات، واختم المقال بعبارة ترحيبية قصيرة تعبر عن هويتك ككاتب.`
                },
                {
                    role: 'user',
                    content: `اكتب مقالاً كاملاً ومفصلاً ومحسناً لمحركات البحث بناءً على هذا العنوان: ${selectedKeyword}`
                }
            ],
            model: MODEL_WRITER,
        });

        const articleContent = response.choices[0]?.message?.content || '';
        const slug = `article-${Date.now()}`;
        const directoryPath = path.join(process.cwd(), 'src/content/blog');
        
        if (!fs.existsSync(directoryPath)){
            fs.mkdirSync(directoryPath, { recursive: true });
        }

        const dateStr = new Date().toISOString().split('T')[0];

        // حقن بيانات الكاتب وصورته داخل ترويسة المقال ليعرضها قالب الواجهة
        const fileData = `---
title: "${selectedKeyword}"
date: "${dateStr}"
image: "${imageUrl}"
author: "${selectedAuthor.name}"
authorImage: "${selectedAuthor.avatar}"
---

${articleContent}`;

        fs.writeFileSync(path.join(directoryPath, `${slug}.md`), fileData);
        console.log(`✅ تم توليد المقال وحفظه بنجاح بقلم: ${selectedAuthor.name}`);

    } catch (error) {
        console.error('❌ خطأ أثناء توليد المقال:', error);
    }
}

generateArticle();
