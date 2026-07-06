import PostalMime from 'postal-mime';

const HTML_FRONTEND = `
<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Email.com.ly | بريد مؤقت عشوائي سريع</title>
    <style>
        :root {
            --bg-main: #0b0f19;
            --bg-card: #151b2c;
            --bg-input: #1e2640;
            --border-color: #2e3a5f;
            --text-primary: #f1f5f9;
            --text-secondary: #94a3b8;
            --accent: #38bdf8;
            --accent-hover: #0284c7;
            --success: #10b981;
        }
        body {
            font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            background-color: var(--bg-main);
            color: var(--text-primary);
            margin: 0;
            padding: 20px;
            display: flex;
            flex-direction: column;
            align-items: center;
            min-height: 100vh;
        }
        .container {
            max-width: 750px;
            width: 100%;
            background: var(--bg-card);
            padding: 30px;
            border-radius: 16px;
            border: 1px solid var(--border-color);
            margin-top: 50px;
            box-sizing: border-box;
        }
        h1 {
            text-align: center;
            color: var(--accent);
            font-size: 26px;
            margin-top: 0;
            margin-bottom: 25px;
            font-weight: 700;
        }
        .email-container {
            display: flex;
            background: var(--bg-input);
            padding: 6px 6px 6px 16px;
            border-radius: 12px;
            border: 1px solid var(--border-color);
            margin-bottom: 25px;
            align-items: center;
            justify-content: space-between;
            gap: 10px;
        }
        .email-text {
            font-family: 'Courier New', monospace;
            font-size: 20px;
            color: var(--text-primary);
            font-weight: bold;
            word-break: break-all;
            user-select: all;
        }
        button {
            background: var(--accent);
            color: var(--bg-main);
            border: none;
            padding: 12px 24px;
            border-radius: 8px;
            cursor: pointer;
            font-weight: 700;
            font-size: 15px;
            transition: all 0.2s ease;
        }
        button:hover {
            background: var(--accent-hover);
            color: white;
        }
        .actions-row {
            display: flex;
            gap: 15px;
            margin-bottom: 25px;
        }
        .refresh-btn {
            flex: 1;
            background: transparent;
            color: var(--text-primary);
            border: 1px solid var(--border-color);
        }
        .refresh-btn:hover {
            background: var(--bg-input);
            border-color: var(--accent);
        }
        .messages-list {
            display: flex;
            flex-direction: column;
            gap: 12px;
        }
        .message-card {
            background: var(--bg-input);
            padding: 18px;
            border-radius: 10px;
            cursor: pointer;
            border: 1px solid var(--border-color);
            transition: transform 0.15s ease, border-color 0.15s ease;
        }
        .message-card:hover {
            border-color: var(--accent);
            transform: translateY(-1px);
        }
        .message-meta {
            display: flex;
            justify-content: space-between;
            font-size: 13px;
            color: var(--text-secondary);
            margin-bottom: 8px;
        }
        .message-subject {
            font-weight: 600;
            color: var(--text-primary);
            font-size: 16px;
        }
        .message-body {
            display: none;
            margin-top: 15px;
            padding-top: 15px;
            border-top: 1px solid var(--border-color);
            color: #cbd5e1;
            font-size: 14px;
            line-height: 1.6;
            overflow-x: auto;
        }
        .no-messages {
            text-align: center;
            color: var(--text-secondary);
            padding: 40px 20px;
            border: 2px dashed var(--border-color);
            border-radius: 10px;
            font-size: 15px;
        }
        .toast {
            position: fixed;
            bottom: 20px;
            background: var(--success);
            color: white;
            padding: 12px 24px;
            border-radius: 8px;
            font-weight: bold;
            box-shadow: 0 4px 12px rgba(0,0,0,0.3);
            display: none;
            animation: slideUp 0.3s ease;
        }
        @keyframes slideUp {
            from { transform: translateY(100px); opacity: 0; }
            to { transform: translateY(0); opacity: 1; }
        }
    </style>
</head>
<body>

<div class="container">
    <h1>Email.com.ly | علبة البريد المؤقتة</h1>
    
    <div class="email-container">
        <span class="email-text" id="emailAddress">جاري توليد عنوانك...</span>
        <button id="copyBtn" onclick="copyEmail()">نسخ العنوان</button>
    </div>

    <div class="actions-row">
        <button class="refresh-btn" onclick="checkMessages()">تحديث الوارد يدوياً 🔄</button>
    </div>

    <div class="messages-list" id="messagesContainer">
        <div class="no-messages">بانتظار الرسائل الواردة... يتحديث الصندوق تلقائياً كل 5 ثوانٍ.</div>
    </div>
</div>

<div class="toast" id="toastMessage">تم نسخ البريد الإلكتروني بنجاح!</div>

<script>
    const domain = "@email.com.ly";
    const randomString = Math.random().toString(36).substring(2, 10);
    const myEmail = randomString + domain;
    document.getElementById('emailAddress').innerText = myEmail;

    function showToast(text) {
        const toast = document.getElementById('toastMessage');
        toast.innerText = text;
        toast.style.display = 'block';
        setTimeout(() => { toast.style.display = 'none'; }, 3000);
    }

    function copyEmail() {
        navigator.clipboard.writeText(myEmail);
        const copyBtn = document.getElementById('copyBtn');
        copyBtn.innerText = 'تم النسخ! ✓';
        copyBtn.style.background = 'var(--success)';
        showToast('تم نسخ البريد الإلكتروني إلى الحافظة!');
        setTimeout(() => {
            copyBtn.innerText = 'نسخ العنوان';
            copyBtn.style.background = 'var(--accent)';
        }, 2000);
    }

    async function checkMessages() {
        try {
            const res = await fetch('/api/messages?email=' + encodeURIComponent(myEmail));
            const data = await res.json();
            const container = document.getElementById('messagesContainer');
            
            if (!data || data.length === 0) {
                return;
            }

            container.innerHTML = '';
            data.forEach(msg => {
                const card = document.createElement('div');
                card.className = 'message-card';
                card.onclick = function(e) {
                    // منع إغلاق الكارد عند الضغط داخل محتوى الرسالة نفسه
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
            console.error('خطأ أثناء جلب الرسائل:', err);
        }
    }

    // الفحص التلقائي المستمر كل 5 ثوانٍ
    setInterval(checkMessages, 5000);
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
