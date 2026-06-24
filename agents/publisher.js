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

        const randomAuthorIndex = Math.floor(Math.random() * authorsPool.length);
        const selectedAuthor = authorsPool[randomAuthorIndex];

        console.log(`🚀 الموضوع المختار: ${selectedKeyword}`);
        console.log(`✍️ الكاتب الحالي: ${selectedAuthor.name}`);

        fs.writeFileSync('last_author.txt', selectedAuthor.name);

        // 1. استخراج الكلمات المفتاحية لصورة Pexels
        const keywordResponse = await groq.chat.completions.create({
            messages: [
                {
                    role: 'system',
                    content: 'You are an SEO expert. Read the Arabic email marketing topic and output exactly one or two English keywords suitable for finding a professional business/tech photo on Pexels. Output only the keywords, no explanation, no quotes.'
                },
                { role: 'user', content: selectedKeyword }
            ],
            model: MODEL_FAST,
        });

        const extractedKeyword = keywordResponse.choices[0]?.message?.content?.trim() || 'newsletter';
        const imageUrl = await getDynamicImage(extractedKeyword);

        // ==========================================
        // 🧠 إدارة طبقة الذاكرة المحلية (Knowledge Layer)
        // ==========================================
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

        // تحضير سياق الروابط القديمة لإرسالها للـ Editor
        const pastArticlesContext = pastArticles.length > 0
            ? pastArticles.map(art => `- المقال القديم: "${art.title}" -> رابط توجيهه: (/blog/${art.slug})`).join('\n')
            : "لا توجد مقالات سابقة في الموقع (هذا هو المقال الأول).";

        // ==========================================
        // 🟢 المرحلة 1: WRITER AGENT (توليد المسودة الخام)
        // ==========================================
        console.log(`⏳ [1/3] جاري توليد المسودة الخام بواسطة الكاتب اللغوي...`);
        const writerResponse = await groq.chat.completions.create({
            model: MODEL_WRITER,
            messages: [
                {
                    role: 'system',
                    content: `أنت كاتب مسودات متقن وأكاديمي. اكتب مقالاً عربياً مفصلاً، ضخماً وغزيراً بالمعلومات حول الكلمة المفتاحية المحددة لتغطية كافة أبعادها الفنية. لا تهتم في هذه المرحلة بجمال الصياغة أو التكرار، ركز فقط على المحتوى الخام المكثف.`
                },
                { role: 'user', content: `اكتب مسودة كاملة وموسعة عن: ${selectedKeyword}` }
            ],
            temperature: 0.7
        });
        const rawDraft = writerResponse.choices[0]?.message?.content || '';

        // ==========================================
        // 🟡 المرحلة 2: REVIEWER AGENT (فحص الجودة الصارم والـ SEO)
        // ==========================================
        console.log(`⏳ [2/3] جاري فحص الجودة واستخراج العيوب والتلوث اللاتيني...`);
        const reviewerResponse = await groq.chat.completions.create({
            model: MODEL_WRITER,
            messages: [
                {
                    role: 'system',
                    content: `أنت مدقق لغوي ومفتش سيو (SEO) صارم وعنيف. اقرأ المسودة الخام واستخرج "تقرير أخطاء ونقاط ضعف" فقط دون إعادة كتابة النص.
ركز تماماً على:
1. رصد الكلمات اللاتينية المهشمة والغريبة (مثل roroke, sones, lwrop) وتنبيه المحرر لحذفها أو تعريبها فوراً.
2. تحديد الجمل الركيكة، التكرار الممل، وضعف تدفق الأفكار.
3. التأكد من ملاءمة السرد لأصحاب الشركات والريادة.`
                },
                { role: 'user', content: `إليك المسودة الخام لفحصها وتفنيد عيوبها:\n\n${rawDraft}` }
            ],
            temperature: 0.1 // منطق بارد وجاف لمنع الهلوسة
        });
        const critiqueReport = reviewerResponse.choices[0]?.message?.content || '';

        // ==========================================
        // 🔵 المرحلة 3: MASTER EDITOR (إعادة الصياغة الشاملة + الحقن الداخلي للروابط)
        // ==========================================
        console.log(`⏳ [3/3] رئيس التحرير يدمج الروابط القديمة ويعيد صياغة المقال النهائي...`);
        const slug = `article-${Date.now()}`;
        const dateStr = new Date().toISOString().split('T')[0];

        const editorResponse = await groq.chat.completions.create({
            model: MODEL_WRITER,
            messages: [
                {
                    role: 'system',
                    content: `أنت رئيس تحرير تنفيذي ومحترف سيو عالمي واسمك هو (${selectedAuthor.name}).
مهمتك الكبرى هي دمج (المسودة الخام) مع (تقرير المراجع) لصياغة مقال عبقري، بليغ، وبلغة عربية فصحى ساحرة.

⚠️ شروط الربط الداخلي الصارمة (Internal Linking):
أنت تملك ذاكرة بالمقالات المنشورة سابقاً في الموقع وهي كالتالي:
${pastArticlesContext}

إذا وجدت بينها مقالات ترتبط سياقياً بفقرات المقال الحالي، يجب عليك زراعة روابطها بذكاء وانسيابية كاملة داخل النص بصيغة ماركداون: [اسم المقال القديم سياقياً](/blog/slug-المقال). 
إذا لم تجد فرصة لربطها في ثنايا الفقرات، أضف قسماً فرعياً في نهاية المقال تحت عنوان "مقالات ذات صلة" وضع روابطها هناك، لضمان ترابط الموقع بالكامل وعناكب جوجل.

⚠️ شروط التنسيق النهائي:
1. خلو تام ومطلق من أي كلمات إنجليزية مهشمة مدمجة في الكلمات العربية.
2. استخدام تنسيقات Markdown احترافية (عناوين H2 و H3، قوائم، نقاط).
3. اختم المقال بعبارة ترحيبية قصيرة تمثلك بصفتك الكاتب الحالي (${selectedAuthor.name}).`
                },
                {
                    role: 'user',
                    content: `أنتج المقال النهائي لـ: "${selectedKeyword}".\n\nالمسودة الخام:\n${rawDraft}\n\nتقرير العيوب الواجب تدميرها:\n${critiqueReport}`
                }
            ],
            temperature: 0.3
        });

        const finalArticleContent = editorResponse.choices[0]?.message?.content || '';

        // ==========================================
        // 💾 حفظ المقال النهائي وتحديث الذاكرة
        // ==========================================
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
        console.log(`✅ [نجاح] تم توليد المقال المصقول وحفظه بنجاح بقلم: ${selectedAuthor.name}`);

        // تحديث الذاكرة المحلية (Knowledge Layer) بالمقال الجديد لتقرأه المقالات القادمة
        pastArticles.push({
            title: selectedKeyword,
            slug: slug,
            date: dateStr
        });
        fs.writeFileSync(knowledgePath, JSON.stringify(pastArticles, null, 2), 'utf8');
        console.log(`💾 تم تحديث ملف الذاكرة المحلية knowledge.json بنجاح.`);

    } catch (error) {
        console.error('❌ خطأ كارثي أثناء تشغيل المحرك الثلاثي للوكلاء:', error);
    }
}

generateArticle();
