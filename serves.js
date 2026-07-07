const express = require('express');
const cors = require('cors');
const axios = require('axios');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

// Rota para calcular o frete
app.post('/api/calculate', async (req, res) => {
  try {
    const { w, h, d, weight, from, to } = req.body;
    
    const response = await axios.post('https://melhorenvio.com.br/api/v2/me/shipment/calculate', {
      from: { postal_code: process.env.VITE_MELHORENVIO_DEP_ORIGEM || from },
      to: { postal_code: to },
      products: [{ id: '1', width: w, height: h, length: d, weight: weight, insurance_value: 0, quantity: 1 }]
    }, {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': Bearer ${process.env.VITE_MELHORENVIO_TOKEN}
      }
    });

    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao calcular frete', details: error.message });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(Servidor rodando na porta ${PORT}));
