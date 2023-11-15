import chatRouter from "./routers/protected/chat";
import authRouter from "./routers/auth";
import { router } from "./trpc";
import userRouter from "./routers/protected/user";

// combined router
export const appRouter = router({
  chat: chatRouter,
  auth: authRouter,
  user: userRouter,
});

// type definition of trpc API
export type AppRouter = typeof appRouter;
export type { inferRouterOutputs } from "@trpc/server";
