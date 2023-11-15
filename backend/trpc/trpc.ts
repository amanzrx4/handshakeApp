import { initTRPC, inferAsyncReturnType, TRPCError } from "@trpc/server";
import * as trpcExpress from "@trpc/server/adapters/express";
import { twilioClient } from "../utils/twilio";
import prisma from "../config/prisma";
import { deserializeUser } from "../middleware/user";

export const createContext = async ({ req, res }: trpcExpress.CreateExpressContextOptions) => {
  return {
    req,
    res,
    prisma,
    twilioClient,
  };
};

type Context = inferAsyncReturnType<typeof createContext>;
const t = initTRPC.context<Context>().create();

const isAuthenticated = t.middleware(async ({ next, ctx }) => {
  console.log("ctx cookies in private procedure", ctx.req.cookies);
  const user = await deserializeUser({ req: ctx.req });
  console.log("user in private procedure", user);
  if (!user) throw new TRPCError({ code: "BAD_REQUEST", message: "Not authorized" });

  return next({
    ctx: {
      ...ctx,
      user,
    },
  });
});

export const router = t.router;
export const publicProcedure = t.procedure;
export const privateProcedure = t.procedure.use(isAuthenticated);
