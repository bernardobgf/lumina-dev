const request = require('supertest');
const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');
const app = require('../src/app');
let mongo;
beforeAll(async () => { mongo = await MongoMemoryServer.create(); await mongoose.connect(mongo.getUri()); });
afterAll(async () => { await mongoose.disconnect(); await mongo.stop(); });
afterEach(async () => { await mongoose.connection.db.dropDatabase(); });

describe('API Lumina', () => {
  test('health check retorna status ok', async () => { const response = await request(app).get('/health'); expect(response.status).toBe(200); expect(response.body.status).toBe('ok'); });
  test('executa CRUD de conversas e adiciona mensagem', async () => {
    const created = await request(app).post('/api/v1/chats').send({ title: 'Matemática' }).expect(201);
    const id = created.body.data._id;
    await request(app).get(`/api/v1/chats/${id}`).expect(200);
    await request(app).post(`/api/v1/chats/${id}/messages`).send({ role: 'user', content: 'Explique função.' }).expect(201);
    await request(app).put(`/api/v1/chats/${id}`).send({ title: 'Funções' }).expect(200);
    await request(app).get('/api/v1/chats').expect(200);
    await request(app).delete(`/api/v1/chats/${id}`).expect(204);
    await request(app).get(`/api/v1/chats/${id}`).expect(404);
  });
  test('valida payload de mensagem', async () => {
    const created = await request(app).post('/api/v1/chats').send({}).expect(201);
    await request(app).post(`/api/v1/chats/${created.body.data._id}/messages`).send({ role: 'hacker', content: '' }).expect(400);
  });
  test('retorna 404 para rota inexistente', async () => { await request(app).get('/rota-que-nao-existe').expect(404); });
});
