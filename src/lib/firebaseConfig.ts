// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase, onValue, ref } from "firebase/database";
import { db } from "@/server/db";
import { api } from "@/trpc/react";

const firebaseConfig = {
  apiKey: "AIzaSyC-LX0qSP6uXLiaqC8CRIbu82vYMdDQSyc",
  authDomain: "springsense.firebaseapp.com",
  databaseURL:
    "https://springsense-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "springsense",
  storageBucket: "springsense.appspot.com",
  messagingSenderId: "499013971348",
  appId: "1:499013971348:web:9c2ad5234610c5d62bf381",
  measurementId: "G-BG5X4TZ27Z",
};

type AirQualityType = {
  Acetone: number;
  AirQuality: string;
  CO: number;
  CO2: number;
  Ethanol: number;
  NH4: number;
  Toluene: number;
};

type WaterQualityType = {
  DO: number
  LATTITUDE: number
  LONGITUDE: number
  PH: number
  TDS: number
  TEMPERATURE: number
  TIME_TO_DL: number
  TURBIDITY: number
}

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

function isTimeDifferenceGreaterThan5Seconds(time1: Date, time2: Date) {
  // Calculate the difference in milliseconds
  const differenceInMilliseconds = Math.abs(time1.getTime() - time2.getTime());

  // Check if the difference is greater than or equal to 5 seconds (5000 milliseconds)
  const isGreaterThan5Seconds = differenceInMilliseconds >= 5000;

  return isGreaterThan5Seconds;
}

// const usersRef = ref(database, "/MQ135&Temp");
// const waterRef = ref(database, "/WaterQualityResearch1");
// onValue(usersRef, async (snapshot) => {
//   if (snapshot.exists()) {
//     const receivedData = snapshot.val() as AirQualityType

//     const location = await db.location.findFirst({
//       where: {
//         latitude: 12.971033,
//         longitude: 80.04125
//       }
//     })
//     const lastAirQualityRow = await db.airQuality.findFirst({
//       orderBy: {
//         createdAt: "desc", // Assuming there's a timestamp field named 'createdAt'
//       },
//       where: {
//         location: {
//           latitude: 12.971033,
//           longitude: 80.04125
//         }
//       }
//     });
//     if (
//       isTimeDifferenceGreaterThan5Seconds(
//         new Date(),
//         lastAirQualityRow?.createdAt ?? new Date(),
//       )
//     ) {
//       await db.airQuality.create({
//         data: {
//           acetone: receivedData.Acetone,
//           airQuality: receivedData.AirQuality,
//           co: receivedData.CO,
//           co2: receivedData.CO2,
//           ethanol: receivedData.Ethanol,
//           nh4: receivedData.NH4,
//           toluene: receivedData.Toluene,
//           location: {
//             connect: {
//               id: location?.id
//             }
//           }

//         },
//       });
//     }
//   }
//   console.log(snapshot.val());
// });

// onValue(waterRef, (snapshot) => {
//   console.log(snapshot.val());
// });

export default database;
