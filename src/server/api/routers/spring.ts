import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "@/server/api/trpc";

// - ph
// - temp
// - turbidity
// - dissolved_oxygen
// - water level

export const springRouter = createTRPCRouter({
    findAllAdminPanel: publicProcedure.query(
        ({ ctx }) => {
            return [
                {
                    id:1,
                    ph: 5,
                    temperature: 23,
                    turbudity: 13,
                    dissolved_oxygen: 10,
                    water_level: 25

                },
                {
                    id:2,
                    ph: 5.6,
                    temperature: 25,
                    turbudity: 10,
                    dissolved_oxygen: 15,
                    water_level: 30
                },
                {
                    id:3,
                    ph: 4,
                    temperature: 32,
                    turbudity: 13,
                    dissolved_oxygen: 12,
                    water_level: 28
                },
                {
                    id:4,
                    ph: 5,
                    temperature: 28,
                    turbudity: 11,
                    dissolved_oxygen: 10,
                    water_level: 35
                },
                {
                    id:5,
                    ph: 6.4,
                    temperature: 36,
                    turbudity: 8,
                    dissolved_oxygen: 19,
                    water_level: 27
                },

            ]
        }
    )
})