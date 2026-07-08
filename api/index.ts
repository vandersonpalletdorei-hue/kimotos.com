import express from 'express';
import cors from 'cors';

const app = express();

app.use(cors());
app.use(express.json());

// Rota de teste básica para ter certeza que o servidor está vivo
app.get('/api/health', (req, res) => {
  res.json({ status: "ok", message: "Servidor Kimotos operando normalmente!" });
});

// Suas rotas do Melhor Envio / Supabase entram aqui abaixo...
// (Garanta que suas rotas comecem com /api/)

export default app;
