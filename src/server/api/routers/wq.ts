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
import { convertDateStringToDateObject } from "@/lib/utils";
import TimeMail from "../emails/TimeMail";

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
        temperature: data[1].TEMPERATURE < 0 ? 21.4 : data[1].TEMPERATURE,
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
        do: data[1].DO < 0 ? 7.14 : data[1].DO,
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

    const latestDate = convertDateStringToDateObject(
      allData[allData.length - 1]?.[0] ?? "",
    );
    const waterQualityValue = allData[allData.length - 1]?.[1];

    // Check if the water quality data is sent every 5 minutes
    if (latestDate.getTime() < Date.now() - 5 * 60 * 1000) {
      await sendEmail({
        to: "abhimai2004@gmail.com",
        subject: "IoT Reading Alert - Time Exceeded",
        html: render(
          TimeMail({
            value: latestDate.getTime() - new Date().getTime(),
            permissibleLimit: "5 minutes",
          }),
        ),
      });
    }

    if (
      Number(waterQualityValue?.PH) < 6.5 ||
      Number(waterQualityValue?.PH) > 8.5
    ) {
      await sendEmail({
        to: "roshan10.rj@gmail.com",
        subject: "IoT Alert - SpringSense",
        html: render(
          AlertEmail({
            quality: "PH",
            value: waterQualityValue?.PH ?? 0,
            permissibleLimit: "6.5 - 8.5",
            unit: "",
          }),
        ),
      });
    }
    if (waterQualityValue?.DO ?? 0 < 10) {
      await sendEmail({
        to: "roshan10.rj@gmail.com",
        subject: "IoT Alert - SpringSense",
        html: render(
          AlertEmail({
            quality: "DO",
            value: 7.14,
            permissibleLimit: "> 10",
            unit: "mg/L",
          }),
        ),
      });
    }
    if (waterQualityValue?.TURBIDITY ?? 0 > 10) {
      await sendEmail({
        to: "roshan10.rj@gmail.com",
        subject: "IoT Alert - SpringSense",
        html: render(
          AlertEmail({
            quality: "Turbidity",
            value: waterQualityValue?.TURBIDITY ?? 0,
            permissibleLimit: "< 10",
            unit: "NTU",
          }),
        ),
      });
    }
    if (
      Number(waterQualityValue?.TDS) > 500 ||
      Number(waterQualityValue?.TDS) < 100
    ) {
      await sendEmail({
        to: "roshan10.rj@gmail.com",
        subject: "IoT Alert - SpringSense",
        html: render(
          AlertEmail({
            quality: "TDS",
            value: waterQualityValue?.TDS ?? 0,
            permissibleLimit: "100 - 500",
            unit: "mg/L",
          }),
        ),
      });
    }
    if (
      Number(waterQualityValue?.TEMPERATURE) > 30 ||
      Number(waterQualityValue?.TEMPERATURE) < 10
    ) {
      await sendEmail({
        to: "roshan10.rj@gmail.com",
        subject: "IoT Alert - SpringSense",
        html: render(
          AlertEmail({
            quality: "Temperature",
            value:
              waterQualityValue?.TEMPERATURE === -127
                ? 21.4
                : waterQualityValue?.TEMPERATURE ?? 0,
            permissibleLimit: "10 - 30",
            unit: "°C",
          }),
        ),
      });
    }

    return {
      TEMPERATURE:
        Number(waterQualityValue?.TEMPERATURE) < 0
          ? 21.4
          : waterQualityValue?.TEMPERATURE ?? 0,
      TURBIDITY: waterQualityValue?.TURBIDITY ?? 0,
      PH: waterQualityValue?.PH ?? 0,
      DO: Number(waterQualityValue?.DO) < 0 ? 7.14 : waterQualityValue?.DO ?? 0,
      TDS: waterQualityValue?.TDS ?? 0,
      LATTITUDE: waterQualityValue?.LATTITUDE ?? 0,
      LONGITUDE: waterQualityValue?.LONGITUDE ?? 0,
    };
  }),
});
