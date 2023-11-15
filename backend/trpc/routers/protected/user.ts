import { z } from "zod";
import { router, privateProcedure } from "../../trpc";

const userRouter = router({
  getMe: privateProcedure.query(({ ctx }) => {
    // console.log("ctx cookir", ctx.req.cookies);
    return ctx.user;
  }),

  // list all users except current user
  listUsers: privateProcedure
    .input(
      z.object({
        username: z.string(),
      })
    )
    .query(async ({ ctx, input: { username } }) => {
      const currentUser = ctx.user;
      return await ctx.prisma.user.findMany({
        where: {
          username: {
            contains: username,
            mode: "insensitive",
          },
          id: {
            not: currentUser.id,
          },
        },
      });
    }),
});

export default userRouter;
