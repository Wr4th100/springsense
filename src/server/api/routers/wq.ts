import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "@/server/api/trpc";
import { get, ref } from "firebase/database";
import database from "@/lib/firebaseConfig";
import type { ReceivingWaterData } from "@/types";

export const wqRouter = createTRPCRouter({
  lastWaterQualityRow: publicProcedure.query(({ ctx }) => {
    return ctx.db.waterQuality.findFirst({
      orderBy: { createdAt: "desc" },
      where: {
        location: {
          latitude: 12.971033,
          longitude: 80.04125,
        },
      },
    });
  }),

  getTemperature: publicProcedure.query(async ({ ctx }) => {
    const wqRef = ref(database, "/WaterQualityResearch1");

    const snapshot = await get(wqRef);
    const data = snapshot.val() as ReceivingWaterData;

    return data;
  }),
});