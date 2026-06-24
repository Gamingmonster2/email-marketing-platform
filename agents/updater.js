import { Groq } from 'groq-sdk';
import * as fs from 'fs';
import * as path from 'path';
import 'dotenv/config';

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });
const MODEL_WRITER = 'llama-3.3-70b-versatile';

async function updateOldArticles() {
    try {
        const directoryPath = path.join(process.cwd(), 'src/content/blog');
        if (!fs.existsSync(directoryPath)) return;

        const files = fs.readdirSync(directoryPath).filter(file => file.endsWith('.md'));
        const today = new Date();

        for (const file of files) {
            const filePath = path.join(directoryPath, file);
            let content = fs.readFileSync(filePath, 'utf-8');

            const titleMatch = content.match(/title:\s*"(.*?)"/);

            if (titleMatch) {
                const title = titleMatch[1];
                
                // الاعتماد على وقت تعديل الملف على الهاردوير لضبط دقائق الفحص بدقة
                const fileStats = fs.statSync(filePath);
                const diffTime = Math.abs(today - fileStats.mtime);
                const diffMinutes = Math.floor(diffTime / (1000 * 60));

                // التحقق إذا مر على إنشاء أو تعديل الملف 5 دقائق أو أكثر
                if (diffMinutes >= 5) {
                    console.log(`🔄 المقال "${title}" مر عليه ${diffMinutes} دقائق. يتم فحص التلوث اللغوي وتحديثه الآن...`);

                    const parts = content.split('---');
                    const originalBody = parts.slice(2).join('---').trim();

                    const response = await groq.chat.completions.create({
                        messages: [
                            {
                                role: 'system',
                                content: `أنت رئيس تحرير ومدقق لغوي صارم ومحترف SEO. قم بإعادة صياغة وتنقيح المقال العربي التالي وتوسيع معلوماته.
شروط التطهير الإلزامية:
1. احذف تماماً أي كلمات أو رموز لاتينية متداخلة مشوهة (مثل: roroke, sones, diem, lpwrop).
2. صحح الأخطاء الإملائية الفادحة في الكلمات التقنية (مثل: تعديل "مجلد السام" إلى "مجلد السبام").
3. حافظ على الهيكل العام، التنسيق النظيف لعناوين الماركداون، ونفس العنوان الرئيسي.`
                            },
                            {
                                role: 'user',
                                content: originalBody
                            }
                        ],
                        model: MODEL_WRITER,
                        temperature: 0.2 // درجة حرارة منخفضة لضمان الالتزام بالتصحيح ومنع الهلوسة
                    });

                    const updatedBody = response.choices[0]?.message?.content || originalBody;
                    const dateStr = today.toISOString().split('T')[0];

                    const updatedFileContent = `---
title: "${title}"
date: "${dateStr}"
image: "https://images.pexels.com/photos/1591056/pexels-photo-1591056.jpeg"
---

${updatedBody}`;

                    fs.writeFileSync(filePath, updatedFileContent);
                    console.log(`✅ تم التطهير والتحديث بنجاح للملف: ${file}`);
                }
            }
        }
    } catch (error) {
        console.error('❌ خطأ أثناء فحص وتحديث المقالات:', error);
    }
}

updateOldArticles();
