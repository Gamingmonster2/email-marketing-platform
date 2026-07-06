import PostalMime from 'postal-mime';

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
        
        /* أيقونة الإيموجي ثلاثية الأبعاد المتحركة */
        .brand-icon-wrapper {
            text-align: center;
            margin-bottom: 15px;
        }
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
        .timer-countdown {
            font-family: monospace;
            font-size: 20px;
            font-weight: bold;
            color: var(--danger);
        }
        .extend-btn {
            background: var(--accent);
            color: white;
            border: none;
            padding: 4px 12px;
            border-radius: 6px;
            cursor: pointer;
            font-size: 12px;
            font-weight: 600;
        }
        .extend-btn:hover { background: var(--accent-hover); }

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
        button.main-btn {
            background: var(--text-main);
            color: #ffffff;
            border: none;
            padding: 12px 24px;
            border-radius: 8px;
            cursor: pointer;
            font-weight: 600;
            font-size: 14px;
        }
        button.main-btn:hover { background: #1e293b; }
        .refresh-btn { width: 100%; background: transparent; color: var(--text-main); border: 1px solid var(--border); margin-bottom: 25px; padding: 12px; border-radius: 8px; cursor: pointer; font-weight: 600; }
        .refresh-btn:hover { background: var(--bg-main); }
        .messages-list { display: flex; flex-direction: column; gap: 12px; }
        .message-card { background: #ffffff; padding: 18px; border-radius: 10px; cursor: pointer; border: 1px solid var(--border); }
        .message-meta { display: flex; justify-content: space-between; font-size: 12px; color: var(--text-muted); margin-bottom: 6px; }
        .message-subject { font-weight: 600; font-size: 15px; }
        .message-body { display: none; margin-top: 15px; padding-top: 15px; border-top: 1px solid var(--border); color: #334155; font-size: 14px; line-height: 1.6; overflow-x: auto; }
        .no-messages { text-align: center; color: var(--text-muted); padding: 30px 20px; border: 1px dashed var(--border); border-radius: 10px; }
        
        .auth-wall { display: none; text-align: center; }
        .auth-wall h2 { font-size: 20px; color: var(--danger); margin-bottom: 10px; }
        .auth-input { width: 100%; padding: 12px; border: 1px solid var(--border); border-radius: 8px; margin-bottom: 12px; box-sizing: border-box; font-size: 15px; }
        .auth-btn-group { display: flex; gap: 10px; margin-top: 10px; }
        .auth-btn-group button { flex: 1; padding: 12px; border-radius: 8px; border: none; cursor: pointer; font-weight: 600; }
        .btn-accent { background: var(--accent); color: white; }
        .btn-accent:hover { background: var(--accent-hover); }

        .seo-section { max-width: 650px; width: 100%; margin-top: 40px; color: var(--text-muted); font-size: 13px; line-height: 1.6; border-top: 1px solid var(--border); padding-top: 20px; }
        .toast { position: fixed; bottom: 30px; background: var(--text-main); color: white; padding: 12px 24px; border-radius: 8px; font-size: 14px; display: none; z-index: 9999; }
    </style>
</head>
<body>

<div class="container">
    <div id="appInterface">
        <!-- دمج الإيموجي ثلاثي الأبعاد المتفاعل نبضياً -->
        <div class="brand-icon-wrapper">
            <span class="brand-icon">✉️</span>
        </div>
        
        <h1>بريد 10 دقائق - بريد مؤقت سريع</h1>
        <div class="subtitle">أنشئ إيميل وهمي مؤقت ولحظي لحماية خصوصيتك ومنع التتبع</div>
        
        <div class="timer-box">
            <span>الوقت المتبقي لصلاحية هذا البريد:</span>
            <span class="timer-countdown" id="countdownClock">10:00</span>
            <button class="extend-btn" onclick="extendTime()">+ تمديد 10 دقائق</button>
        </div>

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
        <h2>انتهت صلاحية الاستخدام المجاني الحسابي!</h2>
        <p style="color: var(--text-muted); font-size: 14px; margin-bottom: 20px;">لقد قمت بتوليد 3 حسابات بريد مؤقتة. يرجى تسجيل الدخول أو إنشاء حساب للمتابعة غير المحدودة وبدون قيود.</p>
        <input type="email" id="authEmail" class="auth-input" placeholder="البريد الإلكتروني الحقيقي الخاص بك">
        <input type="password" id="authPassword" class="auth-input" placeholder="كلمة المرور">
        <div class="auth-btn-group">
            <button class="btn-accent" onclick="handleAuth('/api/login')">تسجيل الدخول</button>
            <button style="background:#475569; color: white;" onclick="handleAuth('/api/signup')">إنشاء حساب جديد</button>
        </div>
    </div>
</div>

<div class="seo-section">
    <h3>ما هي خدمة بريد 10 دقائق وكيف تفيدك؟</h3>
    <p>موقع <strong>Email.com.ly</strong> يقدم لك أفضل منصة لتوليد <strong>بريد مؤقت</strong> أو ما يعرف بـ <strong>بريد 10 دقائق</strong>. تتيح لك هذه الأداة تخطي عمليات التسجيل الإجبارية في المواقع والمنتدات دون الحاجة للكشف عن هويتك الحقيقية أو استقبال رسائل ترويجية مزعجة (سبام).</p>
    <p>بمجرد انتهاء العداد الزمني، يمكنك دائماً الضغط على زر التمديد للحفاظ على الإيميل لفترة أطول ومتابعة استقبال أكواد التفعيل وصكوك الأمان فورياً وبسرعة فائقة.</p>
</div>

<div class="toast" id="toastMessage"></div>

<script>
    const domain = "@email.com.ly";
    let usageCount = parseInt(localStorage.getItem('email_usage_count') || '0');
    let isLoggedIn = localStorage.getItem('user_logged_in') === 'true';
    let myEmail = sessionStorage.getItem('current_temp_email');
    
    let timeLeft = parseInt(sessionStorage.getItem('timer_left') || '600'); 
    let timerInterval;

    function initLayout() {
        if (!isLoggedIn && usageCount >= 3 && !myEmail) {
            document.getElementById('appInterface').style.display = 'none';
            document.getElementById('authInterface').style.display = 'block';
        } else {
            document.getElementById('appInterface').style.display = 'block';
            document.getElementById('authInterface').style.display = 'none';
            
            if (!myEmail) {
                const randomString = Math.random().toString(36).substring(2, 10);
                myEmail = randomString + domain;
                sessionStorage.setItem('current_temp_email', myEmail);
                timeLeft = 600;
                sessionStorage.setItem('timer_left', timeLeft.toString());
                
                if (!isLoggedIn) {
                    usageCount++;
                    localStorage.setItem('email_usage_count', usageCount.toString());
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

    async function handleAuth(endpoint) {
        const email = document.getElementById('authEmail').value.trim();
        const password = document.getElementById('authPassword').value;

        if(!email || !password) { alert('يرجى ملء كافة الحقول'); return; }

        try {
            const res = await fetch(endpoint, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password })
            });
            const data = await res.json();
            
            if (res.ok) {
                localStorage.setItem('user_logged_in', 'true');
                isLoggedIn = true;
                initLayout();
                showToast(endpoint === '/api/login' ? 'تم تسجيل الدخول!' : 'تم إنشاء الحساب بنجاح!');
            } else {
                alert(data.error || 'حدث خطأ ما');
            }
        } catch (err) {
            alert('تعذر الاتصال بالسيرفر');
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

async function hashPassword(password) {
  const msgBuffer = new TextEncoder().encode(password);
  const hashBuffer = await crypto.subtle.digest('SHA-256', msgBuffer);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}

export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    // 1. توليد خريطة الموقع تلقائياً لعناكب البحث (Sitemap)
    if (url.pathname === "/sitemap.xml") {
      const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://email.com.ly/</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
  </url>
</urlset>`;
      return new Response(sitemap, { headers: { "Content-Type": "application/xml; charset=UTF-8" } });
    }

    // 2. توليد ملف الروبوتات وتوجيهها نحو خريطة الموقع (robots.txt)
    if (url.pathname === "/robots.txt") {
      const robots = `User-agent: *
Allow: /
Disallow: /api/

Sitemap: https://email.com.ly/sitemap.xml`;
      return new Response(robots, { headers: { "Content-Type": "text/plain; charset=UTF-8" } });
    }

    if (url.pathname === "/api/signup" && request.method === "POST") {
      try {
        const { email, password } = await request.json();
        if (!email || !password) return new Response(JSON.stringify({ error: "الرجاء إدخال كافة البيانات" }), { status: 400 });

        const id = crypto.randomUUID();
        const hashedPassword = await hashPassword(password);

        await env.DB.prepare(
          "INSERT INTO users (id, email, password_hash, created_at) VALUES (?, ?, ?, ?)"
        ).bind(id, email.toLowerCase().trim(), hashedPassword, Date.now()).run();

        return new Response(JSON.stringify({ success: true }), { headers: { "Content-Type": "application/json" } });
      } catch (err) {
        return new Response(JSON.stringify({ error: "خطأ: " + err.message }), { status: 400, headers: { "Content-Type": "application/json" } });
      }
    }

    if (url.pathname === "/api/login" && request.method === "POST") {
      const { email, password } = await request.json();
      const hashedPassword = await hashPassword(password);

      const user = await env.DB.prepare(
        "SELECT * FROM users WHERE email = ? AND password_hash = ?"
      ).bind(email.toLowerCase().trim(), hashedPassword).first();

      if (!user) {
        return new Response(JSON.stringify({ error: "بيانات تسجيل الدخول غير صحيحة" }), { status: 401, headers: { "Content-Type": "application/json" } });
      }
      return new Response(JSON.stringify({ success: true }), { headers: { "Content-Type": "application/json" } });
    }

    if (url.pathname === "/api/messages") {
      const email = url.searchParams.get("email");
      if (!email) return new Response(JSON.stringify({ error: "Missing email" }), { status: 400 });

      const { results } = await env.DB.prepare(
        "SELECT * FROM messages WHERE to_email = ? ORDER BY created_at DESC LIMIT 20"
      ).bind(email.toLowerCase().trim()).all();

      return new Response(JSON.stringify(results), { headers: { "Content-Type": "application/json" } });
    }

    return new Response(HTML_FRONTEND, { headers: { "Content-Type": "text/html; charset=UTF-8" } });
  },

  async scheduled(event, env, ctx) {
    const twentyFourHoursAgo = Date.now() - (24 * 60 * 60 * 1000);
    await env.DB.prepare("DELETE FROM messages WHERE created_at < ?").bind(twentyFourHoursAgo).run();
    console.log("تم تنظيف الرسائل القديمة تلقائياً.");
  },

  async email(message, env, ctx) {
    try {
      const parser = new PostalMime();
      const parsedEmail = await parser.parse(message.raw);
      
      const id = crypto.randomUUID();
      await env.DB.prepare(
        "INSERT INTO messages (id, to_email, from_email, subject, body, created_at) VALUES (?, ?, ?, ?, ?, ?)"
      ).bind(id, message.to.toLowerCase().trim(), message.from, parsedEmail.subject || "(بدون عنوان)", parsedEmail.html || parsedEmail.text || "(رسالة فارغة)", Date.now()).run();
    } catch (err) {
      console.error("Error: " + err.message);
    }
  }
};
