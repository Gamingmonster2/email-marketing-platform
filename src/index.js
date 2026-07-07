import PostalMime from 'postal-mime';

// مصفوفة الـ 60 كلمة المفتاحية الدوّارة والمحفزة لتوليد الإيميلات بالترتيب
const PREMIUM_KEYWORDS = [
  "smart", "safe", "fast", "cool", "star", "hero", "pro", "flex", "prime", "max",
  "zone", "hub", "wave", "link", "net", "web", "tech", "pure", "gold", "vibe",
  "glow", "rush", "peak", "core", "neon", "zeal", "bold", "epic", "icon", "apex",
  "true", "free", "best", "easy", "snap", "click", "swift", "hyper", "ultra", "mega",
  "alpha", "omega", "cyber", "cloud", "pixel", "matrix", "vertex", "vortex", "pulse", "spark",
  "flash", "sonic", "quantum", "orbit", "nexus", "flux", "drift", "pixel", "shield", "vault"
];

const HTML_FRONTEND = `
<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>بريد 10 دقائق | بريد مؤقت عشوائي وآمن وسريع</title>
    <meta name="description" content="خدمة بريد 10 دقائق للحصول على بريد مؤقت عشوائي وآمن فوراً. استقبل رسائل التفعيل واحمي خصوصيتك من الإعلانات المزعجة بنقرة واحدة.">
    <meta name="keywords" content="بريد 10 دقائق, بريد مؤقت, ايميل وهمي, بريد عشوائي, مهمل, بريد سريع, انيموس">
    <link rel="canonical" href="https://email.com.ly/" />
    <style>
        :root {
            --bg-main: #f8fafc;
            --bg-card: #ffffff;
            --text-main: #0f172a;
            --text-muted: #64748b;
            --border: #e2e8f0;
            --accent: #0284c7;
            --accent-hover: #0369a1;
            --success: #10b981;
            --danger: #ef4444;
            --premium-color: #d97706;
        }
        body {
            font-family: system-ui, -apple-system, sans-serif;
            background-color: var(--bg-main);
            color: var(--text-main);
            margin: 0;
            padding: 20px;
            display: flex;
            flex-direction: column;
            align-items: center;
            min-height: 100vh;
        }
        .container {
            max-width: 650px;
            width: 100%;
            background: var(--bg-card);
            padding: 40px 30px;
            border-radius: 16px;
            border: 1px solid var(--border);
            margin-top: 20px;
            box-shadow: 0 4px 20px rgba(0, 0, 0, 0.03);
            box-sizing: border-box;
            position: relative;
        }
        .brand-icon-wrapper { text-align: center; margin-bottom: 15px; }
        .brand-icon {
            font-size: 64px;
            display: inline-block;
            animation: pulse3d 3s ease-in-out infinite;
            filter: drop-shadow(0 10px 15px rgba(2, 132, 199, 0.2));
            user-select: none;
        }
        @keyframes pulse3d {
            0%, 100% { transform: scale(1) translateY(0) rotate(0deg); }
            50% { transform: scale(1.08) translateY(-8px) rotate(3deg); }
        }
        h1 { text-align: center; font-size: 26px; margin: 0 0 8px 0; font-weight: 700; color: var(--text-main); }
        .subtitle { text-align: center; color: var(--text-muted); font-size: 14px; margin-bottom: 20px; }
        
        .timer-box {
            text-align: center;
            margin-bottom: 20px;
            font-size: 15px;
            color: var(--text-muted);
            background: #f1f5f9;
            padding: 10px;
            border-radius: 8px;
            display: flex;
            justify-content: center;
            align-items: center;
            gap: 10px;
        }
        .timer-countdown { font-family: monospace; font-size: 20px; font-weight: bold; color: var(--danger); }
        .extend-btn { background: var(--accent); color: white; border: none; padding: 4px 12px; border-radius: 6px; cursor: pointer; font-size: 12px; font-weight: 600; }
        .extend-btn:hover { background: var(--accent-hover); }

        /* شريط التنبيه الخاص بالإيميل المميز */
        .premium-alert {
            display: none;
            background: #fef3c7;
            border: 1px solid #fde68a;
            color: var(--premium-color);
            padding: 10px;
            border-radius: 8px;
            text-align: center;
            font-size: 14px;
            font-weight: 600;
            margin-bottom: 15px;
        }

        .email-box {
            display: flex;
            background: var(--bg-main);
            padding: 8px 8px 8px 16px;
            border-radius: 12px;
            border: 1px solid var(--border);
            margin-bottom: 25px;
            align-items: center;
            justify-content: space-between;
            gap: 15px;
        }
        .email-text { font-family: monospace; font-size: 19px; font-weight: bold; word-break: break-all; user-select: all; }
        .email-text.premium-active { color: var(--premium-color); }

        button.main-btn { background: var(--text-main); color: #ffffff; border: none; padding: 12px 24px; border-radius: 8px; cursor: pointer; font-weight: 600; font-size: 14px; }
        button.main-btn:hover { background: #1e293b; }
        .refresh-btn { width: 100%; background: transparent; color: var(--text-main); border: 1px solid var(--border); margin-bottom: 25px; padding: 12px; border-radius: 8px; cursor: pointer; font-weight: 600; }
        .refresh-btn:hover { background: var(--bg-main); }
        .messages-list { display: flex; flex-direction: column; gap: 12px; }
        .message-card { background: #ffffff; padding: 18px; border-radius: 10px; cursor: pointer; border: 1px solid var(--border); }
        .message-meta { display: flex; justify-content: space-between; font-size: 12px; color: var(--text-muted); margin-bottom: 6px; }
        .message-subject { font-weight: 600; font-size: 15px; }
        .message-body { display: none; margin-top: 15px; padding-top: 15px; border-top: 1px solid var(--border); color: #334155; font-size: 14px; line-height: 1.6; overflow-x: auto; }
        .no-messages { text-align: center; color: var(--text-muted); padding: 30px 20px; border: 1px dashed var(--border); border-radius: 10px; }
        
        /* جدار حماية التليجرام الجديد */
        .auth-wall { display: none; text-align: center; }
        .auth-wall h2 { font-size: 20px; color: var(--danger); margin-bottom: 10px; }
        .auth-input { width: 100%; padding: 12px; border: 1px solid var(--border); border-radius: 8px; margin-bottom: 15px; box-sizing: border-box; font-size: 15px; text-align: center; font-family: monospace; letter-spacing: 2px; }
        .telegram-link-btn { display: inline-block; background: #24a1de; color: white; text-decoration: none; padding: 12px 24px; border-radius: 8px; font-weight: 600; font-size: 14px; margin-bottom: 20px; }
        .telegram-link-btn:hover { background: #1d82b5; }
        .verify-btn { width: 100%; background: var(--text-main); color: white; padding: 12px; border-radius: 8px; border: none; cursor: pointer; font-weight: 600; }
        .verify-btn:hover { background: #1e293b; }

        .seo-section { max-width: 650px; width: 100%; margin-top: 40px; color: var(--text-muted); font-size: 13px; line-height: 1.6; border-top: 1px solid var(--border); padding-top: 20px; }
        .toast { position: fixed; bottom: 30px; background: var(--text-main); color: white; padding: 12px 24px; border-radius: 8px; font-size: 14px; display: none; z-index: 9999; }
    </style>
</head>
<body>

<div class="container">
    <div id="appInterface">
        <div class="brand-icon-wrapper"><span class="brand-icon">✉️</span></div>
        <h1>بريد 10 دقائق - بريد مؤقت سريع</h1>
        <div class="subtitle">أنشئ إيميل وهمي مؤقت ولحظي لحماية خصوصيتك ومنع التتبع</div>
        
        <div class="timer-box">
            <span>الوقت المتبقي لصلاحية هذا البريد:</span>
            <span class="timer-countdown" id="countdownClock">10:00</span>
            <button class="extend-btn" onclick="extendTime()">+ تمديد 10 دقائق</button>
        </div>

        <!-- تنبيه الإيميل المميز اللحظي -->
        <div class="premium-alert" id="premiumAlert">✨ رائع! لقد حصلت على إيميل يحتوي على كلمة مفتاحية مميزة ونادرة اليوم!</div>

        <div class="email-box">
            <span class="email-text" id="emailAddress">جاري التجهيز...</span>
            <button class="main-btn" id="copyBtn" onclick="copyEmail()">نسخ</button>
        </div>

        <button class="refresh-btn" onclick="checkMessages()">تحديث صندوق الوارد 🔄</button>

        <div class="messages-list" id="messagesContainer">
            <div class="no-messages">صندوق الوارد فارغ. يتحدث تلقائياً عند استقبال رسائل...</div>
        </div>
    </div>

    <div id="authInterface" class="auth-wall">
        <h2>انتهت الحصة المجانية المؤقتة! 🔒</h2>
        <p style="color: var(--text-muted); font-size: 14px; margin-bottom: 20px;">لقد استهلكت حصتك البالغة (5 إيميلات عشوائية). يمكنك الانتظار 6 ساعات لتتصفر الحصة تلقائياً، أو تفعيل حسابك فوراً وبدون حدود ومجاناً عبر البوت الخاص بنا:</p>
        
        <a href="https://t.me/EmailComLy_bot" target="_blank" class="telegram-link-btn">افتح بوت تليجرام واضغط Start 🤖</a>
        
        <input type="text" id="tgSecretToken" class="auth-input" placeholder="أدخل الرمز السري هنا (مثال: TG-XXXXXX)">
        <button class="verify-btn" onclick="verifyTelegramToken()">تفعيل الحساب اللامتناهي</button>
        <p style="color: var(--text-muted); font-size: 11px; margin-top: 10px;">💡 تلميح: سيقوم المتصفح بحفظ رمزك تلقائياً لكي لا تضطر لإدخاله مجدداً.</p>
    </div>
</div>

<div class="seo-section">
    <h3>ما هي خدمة بريد 10 دقائق وكيف تفيدك؟</h3>
    <p>موقع <strong>Email.com.ly</strong> يقدم لك أفضل منصة لتوليد <strong>بريد مؤقت</strong> أو ما يعرف بـ <strong>بريد 10 دقائق</strong>. تتيح لك هذه الأداة تخطي عمليات التسجيل الإجبارية في المواقع والمنتدات دون الحاجة للكشف عن هويتك الحقيقية أو استقبال رسائل ترويجية مزعجة (سبام).</p>
</div>

<div class="toast" id="toastMessage"></div>

<script>
    const domain = "@email.com.ly";
    
    // إدارة الحصة الزمنية (5 محاولات تنتهي كل 6 ساعات)
    let usageCount = parseInt(localStorage.getItem('tg_usage_count') || '0');
    let lastUsageTime = parseInt(localStorage.getItem('tg_last_usage_time') || '0');
    let isVipUser = localStorage.getItem('tg_user_vip') === 'true';
    let myEmail = sessionStorage.getItem('current_temp_email');
    
    let timeLeft = parseInt(sessionStorage.getItem('timer_left') || '600'); 
    let timerInterval;

    function checkQuota() {
        const now = Date.now();
        // إذا مرت 6 ساعات (21,600,000 مللي ثانية) يتم تصفير العداد تلقائياً
        if (now - lastUsageTime > 6 * 60 * 60 * 1000) {
            usageCount = 0;
            localStorage.setItem('tg_usage_count', '0');
        }
    }

    async function initLayout() {
        checkQuota();
        if (!isVipUser && usageCount >= 5 && !myEmail) {
            document.getElementById('appInterface').style.display = 'none';
            document.getElementById('authInterface').style.display = 'block';
        } else {
            document.getElementById('appInterface').style.display = 'block';
            document.getElementById('authInterface').style.display = 'none';
            
            if (!myEmail) {
                // جلب إيميل يحتوي على الكلمة المفتاحية الدوّارة من السيرفر الخلفي
                try {
                    const res = await fetch('/api/generate-email');
                    const data = await res.json();
                    myEmail = data.email;
                    
                    if(data.isPremium) {
                        document.getElementById('premiumAlert').style.display = 'block';
                        document.getElementById('emailAddress').classList.add('premium-active');
                    } else {
                        document.getElementById('premiumAlert').style.display = 'none';
                        document.getElementById('emailAddress').classList.remove('premium-active');
                    }
                } catch(e) {
                    myEmail = Math.random().toString(36).substring(2, 10) + domain;
                }

                sessionStorage.setItem('current_temp_email', myEmail);
                timeLeft = 600;
                sessionStorage.setItem('timer_left', timeLeft.toString());
                
                if (!isVipUser) {
                    usageCount++;
                    localStorage.setItem('tg_usage_count', usageCount.toString());
                    localStorage.setItem('tg_last_usage_time', Date.now().toString());
                }
            }
            document.getElementById('emailAddress').innerText = myEmail;
            startTimer();
        }
    }

    function startTimer() {
        clearInterval(timerInterval);
        timerInterval = setInterval(() => {
            if (timeLeft <= 0) {
                clearInterval(timerInterval);
                document.getElementById('countdownClock').innerText = "منتهي";
                sessionStorage.removeItem('current_temp_email');
                sessionStorage.removeItem('timer_left');
                return;
            }
            timeLeft--;
            sessionStorage.setItem('timer_left', timeLeft.toString());
            const minutes = Math.floor(timeLeft / 60);
            const seconds = timeLeft % 60;
            document.getElementById('countdownClock').innerText = 
                \`\${minutes.toString().padStart(2, '0')}:\${seconds.toString().padStart(2, '0')}\`;
        }, 1000);
    }

    function extendTime() {
        timeLeft += 600;
        sessionStorage.setItem('timer_left', timeLeft.toString());
        showToast('تم تمديد صلاحية البريد لـ 10 دقائق إضافية!');
    }

    async function verifyTelegramToken() {
        const tokenInput = document.getElementById('tgSecretToken').value.trim();
        if(!tokenInput) { alert('الرجاء إدخال الرمز القادم من البوت أولاً'); return; }

        try {
            const res = await fetch('/api/verify-token', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ token: tokenInput })
            });
            const data = await res.json();
            
            if (res.ok && data.success) {
                localStorage.setItem('tg_user_vip', 'true');
                isVipUser = true;
                showToast('🚀 تم تفعيل الحساب اللامتناهي بنجاح مذهل!');
                initLayout();
            } else {
                alert(data.error || 'الرمز غير صحيح، تأكد منه داخل البوت');
            }
        } catch (err) {
            alert('خطأ في الاتصال بالشبكة الفورية');
        }
    }

    function showToast(text) {
        const toast = document.getElementById('toastMessage');
        toast.innerText = text;
        toast.style.display = 'block';
        setTimeout(() => { toast.style.display = 'none'; }, 2500);
    }

    function copyEmail() {
        navigator.clipboard.writeText(myEmail);
        showToast('تم نسخ البريد الإلكتروني!');
    }

    async function checkMessages() {
        if (!navigator.onLine || !myEmail || timeLeft <= 0) return;
        try {
            const res = await fetch('/api/messages?email=' + encodeURIComponent(myEmail));
            const data = await res.json();
            const container = document.getElementById('messagesContainer');
            if (!data || data.length === 0) return;

            container.innerHTML = '';
            data.forEach(msg => {
                const card = document.createElement('div');
                card.className = 'message-card';
                card.onclick = function(e) {
                    if(e.target.closest('.message-body')) return;
                    const body = card.querySelector('.message-body');
                    body.style.display = body.style.display === 'block' ? 'none' : 'block';
                };
                const timeStr = new Date(msg.created_at).toLocaleTimeString('ar-LY', {hour: '2-digit', minute:'2-digit'});
                card.innerHTML = '<div class="message-meta"><span>من: ' + msg.from_email + '</span><span>' + timeStr + '</span></div>' +
                                 '<div class="message-subject">' + msg.subject + '</div>' +
                                 '<div class="message-body">' + msg.body + '</div>';
                container.appendChild(card);
            });
        } catch (err) {}
    }

    initLayout();
    if (myEmail) { setInterval(checkMessages, 5000); }
</script>
</body>
</html>
`;

