export default async function handler(req, res) {
    if (req.method === 'GET') {
      const io = res.socket.server.io;
  
      if (io) {
        io.emit('statusUpdate', { status: 'approved' });
        console.log('Emitted status update');
        res.status(200).json({ message: 'Webhook recebido com sucesso.' });
      } else {
        console.log('Socket.io server not initialized');
        res.status(500).json({ message: 'Socket.io server not initialized' });
      }
    } else {
      res.status(405).json({ message: 'Method Not Allowed' });
    }
  }
  