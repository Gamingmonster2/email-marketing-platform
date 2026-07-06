import PostalMime from 'postal-mime';

const HTML_FRONTEND = `
<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    
    <!-- تحسين محركات البحث SEO -->
    <title>Email.com.ly | بريد مؤقت عشوائي - إيميل وهمي سريع</title>
    <meta name="description" content="خدمة بريد مؤقت عشوائي وآمن في ليبيا. احصل على إيميل وهمي لحظي لحماية خصوصيتك وتلقي رسائل التفعيل والتسجيل دون رسائل مزعجة.">
    <meta name="keywords" content="بريد مؤقت, ايميل وهمي, بريد عشوائي, مهمل, email.com.ly, بريد مؤقت ليبيا, temporary email">
    <meta name="robots" content="index, follow">
    
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
            font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
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
        h1 {
            text-align: center;
            color: var(--text-main);
            font-size: 24px;
            margin-top: 0;
            margin-bottom: 8px;
            font-weight: 700;
        }
        .subtitle {
            text-align: center;
            color: var(--text-muted);
            font-size: 14px;
            margin-bottom: 30px;
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
        .email-text {
            font-family: 'Courier New', monospace;
            font-size: 19px;
            color: var(--text-main);
            font-weight: bold;
            word-break: break-all;
            user-select: all;
        }
        button {
            background: var(--text-main);
            color: #ffffff;
            border: none;
            padding: 12px 24px;
            border-radius: 8px;
            cursor: pointer;
            font-weight: 600;
            font-size: 14px;
            transition: all 0.2s ease;
        }
        button:hover {
            background: #1e293b;
            transform: translateY(-1px);
        }
        .refresh-btn {
            width: 100%;
            background: transparent;
            color: var(--text-main);
            border: 1px solid var(--border);
            margin-bottom: 25px;
        }
        .refresh-btn:hover {
            background: var(--bg-main);
            border-color: var(--text-muted);
        }
        .messages-list {
            display: flex;
            flex-direction: column;
            gap: 12px;
        }
        .message-card {
            background: #ffffff;
            padding: 18px;
            border-radius: 10px;
            cursor: pointer;
            border: 1px solid var(--border);
            transition: all 0.15s ease;
        }
        .message-card:hover {
            border-color: var(--text-muted);
            box-shadow: 0 2px 8px rgba(0,0,0,0.02);
        }
        .message-meta {
            display: flex;
            justify-content: space-between;
            font-size: 12px;
            color: var(--text-muted);
            margin-bottom: 6px;
        }
        .message-subject {
            font-weight: 600;
            color: var(--text-main);
            font-size: 15px;
        }
        .message-body {
            display: none;
            margin-top: 15px;
            padding-top: 15px;
            border-top: 1px solid var(--border);
            color: #334155;
            font-size: 14px;
            line-height: 1.6;
            overflow-x: auto;
        }
        .no-messages {
            text-align: center;
            color: var(--text-muted);
            padding: 30px 20px;
            border: 1px dashed var(--border);
            border-radius: 10px;
            font-size: 14px;
        }
        
        /* جدار تسجيل الدخول الحصري */
        .auth-wall {
            display: none;
            text-align: center;
            padding: 20px 10px;
        }
        .auth-wall h2 {
            font-size: 20px;
            color: var(--danger);
            margin-bottom: 10px;
        }
        .auth-input {
            width: 100%;
            padding: 12px;
            border: 1px solid var(--border);
            border-radius: 8px;
            margin-bottom: 15px;
            box-sizing: border-box;
            font-size: 15px;
        }
        .auth-btn {
            background: var(--accent);
            width: 100%;
        }
        .auth-btn:hover { background: var(--accent-hover); }

        /* قسم نصوص الـ SEO السفلي */
        .seo-section {
            max-width: 650px;
            width: 100%;
            margin-top: 40px;
            color: var(--text-muted);
            font-size: 13px;
            line-height: 1.6;
            text-align: justify;
            border-top: 1px solid var(--border);
            padding-top: 20px;
        }
        .seo-section h3 {
            font-size: 15px;
            color: var(--text-main);
            margin-bottom: 8px;
        }

        .toast {
            position: fixed;
            bottom: 30px;
            background: var(--text-main);
            color: white;
            padding: 12px 24px;
            border-radius: 8px;
            font-size: 14px;
            display: none;
            box-shadow: 0 4px 12px rgba(0,0,0,0.1);
            z-index: 9999;
        }
    </style>
</head>
<body>

<div class="container">
    <!-- واجهة الخدمة الأساسية -->
    <div id="appInterface">
        <h1>Email.com.ly</h1>
        <div class="subtitle">خدمة البريد العشوائي السريع والمؤقت لحماية بياناتك</div>
        
        <div class="email-box">
            <span class="email-text" id="emailAddress">جاري التجهيز...</span>
            <button id="copyBtn" onclick="copyEmail()">نسخ</button>
        </div>

        <button class="refresh-btn" onclick="checkMessages()">تحديث الوارد 🔄</button>

        <div class="messages-list" id="messagesContainer">
            <div class="no-messages">صندوق الوارد فارغ. يتحديث تلقائياً عند وصول أي رسالة...</div>
        </div>
    </div>

    <!-- واجهة جدار تسجيل الدخول عند تخطي القفل -->
    <div id="authInterface" class="auth-wall">
        <h2>تنتهي صلاحية الاستخدام المجاني المحدود!</h2>
        <p style="color: var(--text-muted); font-size: 14px; margin-bottom: 20px;">لقد قمت بتوليد 3 حسابات بريد مؤقت. يرجى تسجيل الدخول لمتابعة الاستخدام غير المحدود.</p>
        <input type="email" class="auth-input" placeholder="البريد الإلكتروني الخاص بك">
        <input type="password" class="auth-input" placeholder="كلمة المرور">
        <button class="auth-btn" onclick="mockLogin()">تسجيل الدخول / إنشاء حساب</button>
    </div>
</div>

<!-- قسم تحسين السيو بمحركات البحث -->
<div class="seo-section">
    <h3>لماذا تستخدم خدمة البريد المؤقت من Email.com.ly؟</h3>
    <p>في بيئة الويب الحديثة، تطلب الكثير من المواقع والمنصات إدخال بريدك الإلكتروني لتصفح المحتوى أو تحميل الملفات، مما يعرض صندوق واردك الشخصي لحملات رسائل السبام المزعجة واخترق الخصوصية. منصة <strong>Email.com.ly</strong> توفر لك الحل الأمثل عبر توليد إيميل وهمي مؤقت يستقبل الرسائل وصكوك التفعيل فورياً دون مشاركة هويتك الحقيقية البتة.</p>
</div>

<div class="toast" id="toastMessage">تم نسخ البريد!</div>

<script>
    const domain = "@email.com.ly";
    
    // إدارة عداد الاستخدام في متصفح العميل
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
                // توليد إيميل جديد واحتسابه محاولة
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

    function mockLogin() {
        // محاكاة تسجيل دخول لتمرير الحظر
        localStorage.setItem('user_logged_in', 'true');
        isLoggedIn = true;
        initLayout();
        showToast('تم تسجيل الدخول بنجاح!');
    }

    function showToast(text) {
        const toast = document.getElementById('toastMessage');
        toast.innerText = text;
        toast.style.display = 'block';
        setTimeout(() => { toast.style.display = 'none'; }, 2500);
    }

    function copyEmail() {
        navigator.clipboard.writeText(myEmail);
        showToast('تم نسخ البريد الإلكتروني إلى الحافظة!');
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
        } catch (err) {
            console.warn('تذبذب في الشبكة.');
        }
    }

    // التشغيل الأولي للمنصة
    initLayout();
    if (myEmail) {
        setInterval(checkMessages, 5000);
    }
</script>

</body>
</html>
`;

