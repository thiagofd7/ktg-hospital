const { MercadoPagoConfig, Payment } = require("mercadopago");

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { firstName, lastName, email, cpf, planId, amount } = req.body;
    if (!firstName || !lastName || !email || !cpf || !planId || !amount) {
      return res.status(400).json({ message: 'Todos os campos são obrigatórios.' });
    }

    const clientMp = new MercadoPagoConfig({ accessToken: process.env.MP_ACCESS_TOKEN });
    const payments = new Payment(clientMp);
    var body = {
      transaction_amount: Number(amount),
      description: `Contratação do plano de saúde - ${planId}`,
      payment_method_id: 'pix',
      notification_url: process.env.PROJECT_DOMAIN + '/api/webhook/mp',
      payer: {
        email: email,
        first_name: firstName,
        last_name: lastName,
        identification: {
          type: 'CPF',
          number: '07944777984'
        },
        address: {
          zip_code: '06233200',
          street_name: 'Av. das Nações Unidas',
          street_number: '3003',
          neighborhood: 'Bonfim',
          city: 'Osasco',
          federal_unit: 'SP'
        }
      }

    };
    try {
      const paymentData = await payments.create({ body });
      return res.status(200).json({ pixCode: paymentData.point_of_interaction.transaction_data.qr_code, qrCodeBase64: paymentData.point_of_interaction.transaction_data.qr_code_base64, paymentId: `${paymentData.id}`  });
    }
    catch (error) {
      console.log(error);
      res.status(400).json({ message: 'Erro ao processar pagamento' });
    }

  } else {
    return res.status(405).json({ message: 'Método não permitido' });
  }
}
