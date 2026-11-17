# Lumina — plataforma de estudos

Monorepo com dois projetos independentes: `backend/` (API REST em Node.js/Express/JavaScript, preparada para a N3) e `frontend/` (React + Vite, interface da Sprint 3).

## Requisitos
- Node.js 20+
- MongoDB local ou MongoDB Atlas
- Chave de API da Groq para habilitar as respostas do chat

## Backend
```bash
cd backend
cp .env.example .env # configure MONGODB_URI e JWT_SECRET
npm install
npm run dev
```
API: http://localhost:3333 · Swagger: http://localhost:3333/api-docs · Health: http://localhost:3333/health

Para respostas com IA no chat, configure `GROQ_API_KEY` e `GROQ_MODEL` no `.env` do backend. A integração usa o SDK oficial `groq-sdk`; a chave nunca deve ser colocada no frontend. Modelo padrão: `llama-3.3-70b-versatile`.

## Frontend
Em outro terminal:
```bash
cd frontend
cp .env.example .env
npm install
npm run dev
```
Frontend: http://localhost:5173 (a primeira tela é a landing page; use “Acessar plataforma” para entrar no ambiente de estudos).

## Observações importantes
- A persistência real é feita pela API/MongoDB. O frontend não usa localStorage como banco de dados.
- O modo de demonstração visual pode exibir conversas de exemplo, mas a primeira ação de escrita exige a API disponível.
- O identificador `x-user-id` está em modo demonstrativo (`demo-user`), não substitui autenticação e autorização reais. Não publique assim em produção.
- Ajuste os schemas e implemente autenticação/autorização conforme as decisões do grupo e o enunciado integral da N3.
- Execute `npm test -- --coverage` e `npm run lint` no backend antes da entrega. A meta configurada é 80%; não declare cobertura aprovada sem executar e conferir o relatório HTML.
