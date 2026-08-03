// api/chat.js
export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { messages } = req.body;

  if (!messages || !Array.isArray(messages)) {
    return res.status(400).json({ error: 'Messages array is required' });
  }

  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return res.status(500).json({ error: 'GEMINI_API_KEY is not configured on Vercel' });
  }

  // System context defining your bot's behavior and your background
  const systemInstruction = `
    You are an AI assistant representing Masud Ibn Musa on his personal portfolio website.
    
    About Masud:
    - Software Engineering Student at Daffodil International University (DIU), Bangladesh.
    - Specialization: Backend development, system design, AI engineering, full-stack systems.
    - Programming Languages: Python, Java, JavaScript, C/C++.
    - Tools & Tech: MySQL, Git, Linux, VS Code, AI/ML models.
    - Key Projects: Slot Map (Classroom finder), Smart Library Management System, AI Chat Bot.
    - Email: masudibnmusa10@gmail.com
    - GitHub: github.com/masudibnmusa
    - LinkedIn: linkedin.com/in/masudibnmusa10

    Instructions:
    - Keep responses concise, polite, and professional (under 3 sentences when possible).
    - Answer questions accurately using Masud's details.
  `;

  // Format local history into Gemini REST API payload structure
  const formattedContents = messages.map(msg => ({
    role: msg.role === 'user' ? 'user' : 'model',
    parts: [{ text: msg.content }]
  }));

  try {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          system_instruction: {
            parts: [{ text: systemInstruction }]
          },
          contents: formattedContents
        })
      }
    );

    const data = await response.json();

    if (!response.ok) {
      console.error('Gemini API Error:', data);
      return res.status(500).json({ error: data.error?.message || 'API request failed' });
    }

    const replyText = data.candidates[0].content.parts[0].text;
    return res.status(200).json({ reply: replyText });

  } catch (err) {
    console.error('Server Handler Error:', err);
    return res.status(500).json({ error: 'Internal server error' });
  }
}