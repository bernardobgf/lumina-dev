# Lumina — plataforma de estudos

Monorepo com dois projetos independentes: `backend/` (API REST em Node.js/Express/JavaScript, preparada para a N3) e `frontend/` (React + Vite, interface da Sprint 3).

## Requisitos
- Node.js 20+
- MongoDB local ou MongoDB Atlas

## Backend
```bash
cd backend
cp .env.example .env # configure MONGODB_URI e JWT_SECRET
npm install
npm run dev
```
API: http://localhost:3333 · Swagger: http://localhost:3333/api-docs · Health: http://localhost:3333/health

Para respostas com IA no chat, configure `GEMINI_API_KEY` no `.env` do backend. A chave nunca deve ser colocada no frontend.

## Frontend
Em outro terminal:
```bash
cd frontend
cp .env.example .env
npm install
npm run dev
```
Frontend: http://localhost:5173

## Observações importantes
- A persistência real é feita pela API/MongoDB. O frontend não usa localStorage como banco de dados.
- O modo de demonstração visual pode exibir conversas de exemplo, mas a primeira ação de escrita exige a API disponível.
- O identificador `x-user-id` está em modo demonstrativo (`demo-user`), não substitui autenticação e autorização reais. Não publique assim em produção.
- Ajuste os schemas e implemente autenticação/autorização conforme as decisões do grupo e o enunciado integral da N3.
- Execute `npm test -- --coverage` e `npm run lint` no backend antes da entrega. A meta configurada é 80%; não declare cobertura aprovada sem executar e conferir o relatório HTML.
