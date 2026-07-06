import PostalMime from 'postal-mime';

const HTML_FRONTEND = `
<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Email.com.ly | بريد مؤقت عشوائي</title>
    <style>
        body {
            font-family: system-ui, -apple-system, sans-serif;
            background-color: #0f172a;
            color: #f8fafc;
            margin: 0;
            padding: 20px;
            display: flex;
            flex-direction: column;
            align-items: center;
        }
        .container {
            max-width: 800px;
            width: 100%;
            background: #1e293b;
            padding: 25px;
            border-radius: 12px;
            box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
            margin-top: 40px;
        }
        h1 { text-align: center; color: #38bdf8; font-size: 24px; }
        .email-box {
            display: flex;
            background: #0f172a;
            padding: 12px;
            border-radius: 8px;
            border: 1px solid #334155;
            margin-bottom: 20px;
            align-items: center;
            justify-content: space-between;
        }
        .email-text { font-family: monospace; font-size: 18px; color: #f1f5f9; user-select: all; }
        button {
            background: #0284c7;
            color: white;
            border: none;
            padding: 8px 16px;
            border-radius: 6px;
            cursor: pointer;
            font-weight: bold;
        }
        button:hover { background: #0369a1; }
        .refresh-btn { width: 100%; padding: 12px; font-size: 16px; margin-bottom: 20px; background: #10b981; color: white; border: none; border-radius: 6px; cursor: pointer; font-weight: bold; }
        .refresh-btn:hover { background: #059669; }
        .messages-list { display: flex; flex-direction: column; gap: 10px; }
        .message-card {
            background: #334155;
            padding: 15px;
            border-radius: 8px;
            cursor: pointer;
            border: 1px solid #475569;
        }
        .message-meta { display: flex; justify-content: space-between; font-size: 12px; color: #94a3b8; margin-bottom: 5px; }
        .message-subject { font-weight: bold; color: #f8fafc; }
        .message-body { display: none; margin-top: 10px; padding-top: 10px; border-top: 1px solid #475569; color: #cbd5e1; font-size: 14px; overflow-x: auto; }
        .no-messages { text-align: center; color: #64748b; padding: 20px; }
    </style>
</head>
<body>

<div class="container">
    <h1>منصة البريد المؤقت العشوائي</h1>
    
    <div class="email-box">
        <span class="email-text" id="emailAddress">جاري التوليد...</span>
        <button onclick="copyEmail()">نسخ</button>
    </div>

    <button class="refresh-btn" onclick="checkMessages()">تحديث صندوق الوارد 🔄</button>

    <div class="messages-list" id="messagesContainer">
        <div class="no-messages">لا توجد رسائل واردة حتى الآن. صندوق الوارد يتحدث تلقائياً...</div>
    </div>
</div>

<script>
    const domain = "@email.com.ly";
    const randomString = Math.random().toString(36).substring(2, 10);
    const myEmail = randomString + domain;
    document.getElementById('emailAddress').innerText = myEmail;

    function copyEmail() {
        navigator.clipboard.writeText(myEmail);
        alert('تم نسخ البريد الإلكتروني بنجاح!');
    }

    async function checkMessages() {
        try {
            const res = await fetch('/api/messages?email=' + encodeURIComponent(myEmail));
            const data = await res.json();
            const container = document.getElementById('messagesContainer');
            
            if (!data || data.length === 0) {
                container.innerHTML = '<div class="no-messages">لا توجد رسائل واردة حتى الآن. صندوق الوارد يتحدث تلقائياً...</div>';
                return;
            }

            container.innerHTML = '';
            data.forEach(msg => {
                const card = document.createElement('div');
                card.className = 'message-card';
                card.onclick = function() {
                    const body = card.querySelector('.message-body');
                    body.style.display = body.style.display === 'block' ? 'none' : 'block';
                };

                const timeStr = new Date(msg.created_at).toLocaleTimeString('ar-LY');
                
                card.innerHTML = '<div class="message-meta"><span>من: ' + msg.from_email + '</span><span>' + timeStr + '</span></div>' +
                                 '<div class="message-subject">' + msg.subject + '</div>' +
                                 '<div class="message-body">' + msg.body + '</div>';
                
                container.appendChild(card);
            });
        } catch (err) {
            console.error('خطأ أثناء جلب الرسائل:', err);
        }
    }

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
