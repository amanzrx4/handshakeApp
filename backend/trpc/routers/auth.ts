import { z } from "zod";
import { publicProcedure, router } from "../trpc";
import prisma from "../../config/prisma";
import * as bcrypt from "bcrypt";
import { isValidHostname } from "../../utils/helpers";
import { HANDSHAKE_ID_SUFFIX } from "../../utils/constants";
import { TRPCError } from "@trpc/server";
import Twilio from "twilio";
import { loginUserInput, registerUserInput } from "../../schema/user";
import { signJwt } from "../../services/user/utils/jwt";

const authRouter = router({
  register: publicProcedure.input(registerUserInput).mutation(async ({ ctx, input }) => {
    const isExistingUser = await prisma.user.findUnique({
      where: {
        username: input.username + HANDSHAKE_ID_SUFFIX,
      },
    });

    console.log("isExistingUser: ", isExistingUser);

    if (isExistingUser) {
      throw new TRPCError({
        code: "BAD_REQUEST",
        message: "Username already exists",
      });
    }

    const userIdenity = input.username + HANDSHAKE_ID_SUFFIX;
    const usernameToStore = userIdenity;
    const passwordToStore = await bcrypt.hash(input.password, 10);
    const friendlyName = input.username;

    const twilioUser = await ctx.twilioClient.conversations.v1.users.create({
      identity: userIdenity,
      friendlyName: friendlyName,
    });

    await prisma.user.create({
      data: {
        identity: userIdenity,
        password: passwordToStore,
        id: twilioUser.sid,
        username: usernameToStore,
      },
    });

    return {
      success: true,
      message: "User created successfully",
    };
  }),
  login: publicProcedure
    .input(loginUserInput)
    .mutation(async ({ input: { username, password }, ctx }) => {
      const userInDb = await prisma.user.findUnique({
        where: {
          username: username + HANDSHAKE_ID_SUFFIX,
        },
      });

      console.log("creds here", username, password, userInDb);

      if (!userInDb) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "Username or password is incorrect",
        });
      }

      const isPasswordCorrect = await bcrypt.compare(password, userInDb.password);

      if (!isPasswordCorrect) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "Incorrect password",
        });
      }

      const accessToken = signJwt(
        { username: userInDb.username, id: userInDb.id },
        { expiresIn: "10h" }
      );

      const refreshToken = signJwt({ id: userInDb.id }, { expiresIn: "7d" });
      console.log("settting ...", accessToken);
      ctx.res.cookie("accessToken", accessToken);
      ctx.res.cookie("refreshToken", refreshToken);

      return { success: true, message: "Login successful" };
      // return { user: userInDb };
    }),

  // list: publicProcedure
  //   .input(
  //     z.object({
  //       username: z.string(),
  //     })
  //   )
  //   .query(async ({ input: { username } }) => {
  //     return await prisma.user.findMany({
  //       where: {
  //         username: {
  //           contains: username,
  //         },
  //       },
  //     });
  //     // let users = [];
  //     // if (username.length === 0) {
  //     //   users = await prisma.user.findMany();
  //     // } else {
  //     //   users = await prisma.user.findMany({
  //     //     where: {
  //     //       username: {
  //     //         contains: username,
  //     //       },
  //     //     },
  //     //   });
  //     // }

  //     // return users;
  //   }),
});

export default authRouter;
