import { Request, Response } from "express";
import { verifyJwt } from "../services/user/utils/jwt";
import prisma from "../config/prisma";
import { TRPCError } from "@trpc/server";
import { cookieStringToObj } from "../utils/helpers";

export const deserializeUser = async ({ req }: { req: Request }) => {
  console.log("req headers", req.headers);
  try {
    if (!req.headers.cookie) return null;

    const cookieObj = cookieStringToObj(req.headers.cookie);

    console.log("cookie object", cookieObj);

    const accessToken = cookieObj.accessToken;

    if (!accessToken) return null;

    // Validate Access Token
    const decoded = verifyJwt<{ id: string; identity: string }>(accessToken);
    console.log("decoded: ", decoded);
    if (!decoded) {
      return null;
    }

    // Check if user has a valid session
    // const session = await redisClient.get(decoded.sub);

    // if (!session) {
    //   return notAuthenticated;
    // }

    return await prisma.user.findUnique({
      where: {
        id: decoded.id,
      },
    });
  } catch (err: any) {
    throw new TRPCError({
      code: "INTERNAL_SERVER_ERROR",
      message: err.message,
    });
  }
};
