const express = require('express');
const cors = require('cors');
const axios = require('axios');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

// Rota do cálculo do frete
app.post('/api/frete', async (req, res) => {
  try {
    const { cepDestino, peso, largura, altura, comprimento } = req.body;

    // Aqui fica a sua integração atual com a API Melhor Envio / Correios
    // (O código que já estava aí dentro da sua rota POST)
    
    res.status(200).json({ mensagem: "Servidor respondendo corretamente!" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// IMPORTANTE: Em vez de app.listen(), a Vercel exige que exportemos o app
module.exports = app;
