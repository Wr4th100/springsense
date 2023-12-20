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

import axios from "axios";

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

  predictRainfall: publicProcedure.query(async ({ ctx }) => {
    const rainfallURL = "https://spring-sense.onrender.com/predict-rainfall";

    const predicted = await axios.post(rainfallURL, {
      month: new Date().getMonth() + 1,
    });
    console.log("PREDICTED", predicted.data);

    const outflowURL = "https://spring-ml.vercel.app/predict";

    const predictedOutflow = await axios.post(outflowURL, {
      rainfall: predicted.data.rainfallPredicted[0] as number, // eslint-disable-line
    });

    return {
      predictedRainfall: Number(predicted.data.rainfallPredicted[0].toFixed(2)), // eslint-disable-line
      predictedOutflow: [
        predictedOutflow.data.predictionMin as number, // eslint-disable-line
        predictedOutflow.data.predictionMax as number, // eslint-disable-line
      ], // eslint-disable-line
    };
  }),
});
