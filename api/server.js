const express = require('express');
const cors = require('cors');
const axios = require('axios');
require('dotenv').config();

const app = express();

app.use(cors());
app.use(express.json());

// ROTA AJUSTADA COM LETRA MINÚSCULA
app.post('/api/frete', async (req, res) => {
    try {
        const { cepDestino, peso, largura, altura, comprimento } = req.body;

        // Seus dados do Melhor Envio rodam aqui dentro
        res.status(200).json({ 
            mensagem: "Servidor do frete respondendo perfeitamente!",
            dadosRecebidos: { cepDestino, peso }
        });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = app;
