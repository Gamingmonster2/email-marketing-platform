import PostalMime from 'postal-mime';

const HTML_FRONTEND = `
<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Email.com.ly | بريد مؤقت عشوائي آمن</title>
    <meta name="description" content="خدمة بريد مؤقت عشوائي وآمن. احصل على إيميل وهمي لحظي لحماية خصوصيتك.">
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
            margin-top: 40px;
            box-shadow: 0 4px 20px rgba(0, 0, 0, 0.03);
            box-sizing: border-box;
        }
        h1 { text-align: center; font-size: 24px; margin: 0 0 8px 0; font-weight: 700; }
        .subtitle { text-align: center; color: var(--text-muted); font-size: 14px; margin-bottom: 30px; }
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
        button {
            background: var(--text-main);
            color: #ffffff;
            border: none;
            padding: 12px 24px;
            border-radius: 8px;
            cursor: pointer;
            font-weight: 600;
            font-size: 14px;
        }
        button:hover { background: #1e293b; }
        .refresh-btn { width: 100%; background: transparent; color: var(--text-main); border: 1px solid var(--border); margin-bottom: 25px; }
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
        .auth-btn-group button { flex: 1; }
        .btn-accent { background: var(--accent); }
        .btn-accent:hover { background: var(--accent-hover); }

        .seo-section { max-width: 650px; width: 100%; margin-top: 40px; color: var(--text-muted); font-size: 13px; line-height: 1.6; border-top: 1px solid var(--border); padding-top: 20px; }
        .toast { position: fixed; bottom: 30px; background: var(--text-main); color: white; padding: 12px 24px; border-radius: 8px; font-size: 14px; display: none; z-index: 9999; }
    </style>
</head>
<body>

<div class="container">
    <div id="appInterface">
        <h1>Email.com.ly</h1>
        <div class="subtitle">خدمة البريد العشوائي السريع والمؤقت لحماية خصوصيتك</div>
        
        <div class="email-box">
            <span class="email-text" id="emailAddress">جاري التجهيز...</span>
            <button id="copyBtn" onclick="copyEmail()">نسخ</button>
        </div>

        <button class="refresh-btn" onclick="checkMessages()">تحديث الوارد 🔄</button>

        <div class="messages-list" id="messagesContainer">
            <div class="no-messages">صندوق الوارد فارغ. يتحديث تلقائياً...</div>
        </div>
    </div>

    <div id="authInterface" class="auth-wall">
        <h2>انتهت صلاحية الاستخدام المجاني!</h2>
        <p style="color: var(--text-muted); font-size: 14px; margin-bottom: 20px;">لقد قمت بتوليد 3 حسابات بريد مؤقتة. يرجى تسجيل الدخول أو إنشاء حساب للمتابعة غير المحدودة.</p>
        <input type="email" id="authEmail" class="auth-input" placeholder="البريد الإلكتروني الخاص بك">
        <input type="password" id="authPassword" class="auth-input" placeholder="كلمة المرور">
        <div class="auth-btn-group">
            <button class="btn-accent" onclick="handleAuth('/api/login')">تسجيل الدخول</button>
            <button style="background:#475569;" onclick="handleAuth('/api/signup')">إنشاء حساب جديد</button>
        </div>
    </div>
</div>

<div class="seo-section">
    <h3>لماذا تستخدم خدمة البريد المؤقت من Email.com.ly؟</h3>
    <p>منصة <strong>Email.com.ly</strong> توفر لك توليد إيميل وهمي مؤقت يستقبل الرسائل وصكوك التفعيل فورياً لحماية خصوصيتك من رسائل السبام المزعجة.</p>
</div>

<div class="toast" id="toastMessage"></div>

<script>
    const domain = "@email.com.ly";
    let usageCount = parseInt(localStorage.getItem('email_usage_count') || '0');
    let isLoggedIn = localStorage.getItem('user_logged_in') === 'true';
    let myEmail = sessionStorage.getItem('current_temp_email');

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
                
                if (!isLoggedIn) {
                    usageCount++;
                    localStorage.setItem('email_usage_count', usageCount.toString());
                }
            }
            document.getElementById('emailAddress').innerText = myEmail;
        }
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
        if (!navigator.onLine || !myEmail) return;
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

  // دالة الحذف التلقائي التي تعمل بواسطة الـ Cron Trigger
  async scheduled(event, env, ctx) {
    // تحديد وقت الفحص: حذف الرسائل التي مر عليها أكثر من 24 ساعة
    const twentyFourHoursAgo = Date.now() - (24 * 60 * 60 * 1000);
    
    await env.DB.prepare(
      "DELETE FROM messages WHERE created_at < ?"
    ).bind(twentyFourHoursAgo).run();
    
    console.log("تم تنظيف الرسائل القديمة بنجاح.");
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
