// import { MessageInstance } from "twilio/lib/rest/api/v2010/account/message";
import { twilioClient } from "../../utils/twilio";
import {
  ConversationInstance,
  ConversationListInstanceCreateOptions,
} from "twilio/lib/rest/conversations/v1/conversation";

import { MessageInstance } from "twilio/lib/rest/conversations/v1/conversation/message";

// type ServicesPromise<T> = Promise<T | undefined>;

interface ConversationService {
  // response {
  //   accountSid: 'AC7cd506c101cd8d8c4339603c098b20d0',
  //   chatServiceSid: 'ISc8590c760da64f528da076c3bc493c6f',
  //   messagingServiceSid: 'MG71987f30fb4960f5d8aac0242ef1a3f0',
  //   sid: 'CHf1b22806fe57461788bbc1a46904a30e',
  //   friendlyName: null,
  //   uniqueName: 'Test@handshake.id-test@handshake.id',
  //   attributes: '{}',
  //   state: 'active',
  //   dateCreated: '2023-10-31T18:57:44.000Z',
  //   dateUpdated: '2023-10-31T18:57:44.000Z',
  //   timers: {},
  //   url: 'https://conversations.twilio.com/v1/Conversations/CHf1b22806fe57461788bbc1a46904a30e',
  //   links: {
  //     participants: 'https://conversations.twilio.com/v1/Conversations/CHf1b22806fe57461788bbc1a46904a30e/Participants',
  //     messages: 'https://conversations.twilio.com/v1/Conversations/CHf1b22806fe57461788bbc1a46904a30e/Messages',
  //     webhooks: 'https://conversations.twilio.com/v1/Conversations/CHf1b22806fe57461788bbc1a46904a30e/Webhooks'
  //   },
  //   bindings: null
  // }
  addConversationChannel: (
    config: ConversationListInstanceCreateOptions
  ) => Promise<ConversationInstance | undefined>;

  getConversationChannel: (uniqueName: string) => Promise<ConversationInstance | undefined>;

  sendMessage: (uniqueName: string) => Promise<MessageInstance | undefined>;
  getMessages: (uniqueName: string) => Promise<MessageInstance[] | undefined>;
}

const ConversationService: ConversationService = {
  async addConversationChannel(config: ConversationListInstanceCreateOptions) {
    return await twilioClient.conversations.v1.conversations.create(config);
  },

  async getConversationChannel(uniqueName: string) {
    return await twilioClient.conversations.v1.conversations(uniqueName).fetch();
  },

  async sendMessage(uniqueName: string) {
    return await twilioClient.conversations.v1.conversations(uniqueName).messages.create({
      body: "Hello world!",
      author: "system",
    });
  },
  async getMessages(uniqueName: string) {
    return await twilioClient.conversations.v1.conversations(uniqueName).messages.list();
  },
};

export default ConversationService;
