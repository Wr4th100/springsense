import type { NextApiResponse } from "next";
import type { Server as SocketIOServer } from "socket.io";
import type { Socket, Server as NetServer } from "net";

export type NextApiResponseServerIo = NextApiResponse & {
  socket: Socket & {
    server: NetServer & {
      io: SocketIOServer;
    };
  };
};

export type Feature = {
  type: string;
  properties: {
    name: string;
    styleHash: string;
    styleMapHash: {
      highlight: string;
      normal: string;
      fill?: string;
      "fill-opacity"?: string;
      stroke?: string;
      "stroke-opacity"?: string;
      "stroke-width"?: string;
    };
    styleUrl: string;
  };
  geometry: {
    type: string;
    coordinates: number[] | number[][] | number[][][];
  };
};

export type KmlJSON = {
  type: string;
  features: Feature[];
};
