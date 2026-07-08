const axios = require('axios');

module.exports = async (req, res) => {
    // Habilitar CORS para o seu front-end conseguir rodar
    res.setHeader('Access-Control-Allow-Credentials', true);
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
    res.setHeader(
        'Access-Control-Allow-Headers',
        'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
    );

    // Tratar requisições de teste que o navegador faz (Preflight)
    if (req.method === 'OPTIONS') {
        res.status(200).end();
        return;
    }

    if (req.method === 'POST') {
        try {
            const { cepDestino, peso, largura, altura, comprimento } = req.body;

            // Retorno temporário de teste para garantir que o botão vai funcionar
            return res.status(200).json({ 
                mensagem: "Servidor do frete respondendo perfeitamente na Vercel!",
                dadosRecebidos: { cepDestino, peso }
            });

        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    }

    return res.status(405).json({ error: 'Método não permitido' });
};
