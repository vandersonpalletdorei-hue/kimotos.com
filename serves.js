const express = require('express');
const cors = require('cors');
const axios = require('axios');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

// Banco de dados temporário de categorias
const categories = [
  { id: '1', name: 'Capacetes' },
  { id: '2', name: 'Jaquetas' },
  { id: '3', name: 'Acessórios' }
];

// Banco de dados temporário de produtos (Ajuste com os seus produtos reais depois)
const products = [
  {
    id: '1',
    name: 'Capacete Liberty 3 Jet',
    price: 180.00,
    image: 'https://via.placeholder.com/300',
    category: '1',
    description: 'Novo capacete Liberty 3 Jet com alta resistência e design moderno.',
    weight: 1.2, width: 25, height: 25, depth: 30
  }
];

// Rota para buscar categorias
app.get('/api/categories', (req, res) => {
  res.json(categories);
});

// Rota para buscar produtos
app.get('/api/products', (req, res) => {
  res.json(products);
});

// Rota para calcular o frete no Melhor Envio
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
