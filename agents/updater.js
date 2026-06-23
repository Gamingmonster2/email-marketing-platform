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

            // استخراج التاريخ والعنوان من المقال لقراءتهما
            const dateMatch = content.match(/date:\s*"(.*?)"/);
            const titleMatch = content.match(/title:\s*"(.*?)"/);

            if (dateMatch && titleMatch) {
                const articleDate = new Date(dateMatch[1]);
                const title = titleMatch[1];
                
                // حساب الفارق الزمني بالأيام
                const diffTime = Math.abs(today - articleDate);
                const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

                // التحقق إذا مر على المقال 20 يوماً أو أكثر
                if (diffDays >= 20) {
                    console.log(`🔄 المقال "${title}" مر عليه ${diffDays} يوماً. يتم تحديثه الآن...`);

                    // عزل نص المقال الأصلي لإرساله للتطوير
                    const parts = content.split('---');
                    const originalBody = parts.slice(2).join('---').trim();

                    const response = await groq.chat.completions.create({
                        messages: [
                            {
                                role: 'system',
                                content: 'أنت خبير سيو (SEO) محترف. قم بإعادة صياغة، وتحسين، وتوسيع المقال العربي التالي لإثرائه بفقرات ومعلومات جديدة ومحدثة بالكامل مع الحفاظ على نفس الرابط والعنوان الرئيسي.'
                            },
                            {
                                role: 'user',
                                content: originalBody
                            }
                        ],
                        model: MODEL_WRITER,
                    });

                    const updatedBody = response.choices[0]?.message?.content || originalBody;
                    const dateStr = today.toISOString().split('T')[0];

                    // إعادة بناء وحفظ المقال بنفس الاسم ولكن بتاريخ اليوم الجديد والنص المحدث
                    const updatedFileContent = `---
title: "${title}"
date: "${dateStr}"
image: "https://images.pexels.com/photos/1591056/pexels-photo-1591056.jpeg"
---

${updatedBody}`;

                    fs.writeFileSync(filePath, updatedFileContent);
                    console.log(`✅ تم التحديث وإعادة النشر بنجاح: ${file}`);
                }
            }
        }
    } catch (error) {
        console.error('❌ خطأ أثناء فحص وتحديث المقالات:', error);
    }
}

updateOldArticles();
