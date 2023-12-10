'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import { io as ClientIO } from 'socket.io-client';

type SocketContextType = {
  socket: any | null; // eslint-disable-line
  isConnected: boolean;
};

const SocketContext = createContext<SocketContextType>({
  socket: null,
  isConnected: false,
});

export const useSocket = () => {
  return useContext(SocketContext);
};

export const SocketProvider = ({ children }: { children: React.ReactNode }) => {
  const [socket, setSocket] = useState(null);
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line
    const socketInstance = new (ClientIO as any)(
      process.env.NEXT_PUBLIC_SITE_URL!,
      {
        path: '/api/socket/io',
        addTrailingSlash: false,
      }
    );
    // eslint-disable-next-line
    socketInstance.on('connect', () => {
      setIsConnected(true);
    });

    // eslint-disable-next-line
    socketInstance.on('disconnect', () => {
      setIsConnected(false);
    });

    // eslint-disable-next-line
    setSocket(socketInstance);

    return () => {
      // eslint-disable-next-line
      socketInstance.disconnect();
    };
  }, []);

  return (
    <SocketContext.Provider value={{ socket, isConnected }}>
      {children}
    </SocketContext.Provider>
  );
};