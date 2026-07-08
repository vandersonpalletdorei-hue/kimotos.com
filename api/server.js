const express = require('express');
const cors = require('cors');
const axios = require('axios');
require('dotenv').config();

const app = express();

// Ativa o CORS para aceitar as requisições vindas da sua loja na Vercel
app.use(cors());
app.use(express.json());

// Rota do cálculo do frete
app.post('/api/Frete', async (req, res) => {
    try {
        const { cepDestino, peso, largura, altura, comprimento } = req.body;

        // SEU CÓDIGO DO MELHOR ENVIO VAI AQUI DENTRO DO TRY
        // Exemplo temporário para teste de resposta:
        res.status(200).json({ 
            mensagem: "Servidor do frete respondendo perfeitamente!",
            dadosRecebidos: { cepDestino, peso }
        });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Configuração obrigatória da porta dinâmica para o Render funcionar
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(Servidor ativo na porta ${PORT});
});

module.exports = app;
