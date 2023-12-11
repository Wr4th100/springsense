import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "@/server/api/trpc";

export const springRouter = createTRPCRouter({
  findAllAdminPanel: publicProcedure.query(({ ctx }) => {
    return [
      {
        ph: 5,
        temperature: 23,
        turbudity: 13,
        dissolved_oxygen: 10,
        water_flow: 25,
      },
      {
        ph: 5.6,
        temperature: 25,
        turbudity: 10,
        dissolved_oxygen: 15,
        water_flow: 30,
      },
      {
        ph: 4,
        temperature: 32,
        turbudity: 13,
        dissolved_oxygen: 12,
        water_flow: 28,
      },
      {
        ph: 5,
        temperature: 28,
        turbudity: 11,
        dissolved_oxygen: 10,
        water_flow: 35,
      },
      {
        ph: 6.4,
        temperature: 36,
        turbudity: 8,
        dissolved_oxygen: 19,
        water_flow: 27,
      },
    ];
  }),
  findAllPh:publicProcedure.query(({ctx})=>{
    return[
      {
      date: "2023-01-01",
      pH: 6.2},

      {
      date: "2023-01-01",
      pH: 5.7},

      {
      date: "2023-01-01",
      pH: 7.1},
      
     { date: "2023-01-01",
      pH: 6.8},
      
     { date: "2023-01-01",
      pH: 5.5},
      
      {date: "2023-01-01",
      pH: 7.5},
      
      {date: "2023-01-02",
      pH: 6.3},
      
      {date: "2023-01-02",
      pH: 5.9},
      
      {date: "2023-01-02",
      pH: 7.8},
      
      {date: "2023-01-02",
      pH: 6.6}

    ]
  }),
  findAllTurbidity:publicProcedure.query(({ctx})=>{
    return[
      {
      date: "2023-01-01",
      turbidity: 250},

      {
      date: "2023-01-01",
      turbidity: 320},

      {
      date: "2023-01-01",
      turbidity: 275},
      
     { date: "2023-01-01",
      turbidity: 333},
      
     { date: "2023-01-01",
      turbidity: 350},
      
      {date: "2023-01-01",
      turbidity: 268},
      
      {date: "2023-01-02",
      turbidity: 291},
      
      {date: "2023-01-02",
      turbidity: 321},
      
      {date: "2023-01-02",
      turbidity: 299},
      
      {date: "2023-01-02",
      turbidity: 346}

    ]
  }),
  findAllTemperature:publicProcedure.query(({ctx})=>{
    return[
      {
      date: "2023-01-01",
      temperature: 18},

      {
      date: "2023-01-01",
      temperature: 18},

      {
      date: "2023-01-01",
      temperature: 19},
      
     { date: "2023-01-01",
      temperature: 23},
      
     { date: "2023-01-01",
      temperature: 33},
      
      {date: "2023-01-01",
      temperature: 28},
      
      {date: "2023-01-02",
      temperature: 30},
      
      {date: "2023-01-02",
      temperature: 25},
      
      {date: "2023-01-02",
      temperature: 24},
      
      {date: "2023-01-02",
      temperature: 34}

    ]
  }),
  findAllDO:publicProcedure.query(({ctx})=>{
    return[
      {
      date: "2023-01-01",
      dissolved_oxygen: 6},

      {
      date: "2023-01-01",
      dissolved_oxygen: 9.1},

      {
      date: "2023-01-01",
      dissolved_oxygen: 7.8},
      
     { date: "2023-01-01",
      dissolved_oxygen: 5.6},
      
     { date: "2023-01-01",
      dissolved_oxygen: 8.8},
      
      {date: "2023-01-01",
      dissolved_oxygen: 6.0},
      
      {date: "2023-01-02",
      dissolved_oxygen: 5.2},
      
      {date: "2023-01-02",
      dissolved_oxygen: 7.7},
      
      {date: "2023-01-02",
      dissolved_oxygen: 8.3},
      
      {date: "2023-01-02",
      dissolved_oxygen: 6.6}

    ]
  }),
  findAllWaterFlow:publicProcedure.query(({ctx})=>{
    return[
      {
      date: "2023-01-01",
      water_flow: 250},

      {
      date: "2023-01-01",
      water_flow: 320},

      {
      date: "2023-01-01",
      water_flow: 275},
      
     { date: "2023-01-01",
      water_flow: 333},
      
     { date: "2023-01-01",
      water_flow: 350},
      
      {date: "2023-01-01",
      water_flow: 268},
      
      {date: "2023-01-02",
      water_flow: 291},
      
      {date: "2023-01-02",
      water_flow: 321},
      
      {date: "2023-01-02",
      water_flow: 299},
      
      {date: "2023-01-02",
      water_flow: 346}

    ]
  })

});
