// src/context/SocketContext.jsx
import React, { createContext, useContext, useEffect, useState } from 'react';
import io from 'socket.io-client';

const SocketContext = createContext();

export const SocketProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    // Conectar apenas uma vez
    if (!socket) {
      const socketInstance = io(process.env.PROJECT_DOMAIN); // Substitua pelo URL do seu servidor WebSocket
      setSocket(socketInstance);

      // Ouvir o evento statusUpdate
      socketInstance.on('statusUpdate', (data) => {
        console.log('Status update received:', data);
      });

      // Limpar a conexão quando o componente for desmontado
      return () => {
        if (socketInstance) {
          socketInstance.disconnect();
        }
      };
    }
  }, [socket]);

  return (
    <SocketContext.Provider value={socket}>
      {children}
    </SocketContext.Provider>
  );
};

export const useSocket = () => {
  return useContext(SocketContext);
};
