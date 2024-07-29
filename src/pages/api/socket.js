import initializeSocket from '../../server/socket';

export default function handler(req, res) {
  if (req.method === 'GET') {
    if (!res.socket.server.io) {
      initializeSocket(res.socket.server);
    }
    res.status(200).json({ message: 'Socket.io server is ready' });
  } else {
    res.status(405).end(); 
  }
}