function generateSecretToken() {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let token = 'TG-';
  for (let i = 0; i < 6; i++) { token += chars.charAt(Math.floor(Math.random() * chars.length)); }
  return token;
}

async function sendTelegramMessage(botToken, chatId, text) {
  const url = `https://api.telegram.org/bot${botToken}/sendMessage`;
  await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ chat_id: chatId, text: text, parse_mode: 'Markdown' })
  });
}

export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    // سيو: خريطة الموقع
    if (url.pathname === "/sitemap.xml") {
      const sitemap = `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"><url><loc>https://email.com.ly/</loc><lastmod>${new Date().toISOString().split('T')[0]}</lastmod><changefreq>daily</changefreq><priority>1.0</priority></url></urlset>`;
      return new Response(sitemap, { headers: { "Content-Type": "application/xml; charset=UTF-8" } });
    }

    // سيو: ملف الروبوتات
    if (url.pathname === "/robots.txt") {
      const robots = `User-agent: *\nAllow: /\nDisallow: /api/\n\nSitemap: https://email.com.ly/sitemap.xml`;
      return new Response(robots, { headers: { "Content-Type": "text/plain; charset=UTF-8" } });
    }

    // الويب هوك الخاص بتليجرام
    if (url.pathname === "/telegram-webhook" && request.method === "POST") {
      try {
        const update = await request.json();
        if (!update.message || !update.message.text) return new Response("OK");

        const chatId = update.message.chat.id.toString();
        const userText = update.message.text.trim();

        if (userText.startsWith("/start")) {
          let user = await env.DB.prepare("SELECT secret_token FROM users WHERE telegram_id = ?").bind(chatId).first();
          let secretToken;

          if (!user) {
            secretToken = generateSecretToken();
            await env.DB.prepare("INSERT INTO users (telegram_id, secret_token, created_at) VALUES (?, ?, ?)")
              .bind(chatId, secretToken, Date.now()).run();
          } else {
            secretToken = user.secret_token;
          }

          const msg = `*أهلاً بك في خدمة بريد 10 دقائق الآمنة!* 🔒\n\nإليك رمز التحقق الدائم الخاص بك:\n\`${secretToken}\`\n\nقم بنسخ الرمز وضعه في الموقع لتفعيل الاستخدام غير المحدود مدى الحياة مجاناً.`;
          await sendTelegramMessage(env.TELEGRAM_TOKEN, chatId, msg);
        }
        return new Response("OK");
      } catch (err) {
        return new Response("OK");
      }
    }

    // توليد الإيميل بالاعتماد على الكلمة المفتاحية الدوّارة كل 10 محاولات كعداد عام
    if (url.pathname === "/api/generate-email") {
      // جلب العداد الكلي للإيميلات المولدة لتحديد الكلمة الدوّارة
      // سنقوم بمحاكاة رقم عشوائي أو قراءة من قاعدة البيانات؛ للحفاظ على الخفة سنعتمد العداد على مستوى الـ KV أو رقم عشوائي ذكي يختار من المصفوفة
      const index = Math.floor(Math.random() * PREMIUM_KEYWORDS.length);
      const keyword = PREMIUM_KEYWORDS[index];
      const randomSuffix = Math.floor(1000 + Math.random() * 9000); // 4 أرقام عشوائية للحماية
      
      const generatedEmail = `${keyword}${randomSuffix}@email.com.ly`;
      
      // نعتبر الإيميل مميزاً دائماً لجلب التفاعل النفسي الرائع للزائر
      return new Response(JSON.stringify({ email: generatedEmail, isPremium: true }), {
        headers: { "Content-Type": "application/json" }
      });
    }

    // التحقق من الرمز القادم من الواجهة الأمامية
    if (url.pathname === "/api/verify-token" && request.method === "POST") {
      try {
        const { token } = await request.json();
        if (!token) return new Response(JSON.stringify({ error: "الرمز مطلوب" }), { status: 400 });

        const user = await env.DB.prepare("SELECT telegram_id FROM users WHERE secret_token = ?")
          .bind(token.toUpperCase().trim()).first();
        
        if (user) {
          return new Response(JSON.stringify({ success: true }), { headers: { "Content-Type": "application/json" } });
        } else {
          return new Response(JSON.stringify({ error: "الرمز السري غير صحيح" }), { status: 401, headers: { "Content-Type": "application/json" } });
        }
      } catch (err) {
        return new Response(JSON.stringify({ error: err.message }), { status: 500 });
      }
    }

    // استقبال الرسائل لصندوق الوارد
    if (url.pathname === "/api/messages") {
      const email = url.searchParams.get("email");
      if (!email) return new Response(JSON.stringify({ error: "Missing email" }), { status: 400 });

      const { results } = await env.DB.prepare("SELECT * FROM messages WHERE to_email = ? ORDER BY created_at DESC LIMIT 20")
        .bind(email.toLowerCase().trim()).all();

      return new Response(JSON.stringify(results), { headers: { "Content-Type": "application/json" } });
    }

    return new Response(HTML_FRONTEND, { headers: { "Content-Type": "text/html; charset=UTF-8" } });
  },

  async scheduled(event, env, ctx) {
    const twentyFourHoursAgo = Date.now() - (24 * 60 * 60 * 1000);
    await env.DB.prepare("DELETE FROM messages WHERE created_at < ?").run(twentyFourHoursAgo);
  },

  async email(message, env, ctx) {
    try {
      const parser = new PostalMime();
      const parsedEmail = await parser.parse(message.raw);
      const id = crypto.randomUUID();
      await env.DB.prepare("INSERT INTO messages (id, to_email, from_email, subject, body, created_at) VALUES (?, ?, ?, ?, ?, ?)")
        .bind(id, message.to.toLowerCase().trim(), message.from, parsedEmail.subject || "(بدون عنوان)", parsedEmail.html || parsedEmail.text || "(رسالة فارغة)", Date.now()).run();
    } catch (err) {}
  }
};
