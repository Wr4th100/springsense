import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "@/server/api/trpc";
import { get, ref } from "firebase/database";
import database from "@/lib/firebaseConfig";
import type {
  ReceivingAirData,
  ReceivingFlowData,
  ReceivingWaterData,
} from "@/types";

export const flowRouter = createTRPCRouter({
  getFlow: publicProcedure.query(async ({ ctx }) => {
    const flowRef = ref(database, "/FlowRateMachine");
    const snapshot = await get(flowRef);
    const allData: Array<
      [
        string,
        {
          FlowRate: number;
          TotalMillilitres: number;
        },
      ]
    > = Object.entries(snapshot.val() as ReceivingFlowData).map(
      ([key, value]) => {
        return [key, value];
      },
    );

    const flowRate: { date: string; flowRate: number }[] = [];

    allData.forEach((data) => {
      flowRate.push({
        date: data[0],
        flowRate: data[1].FlowRate,
      });
    });

    return flowRate.slice(flowRate.length - 10, flowRate.length);
  }),
});
