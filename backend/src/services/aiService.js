const AppError = require('../utils/AppError');

async function generateAnswer(messages) {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) throw new AppError('A integração com IA ainda não foi configurada. Defina GEMINI_API_KEY no backend.', 503);
  const model = process.env.GEMINI_MODEL || 'gemini-2.0-flash';
  const contents = messages.slice(-20).map((message) => ({
    role: message.role === 'assistant' ? 'model' : 'user',
    parts: [{ text: message.content }]
  }));
  const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      systemInstruction: { parts: [{ text: 'Você é a Lumina, uma tutora educacional acolhedora, clara e paciente. Explique conceitos passo a passo, incentive o pensamento crítico e responda em português brasileiro.' }] },
      contents,
      generationConfig: { temperature: 0.7, maxOutputTokens: 1200 }
    }),
    signal: AbortSignal.timeout(25000)
  });
  const data = await response.json();
  if (!response.ok) throw new AppError(data.error?.message || 'O provedor de IA não conseguiu responder.', 502);
  const answer = data.candidates?.[0]?.content?.parts?.map((part) => part.text || '').join('').trim();
  if (!answer) throw new AppError('A IA retornou uma resposta vazia. Tente novamente.', 502);
  return answer;
}
module.exports = { generateAnswer };
