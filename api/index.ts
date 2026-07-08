import express from 'express';
import cors from 'cors';
import axios from 'axios';

const app = express();

app.use(cors());
app.use(express.json());

// Rota de teste básica
app.get('/api/health', (req, res) => {
  res.json({ status: "ok", message: "Servidor Kimotos operando normalmente!" });
});

// ROTA DO CÁLCULO DE FRETE (MELHOR ENVIO)
app.post('/api/shipping/calculate', async (req, res) => {
  try {
    const { totalWeight, destinationPostalCode } = req.body;

    // Puxa as variáveis de ambiente que salvamos na Vercel
    const token = process.env.MELHORENVIO_TOKEN;
    const cepOrigem = process.env.MELHORENVIO_CEP_ORIGEM;

    if (!token || !cepOrigem) {
      return res.status(500).json({ error: "Configurações do Melhor Envio ausentes no servidor." });
    }

    // Chamada oficial para a API do Melhor Envio
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

    // Retorna os valores encontrados para a sua loja
    return res.json(response.data);
  } catch (error: any) {
    console.error("Erro no cálculo de frete:", error.response?.data || error.message);
    return res.status(500).json({ error: "Falha ao calcular frete junto ao Melhor Envio." });
  }
});

export default app;
