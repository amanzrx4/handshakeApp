import { privateProcedure, router } from "../../trpc";

import Twilio from "twilio";
import customConfig from "../../../utils/config/env";
import { createConversationInput, proofInput, proofSchemaInput } from "../../../schema/chat";

const AccessToken = Twilio.jwt.AccessToken;
const ChatGrant = AccessToken.ChatGrant;

const chatRouter = router({
  getToken: privateProcedure.query(async ({ ctx: { user } }) => {
    const chatGrant = new ChatGrant({
      serviceSid: customConfig.serviceSid,
    });
    const token = new AccessToken(
      customConfig.accountSid,
      customConfig.apiKey,
      customConfig.apiSecret,
      {
        identity: user.identity,
        ttl: 3600,
      }
    );

    token.addGrant(chatGrant);

    return { jwt: token.toJwt(), identity: token.identity };
  }),

  createConversation: privateProcedure
    .input(createConversationInput)
    .mutation(async ({ ctx, input }) => {
      const conversation = await ctx.prisma.conversation.create({
        data: input,
      });
    }),

  addProof: privateProcedure.input(proofSchemaInput).mutation(async ({ ctx, input }) => {
    await ctx.prisma.proof.create({
      data: input,
    });
  }),
});

export default chatRouter;
