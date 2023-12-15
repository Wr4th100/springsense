import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "@/server/api/trpc";

export const aqRouter = createTRPCRouter({
  lastAirQualityRow: publicProcedure.query(({ ctx }) => {
    return ctx.db.airQuality.findFirst({
      orderBy: { createdAt: "desc" },
      where: {
        location: {
          latitude: 12.971033,
          longitude: 80.04125,
        },
      },
    });
  }),

  createAQReading: publicProcedure.input(
    z.object({
      acetone: z.number(),
      airQuality: z.string(),
      co: z.number(),
      co2: z.number(),
      ethanol: z.number(),
      nh4: z.number(),
      toluene: z.number(),
    }),
  ).mutation(async ({ ctx, input }) => {
    // simulate a slow db call
    await new Promise((resolve) => setTimeout(resolve, 1000));

    return ctx.db.airQuality.create({
      data: {
        acetone: input.acetone,
        airQuality: input.airQuality,
        co: input.co,
        co2: input.co2,
        ethanol: input.ethanol,
        nh4: input.nh4,
        toluene: input.toluene,
        location: {
          connect: {
            id: 1,
          },
        },
      },
    });
  }),

});
