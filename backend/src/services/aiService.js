const Groq = require('groq-sdk');
const AppError = require('../utils/AppError');

let client;
function getClient() {
  if (!process.env.GROQ_API_KEY) {
    throw new AppError('A integração com IA ainda não foi configurada. Defina GROQ_API_KEY no backend.', 503);
  }
  if (!client) client = new Groq({ apiKey: process.env.GROQ_API_KEY, timeout: 25000, maxRetries: 1 });
  return client;
}

async function generateAnswer(messages) {
  const groq = getClient();
  const model = process.env.GROQ_MODEL || 'llama-3.3-70b-versatile';
  const conversation = messages.slice(-20).map((message) => ({
    role: message.role === 'assistant' ? 'assistant' : 'user',
    content: message.content
  }));
  try {
    const completion = await groq.chat.completions.create({
      model,
      temperature: 0.7,
      max_tokens: 1400,
      messages: [
        {
          role: 'system',
          content: 'Você é a Lumina, uma tutora educacional acolhedora, clara e paciente. Responda em português brasileiro. Explique conceitos passo a passo, use exemplos adequados ao nível do estudante, incentive o pensamento crítico e nunca faça o exercício inteiro sem explicar o raciocínio. Organize respostas longas com títulos e listas em Markdown.'
        },
        ...conversation
      ]
    });
    const answer = completion.choices?.[0]?.message?.content?.trim();
    if (!answer) throw new AppError('A IA retornou uma resposta vazia. Tente novamente.', 502);
    return answer;
  } catch (error) {
    if (error instanceof AppError) throw error;
    const status = error.status === 429 ? 503 : 502;
    const message = error.status === 429
      ? 'A Lumina atingiu temporariamente o limite de solicitações da IA. Aguarde um instante e tente novamente.'
      : 'Não foi possível obter uma resposta da Lumina agora. Tente novamente em instantes.';
    throw new AppError(message, status);
  }
}

module.exports = { generateAnswer };
