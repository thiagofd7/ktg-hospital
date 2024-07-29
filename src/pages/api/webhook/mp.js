const { MercadoPagoConfig, Payment } = require("mercadopago");

export default async function handler(req, res) {
  try {
    if (req.method === 'POST') {
      console.log('Webhook received:', req.body);
      if (!req.body.data.id) throw new Error('Without payment Id');
      const io = res.socket.server.io;
      const clientMp = new MercadoPagoConfig({ accessToken: process.env.MP_ACCESS_TOKEN });
      const payment = new Payment(clientMp);
      const paymentData = await payment.get({
        id: req.body.data.id,
      })
      if (io) {
        io.emit('statusUpdate', { status: paymentData.status });
        console.log('Emitted status update');
        res.status(200).json({ message: 'Webhook recebido com sucesso.' });
      } else {
        console.log('Socket.io server not initialized');
        res.status(500).json({ message: 'Socket.io server not initialized' });
      }
    } else {
      res.status(405).json({ message: 'Method Not Allowed' });
    }
  } catch (error) {
    res.status(400).json({ message: 'Internal Server Error' });
  }
  
}
