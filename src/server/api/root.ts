import { postRouter } from "@/server/api/routers/post";
import { springRouter } from "./routers/spring";
import { createTRPCRouter } from "@/server/api/trpc";
import { locationRouter } from "./routers/location";
import { aqRouter } from "./routers/aq";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  post: postRouter,
  spring: springRouter,
  aq: aqRouter,
  location: locationRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
