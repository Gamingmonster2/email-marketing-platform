import PostalMime from 'postal-mime';

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
    <title>بريد 10 دقائق | بريد مؤقت عشوائي وآمن</title>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Cairo:wght@500;700;900&display=swap" rel="stylesheet">
    <style>
        :root {
            --bg-main: #f8fafc;
            --bg-card: #ffffff;
            --text-main: #0f172a;
            --text-muted: #64748b;
            --border: #e2e8f0;
            --accent: #0284c7;
            --accent-hover: #0369a1;
            --danger: #ef4444;
            --premium-color: #d97706;
        }
        body {
            font-family: 'Cairo', sans-serif;
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
        }
        .brand-icon-wrapper { text-align: center; margin-bottom: 15px; }
        .brand-icon {
            font-size: 64px;
            display: inline-block;
            animation: pulse3d 3s ease-in-out infinite;
        }
        @keyframes pulse3d {
            0%, 100% { transform: scale(1) translateY(0); }
            50% { transform: scale(1.05) translateY(-5px); }
        }
        h1 { text-align: center; font-size: 28px; margin: 0 0 8px 0; font-weight: 900; }
        .subtitle { text-align: center; color: var(--text-muted); font-size: 15px; margin-bottom: 25px; font-weight: 500; }
        
        .timer-box {
            text-align: center;
            margin-bottom: 20px;
            font-size: 16px;
            color: var(--text-muted);
            background: #f1f5f9;
            padding: 12px;
            border-radius: 8px;
            display: flex;
            justify-content: center;
            align-items: center;
            gap: 10px;
            font-weight: 700;
        }
        .timer-countdown { font-family: monospace; font-size: 22px; font-weight: bold; color: var(--danger); letter-spacing: 1px; }
        .extend-btn { background: var(--accent); color: white; border: none; padding: 6px 14px; border-radius: 6px; cursor: pointer; font-size: 13px; font-family: 'Cairo', sans-serif; font-weight: 700; }
        .extend-btn:hover { background: var(--accent-hover); }

        .premium-alert {
            display: none;
            background: #fef3c7;
            border: 1px solid #fde68a;
            color: var(--premium-color);
            padding: 12px;
            border-radius: 8px;
            text-align: center;
            font-size: 15px;
            font-weight: 700;
            margin-bottom: 15px;
        }

        .email-box {
            display: flex;
            background: var(--bg-main);
            padding: 10px 10px 10px 16px;
            border-radius: 12px;
            border: 1px solid var(--border);
            margin-bottom: 25px;
            align-items: center;
            justify-content: space-between;
            gap: 15px;
        }
        .email-text { font-family: monospace; font-size: 20px; font-weight: bold; word-break: break-all; user-select: all; letter-spacing: 1px; }
        .email-text.premium-active { color: var(--premium-color); }

        button.main-btn { background: var(--text-main); color: #ffffff; border: none; padding: 12px 24px; border-radius: 8px; cursor: pointer; font-weight: 700; font-size: 15px; font-family: 'Cairo', sans-serif; }
        button.main-btn:hover { background: #1e293b; }
        
        .refresh-btn { width: 100%; background: transparent; color: var(--text-main); border: 2px solid var(--border); margin-bottom: 25px; padding: 12px; border-radius: 8px; cursor: pointer; font-weight: 700; font-family: 'Cairo', sans-serif; font-size: 16px; transition: 0.2s; }
        .refresh-btn:hover { background: var(--bg-main); border-color: var(--text-muted); }
        
        .messages-list { display: flex; flex-direction: column; gap: 12px; }
        .message-card { background: #ffffff; padding: 18px; border-radius: 10px; cursor: pointer; border: 1px solid var(--border); transition: 0.2s; }
        .message-card:hover { border-color: var(--accent); }
        .message-meta { display: flex; justify-content: space-between; font-size: 13px; color: var(--text-muted); margin-bottom: 8px; font-weight: 600; }
        .message-subject { font-weight: 700; font-size: 16px; color: var(--text-main); }
        .message-body { display: none; margin-top: 15px; padding-top: 15px; border-top: 1px solid var(--border); color: #334155; font-size: 15px; line-height: 1.7; overflow-x: auto; font-weight: 500; }
        .no-messages { text-align: center; color: var(--text-muted); padding: 30px 20px; border: 2px dashed var(--border); border-radius: 10px; font-weight: 600; font-size: 15px; }
        
        .auth-wall { display: none; text-align: center; }
        .auth-wall h2 { font-size: 24px; color: var(--danger); margin-bottom: 10px; font-weight: 900; }
        .auth-input { width: 100%; padding: 14px; border: 2px solid var(--border); border-radius: 8px; margin-bottom: 15px; box-sizing: border-box; font-size: 16px; text-align: center; font-family: monospace; letter-spacing: 2px; font-weight: bold; }
        .auth-input:focus { outline: none; border-color: var(--accent); }
        .telegram-link-btn { display: inline-block; background: #24a1de; color: white; text-decoration: none; padding: 14px 24px; border-radius: 8px; font-weight: 700; font-size: 16px; margin-bottom: 20px; font-family: 'Cairo', sans-serif; transition: 0.2s; }
        .telegram-link-btn:hover { background: #1d82b5; transform: translateY(-2px); }
        .verify-btn { width: 100%; background: var(--text-main); color: white; padding: 14px; border-radius: 8px; border: none; cursor: pointer; font-weight: 700; font-family: 'Cairo', sans-serif; font-size: 16px; transition: 0.2s; }
        .verify-btn:hover { background: #1e293b; }

        .toast { position: fixed; bottom: 30px; background: var(--text-main); color: white; padding: 12px 24px; border-radius: 8px; font-size: 15px; font-weight: 700; display: none; z-index: 9999; box-shadow: 0 4px 12px rgba(0,0,0,0.15); }
    </style>
</head>
<body>

<div class="container">
    <div id="appInterface">
        <div class="brand-icon-wrapper"><span class="brand-icon">✉️</span></div>
        <h1>بريد 10 دقائق</h1>
        <div class="subtitle">أنشئ بريداً مؤقتاً وحافظ على هويتك الرقمية</div>
        
        <div class="timer-box">
            <span>الصلاحية المتبقية:</span>
            <span class="timer-countdown" id="countdownClock">10:00</span>
            <button class="extend-btn" onclick="extendTime()">+ تمديد</button>
        </div>

        <div class="premium-alert" id="premiumAlert">✉️ رائع! تم تخصيص هذا البريد النادر لك.</div>

        <div class="email-box">
            <span class="email-text" id="emailAddress">جاري التجهيز...</span>
            <button class="main-btn" id="copyBtn" onclick="copyEmail()">نسخ</button>
        </div>

        <button class="refresh-btn" onclick="checkMessages()">تحديث صندوق الوارد 🔄</button>

        <div class="messages-list" id="messagesContainer">
            <div class="no-messages">صندوق الوارد فارغ. بانتظار الرسائل...</div>
        </div>
    </div>

    <div id="authInterface" class="auth-wall">
        <h2>انتهت الحصة المجانية 🔒</h2>
        <p style="color: var(--text-muted); font-size: 15px; margin-bottom: 20px; font-weight: 600;">لقد استنفدت (5 محاولات). لتفعيل الحساب المفتوح مجاناً، أرسل بريدك المؤقت إلى البوت للحصول على الرمز.</p>
        
        <a href="https://t.me/EmailComLy_bot" target="_blank" class="telegram-link-btn">افتح البوت واضغط Start ✉️</a>
        
        <input type="text" id="tgSecretToken" class="auth-input" placeholder="أدخل الرمز هنا (مثال: TG-XXXXXX)">
        <button class="verify-btn" onclick="verifyTelegramToken()">تفعيل الحساب اللامتناهي</button>
    </div>
</div>

<div class="toast" id="toastMessage"></div>

<script>
    const domain = "@email.com.ly";
    let usageCount = parseInt(localStorage.getItem('tg_usage_count') || '0');
    let lastUsageTime = parseInt(localStorage.getItem('tg_last_usage_time') || '0');
    let isVipUser = localStorage.getItem('tg_user_vip') === 'true';
    let myEmail = sessionStorage.getItem('current_temp_email');
    let timeLeft = parseInt(sessionStorage.getItem('timer_left') || '600'); 
    let timerInterval;

    function checkQuota() {
        const now = Date.now();
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
                try {
                    const res = await fetch('/api/generate-email');
                    const data = await res.json();
                    myEmail = data.email;
                    if(data.isPremium) {
                        document.getElementById('premiumAlert').style.display = 'block';
                        document.getElementById('emailAddress').classList.add('premium-active');
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
        showToast('تم تمديد الصلاحية!');
    }

    async function verifyTelegramToken() {
        const tokenInput = document.getElementById('tgSecretToken').value.trim();
        if(!tokenInput) return;
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
                showToast('تم تفعيل الحساب بنجاح!');
                initLayout();
            } else { alert(data.error || 'الرمز غير صحيح'); }
        } catch (err) {}
    }

    function showToast(text) {
        const toast = document.getElementById('toastMessage');
        toast.innerText = text;
        toast.style.display = 'block';
        setTimeout(() => { toast.style.display = 'none'; }, 2500);
    }

    function copyEmail() {
        navigator.clipboard.writeText(myEmail);
        showToast('تم النسخ!');
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
  if (!botToken) return;
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

    if (url.pathname === "/telegram-webhook" && request.method === "POST") {
      try {
        const update = await request.json();
        if (!update.message || !update.message.text) return new Response("OK");

        const chatId = update.message.chat.id.toString();
        const userText = update.message.text.trim();

        if (userText.startsWith("/start")) {
          const welcomeMsg = `*مرحباً بك في خدمة بريد 10 دقائق الآمنة!* ✉️\n\nللحصول على الرمز السري الخاص بك وتفعيل الحساب اللامتناهي مجاناً، يرجى *إرسال البريد الإلكتروني المؤقت* الذي ظهر لك في الموقع الآن للتحقق منه.`;
          await sendTelegramMessage(env.TELEGRAM_TOKEN, chatId, welcomeMsg);
          return new Response("OK");
        }

        if (userText.includes("@email.com.ly")) {
          let user = await env.DB.prepare("SELECT secret_token FROM users WHERE telegram_id = ?").bind(chatId).first();
          let secretToken;

          if (!user) {
            secretToken = generateSecretToken();
            await env.DB.prepare("INSERT INTO users (telegram_id, secret_token, created_at) VALUES (?, ?, ?)")
              .bind(chatId, secretToken, Date.now()).run();
          } else {
            secretToken = user.secret_token;
          }

          const successMsg = `*✅ تم التحقق بنجاح! البريد حقيقي ومسجل.*\n\nإليك رمز التحقق الدائم الخاص بك لفتح الحظر واستخدام الموقع بلا حدود:\n\n\`${secretToken}\`\n\nقم بنسخ الرمز ولصقه في الصندوق المخصص في الموقع فوراً.`;
          await sendTelegramMessage(env.TELEGRAM_TOKEN, chatId, successMsg);
        } else {
          const errorMsg = `*❌ عذراً، الرمز أو النص المرسل غير صحيح.*\n\nالرجاء إرسال البريد الإلكتروني المؤقت الخاص بك كاملاً (ينتهي بـ @email.com.ly) ليتم فحصه وإرسال كلمة السر الخاصة بك فوراً.`;
          await sendTelegramMessage(env.TELEGRAM_TOKEN, chatId, errorMsg);
        }

        return new Response("OK");
      } catch (err) {
        return new Response("OK");
      }
    }

    if (url.pathname === "/api/generate-email") {
      const index = Math.floor(Math.random() * PREMIUM_KEYWORDS.length);
      const keyword = PREMIUM_KEYWORDS[index];
      const randomSuffix = Math.floor(1000 + Math.random() * 9000); 
      const generatedEmail = `${keyword}${randomSuffix}@email.com.ly`;
      
      return new Response(JSON.stringify({ email: generatedEmail, isPremium: true }), {
        headers: { "Content-Type": "application/json" }
      });
    }

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

    if (url.pathname === "/api/messages") {
      const email = url.searchParams.get("email");
      if (!email) return new Response(JSON.stringify({ error: "Missing email" }), { status: 400 });

      const { results } = await env.DB.prepare("SELECT * FROM messages WHERE to_email = ? ORDER BY created_at DESC LIMIT 20")
        .bind(email.toLowerCase().trim()).all();

      return new Response(JSON.stringify(results), { headers: { "Content-Type": "application/json" } });
    }

    return new Response(HTML_FRONTEND, { headers: { "Content-Type": "text/html; charset=UTF-8" } });
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
