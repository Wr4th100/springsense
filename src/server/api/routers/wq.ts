import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "@/server/api/trpc";
import { get, ref } from "firebase/database";
import { render } from "@react-email/render";
import database from "@/lib/firebaseConfig";
import type { ReceivingWaterData } from "@/types";
import AlertEmail from "../emails/AlertEmail";
import { sendEmail } from "../mailer";

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

  // getTemperature: publicProcedure.query(async ({ ctx }) => {
  //   const wqRef = ref(database, "/WaterQualityResearch1");

  //   const snapshot = await get(wqRef);
  //   const data = snapshot.val() as ReceivingWaterData;

  //   return data;
  // }),

  getTemperature: publicProcedure.query(async ({ ctx }) => {
    const aqRef = ref(database, "/MQ135&Temp");
    const snapshot = await get(aqRef);
    const allData: Array<
      [
        string,
        {
          TEMPERATURE: number;
        },
      ]
    > = Object.entries(snapshot.val() as ReceivingWaterData).map(
      ([key, value]) => {
        return [key, value];
      },
    );
    console.log(" ==================== ");
    console.log("ALL DATA", allData);
    console.log(" ==================== ");

    const temperature: { date: string; temperature: number }[] = [];

    allData.map((data, index) => {
      temperature.push({
        date: data[0],
        temperature: data[1].TEMPERATURE,
      });
    });

    return temperature;
  }),

  getPH: publicProcedure.query(async ({ ctx }) => {
    const wqRef = ref(database, "/WaterQualityResearch1");
    const snapshot = await get(wqRef);
    const allData: Array<
      [
        string,
        {
          PH: number;
        },
      ]
    > = Object.entries(snapshot.val() as ReceivingWaterData).map(
      ([key, value]) => {
        return [key, value];
      },
    );
    console.log(" ==================== ");
    console.log("ALL DATA", allData);
    console.log(" ==================== ");

    const ph: { date: string; ph: number }[] = [];

    allData.map((data, index) => {
      ph.push({
        date: data[0],
        ph: data[1].PH,
      });
    });

    return ph;
  }),

  getTurbidity: publicProcedure.query(async ({ ctx }) => {
    const wqRef = ref(database, "/WaterQualityResearch1");
    const snapshot = await get(wqRef);
    const allData: Array<
      [
        string,
        {
          TURBIDITY: number;
        },
      ]
    > = Object.entries(snapshot.val() as ReceivingWaterData).map(
      ([key, value]) => {
        return [key, value];
      },
    );
    console.log(" ==================== ");
    console.log("ALL DATA", allData);
    console.log(" ==================== ");

    const turbidity: { date: string; turbidity: number }[] = [];

    allData.map((data, index) => {
      turbidity.push({
        date: data[0],
        turbidity: data[1].TURBIDITY,
      });
    });

    return turbidity;
  }),

  getTDS: publicProcedure.query(async ({ ctx }) => {
    const wqRef = ref(database, "/WaterQualityResearch1");
    const snapshot = await get(wqRef);
    const allData: Array<
      [
        string,
        {
          TDS: number;
        },
      ]
    > = Object.entries(snapshot.val() as ReceivingWaterData).map(
      ([key, value]) => {
        return [key, value];
      },
    );
    console.log(" ==================== ");
    console.log("ALL DATA", allData);
    console.log(" ==================== ");

    const tds: { date: string; tds: number }[] = [];

    allData.map((data, index) => {
      tds.push({
        date: data[0],
        tds: data[1].TDS,
      });
    });

    return tds;
  }),

  getDO: publicProcedure.query(async ({ ctx }) => {
    const wqRef = ref(database, "/WaterQualityResearch1");
    const snapshot = await get(wqRef);
    const allData: Array<
      [
        string,
        {
          DO: number;
        },
      ]
    > = Object.entries(snapshot.val() as ReceivingWaterData).map(
      ([key, value]) => {
        return [key, value];
      },
    );
    console.log(" ==================== ");
    console.log("ALL DATA", allData);
    console.log(" ==================== ");

    const doValue: { date: string; do: number }[] = [];

    allData.map((data, index) => {
      doValue.push({
        date: data[0],
        do: data[1].DO,
      });
    });

    return doValue;
  }),

  getCurrentWaterQuality: publicProcedure.query(async ({ ctx }) => {
    const wqRef = ref(database, "/WaterQualityResearch1");
    const snapshot = await get(wqRef);
    const allData: Array<
      [
        string,
        {
          TEMPERATURE: number;
          TURBIDITY: number;
          PH: number;
          DO: number;
          TDS: number;
          LATTITUDE: number;
          LONGITUDE: number;
        },
      ]
    > = Object.entries(snapshot.val() as ReceivingWaterData).map(
      ([key, value]) => {
        return [key, value];
      },
    );

    const waterQualityValue = allData[allData.length - 1]?.[1];

    if (waterQualityValue?.PH ?? 0 < 7) {
      await sendEmail({
        to: "roshan10.rj@gmail.com",
        subject: "IoT Alert - SpringSense",
        html: render(AlertEmail()),
      });
    }
    return waterQualityValue;
  }),
});
