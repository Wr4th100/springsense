import type { NextApiResponseServerIo } from "@/types";
import type { Server as NetServer } from "http";
import { Server as ServerIO } from "socket.io";
import type { NextApiRequest } from "next";

export const config = {
  api: {
    bodyParser: false,
  },
};

const ioHandler = (req: NextApiRequest, res: NextApiResponseServerIo) => {
  if (!res.socket.server.io) {
    const path = "/api/socket/io";
    const httpServer: NetServer = res.socket.server as any; // eslint-disable-line
    const io = new ServerIO(httpServer, {
      path,
      addTrailingSlash: false,
    });
    io.on('connection', (s) => {
      console.log('connection');
      s.on('disconnect', () => {
        console.log('disconnect');
      });
    });
  }
  res.end();
};

export default ioHandler;