export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    if (url.pathname === "/api/messages") {
      const email = url.searchParams.get("email");
      if (!email) {
        return new Response(JSON.stringify({ error: "Missing email" }), { status: 400, headers: { "Content-Type": "application/json" } });
      }

      try {
        const { results } = await env.DB.prepare(
          "SELECT * FROM messages WHERE to_email = ? ORDER BY created_at DESC LIMIT 20"
        ).bind(email.toLowerCase().trim()).all();

        return new Response(JSON.stringify(results), {
          headers: { "Content-Type": "application/json" }
        });
      } catch (err) {
        return new Response(JSON.stringify({ error: err.message }), { status: 500, headers: { "Content-Type": "application/json" } });
      }
    }

    return new Response(HTML_FRONTEND, {
      headers: { "Content-Type": "text/html; charset=UTF-8" }
    });
  },

  async email(message, env, ctx) {
    try {
      const parser = new PostalMime();
      const parsedEmail = await parser.parse(message.raw);
      
      const id = crypto.randomUUID();
      const to_email = message.to.toLowerCase().trim();
      const from_email = message.from;
      const subject = parsedEmail.subject || "(بدون عنوان)";
      const body = parsedEmail.html || parsedEmail.text || "(رسالة فارغة)";
      const created_at = Date.now();

      await env.DB.prepare(
        "INSERT INTO messages (id, to_email, from_email, subject, body, created_at) VALUES (?, ?, ?, ?, ?, ?)"
      ).bind(id, to_email, from_email, subject, body, created_at).run();

    } catch (err) {
      console.error("Error saving email: " + err.message);
    }
  }
};
