import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "@/server/api/trpc";

export const aqRouter = createTRPCRouter({
    storeReadings: publicProcedure.input(
        z.object({
            
        })
    )
})