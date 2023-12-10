import { postRouter } from "@/server/api/routers/post";
import { springRouter } from "./routers/spring";
import { createTRPCRouter } from "@/server/api/trpc";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  post: postRouter,
  spring:springRouter
});

// export type definition of API
export type AppRouter = typeof appRouter;
