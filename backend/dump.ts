// hello: publicProcedure.query(async ({ ctx, input }) => {
//   return "Hello, world world!";
// }),
// getChannel: publicProcedure
//   .input(
//     z.object({
//       senderUsername: z.string(),
//       receiverUsername: z.string(),
//     })
//   )
//   .query(async ({ ctx, input }) => {
//     const userWithReceiverUsername = await ctx.prisma.user.findUnique({
//       where: {
//         username: input.receiverUsername,
//       },
//     });

//     if (!userWithReceiverUsername) {
//       throw new TRPCError({
//         code: "NOT_FOUND",
//         message: "Receiver user not found",
//       });
//     }

//     /**
//      * channel unique name is as fellows: ${firstUsername}-${secondUsername}
//      * we sort the usernames alphabetically and then join them with a hyphen
//      * so two users can only have one unique channel. TODO: two users can make n number of channels
//      */
//     const conversationFriendlyName = [input.senderUsername, userWithReceiverUsername.username]
//       .sort()
//       .join("-");

//     const conversationUniqueName = conversationFriendlyName;

//     return ConversationService.getConversationChannel(conversationUniqueName).catch(async e => {
//       // channel not found so
//       if (e.code.toString() === "20404") {
//         return await ConversationService.addConversationChannel({
//           uniqueName: conversationUniqueName,
//           friendlyName: conversationFriendlyName,
//         });
//       }
//       throw e;
//     });

//     // const conversation = await ctx.twilioClient.conversations.v1.conversations.create({
//     //   friendlyName: conversationFriendlyName,
//     //   uniqueName: conversationUniqueName,
//     // });

//     // return conversation;

//     // const channelList = await ctx.twilioClient.conversations.v1.conversations.list({

//     // })

//     // const channelSampleName = "sample";
//     // const channel = await ctx.twilioClient.conversations.v1.conversations.create({
//     //   uniqueName: channelSampleName,
//     // });
//     // await ctx.twilioClient.conversations.v1.conversations(channel.sid).participants.create({
//     //   identity: "Alice",
//     // });

//     // // ctx.twilioClient.on

//     // return channel;
//     // await ctx.twilioClient.conversations.v1.conversations(channel.sid).participants.create({
//     //     identity: "Alice",
//     //     });
//     // })

//     // response
//     // {
//     //     accountSid: 'AC7cd506c101cd8d8c4339603c098b20d0',
//     //     chatServiceSid: 'ISc8590c760da64f528da076c3bc493c6f',
//     //     messagingServiceSid: 'MG71987f30fb4960f5d8aac0242ef1a3f0',
//     //     sid: 'CH66a950e35fcb4dda9ba8b0f699f403e3',
//     //     friendlyName: null,
//     //     uniqueName: 'General Chat Channel 3',
//     //     attributes: '{}',
//     //     state: 'active',
//     //     dateCreated: '2023-10-28T14:47:03.000Z',
//     //     dateUpdated: '2023-10-28T14:47:03.000Z',
//     //     timers: {},
//     //     url: 'https://conversations.twilio.com/v1/Conversations/CH66a950e35fcb4dda9ba8b0f699f403e3',
//     //     links: {
//     //       participants: 'https://conversations.twilio.com/v1/Conversations/CH66a950e35fcb4dda9ba8b0f699f403e3/Participants',
//     //       messages: 'https://conversations.twilio.com/v1/Conversations/CH66a950e35fcb4dda9ba8b0f699f403e3/Messages',
//     //       webhooks: 'https://conversations.twilio.com/v1/Conversations/CH66a950e35fcb4dda9ba8b0f699f403e3/Webhooks'
//     //     },
//     //     bindings: null
//     //   }
//     //   return channel;

//     // new result
//     // {
//     //   accountSid: 'AC7cd506c101cd8d8c4339603c098b20d0',
//     //   chatServiceSid: 'ISc8590c760da64f528da076c3bc493c6f',
//     //   messagingServiceSid: 'MG71987f30fb4960f5d8aac0242ef1a3f0',
//     //   sid: 'CH172066a4cdbf498da7c3fdb2a65bafc0',
//     //   friendlyName: 'test2@handshake.id-test@handshake.id',
//     //   uniqueName: 'test2@handshake.id-test@handshake.id',
//     //   attributes: '{}',
//     //   state: 'active',
//     //   dateCreated: '2023-10-29T20:41:24.000Z',
//     //   dateUpdated: '2023-10-29T20:41:24.000Z',
//     //   timers: {},
//     //   url: 'https://conversations.twilio.com/v1/Conversations/CH172066a4cdbf498da7c3fdb2a65bafc0',
//     //   links: {
//     //     participants: 'https://conversations.twilio.com/v1/Conversations/CH172066a4cdbf498da7c3fdb2a65bafc0/Participants',
//     //     messages: 'https://conversations.twilio.com/v1/Conversations/CH172066a4cdbf498da7c3fdb2a65bafc0/Messages',
//     //     webhooks: 'https://conversations.twilio.com/v1/Conversations/CH172066a4cdbf498da7c3fdb2a65bafc0/Webhooks'
//     //   },
//     //   bindings: null
//     // }
//   }),

// sendMessage: publicProcedure
//   .input(z.object({ uniqueName: z.string() }))
//   .mutation(async ({ input }) => {
//     return await ConversationService.sendMessage(input.uniqueName);
//   }),

// getMessages: publicProcedure
//   .input(z.object({ uniqueName: z.string() }))
//   .mutation(async ({ input }) => {
//     return await ConversationService.getMessages(input.uniqueName);
//   }),
