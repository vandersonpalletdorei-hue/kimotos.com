import express from 'express';
import cors from 'cors';
import axios from 'axios';
import { createClient } from '@supabase/supabase-base'; // Certifique-se de que a biblioteca está instalada se usar o cliente oficial

const app = express();

app.use(cors());
app.use(express.json());

// Rota de teste básica
app.get('/api/health', (req, res) => {
  res.json({ status: "ok", message: "Servidor Kimotos operando normalmente!" });
});

// 1. ROTA DE PRODUTOS (Exemplo integrando com Supabase se necessário, ou retornando os dados)
app.get('/api/products', async (req, res) => {
  try {
    const supabaseUrl = process.env.SUPABASE_URL;
    const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

    if (!supabaseUrl || !supabaseKey) {
      return res.status(500).json({ error: "Credenciais do Supabase ausentes." });
    }

    // Caso seu código faça um fetch direto na API REST do Supabase:
    const response = await axios.get(${supabaseUrl}/rest/v1/products?select=*, {
      headers: {
        'apikey': supabaseKey,
        'Authorization': Bearer ${supabaseKey}
      }
    });

    return res.json(response.data);
  } catch (error: any) {
    console.error("Erro ao buscar produtos:", error.message);
    return res.status(500).json({ error: "Falha ao carregar produtos do banco de dados." });
  }
});

// 2. ROTA DE CATEGORIAS
app.get('/api/categories', async (req, res) => {
  try {
    const supabaseUrl = process.env.SUPABASE_URL;
    const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

    if (!supabaseUrl || !supabaseKey) {
      return res.status(500).json({ error: "Credenciais do Supabase ausentes." });
    }

    const response = await axios.get(${supabaseUrl}/rest/v1/categories?select=*, {
      headers: {
        'apikey': supabaseKey,
        'Authorization': Bearer ${supabaseKey}
      }
    });

    return res.json(response.data);
  } catch (error: any) {
    console.error("Erro ao buscar categorias:", error.message);
    return res.status(500).json({ error: "Falha ao carregar categorias." });
  }
});

// 3. ROTA DO CÁLCULO DE FRETE (MELHOR ENVIO)
app.post('/api/shipping/calculate', async (req, res) => {
  try {
    const { totalWeight, destinationPostalCode } = req.body;
    const token = process.env.MELHORENVIO_TOKEN;
    const cepOrigem = process.env.MELHORENVIO_CEP_ORIGEM;

    if (!token || !cepOrigem) {
      return res.status(500).json({ error: "Configurações do Melhor Envio ausentes." });
    }

    const response = await axios.post(
      'https://api.melhorenvio.com.br/api/v2/me/shipment/calculate',
      {
        from: { postal_code: cepOrigem.replace(/\D/g, "") },
        to: { postal_code: destinationPostalCode.replace(/\D/g, "") },
        package: {
          weight: totalWeight || 0.5,
          width: 11,
          height: 2,
          length: 16
        }
      },
      {
        headers: {
          'Authorization': Bearer ${token},
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        }
      }
    );

    return res.json(response.data);
  } catch (error: any) {
    console.error("Erro no cálculo de frete:", error.response?.data || error.message);
    return res.status(500).json({ error: "Falha ao calcular frete junto ao Melhor Envio." });
  }
});

export default app;
