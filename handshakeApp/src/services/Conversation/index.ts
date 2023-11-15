/* eslint-disable @typescript-eslint/no-empty-function */
import {Client, ClientOptions} from '@twilio/conversations';

export class TwilioService {
  private static serviceInstance: TwilioService | null = null;
  private static chatClient: Client | null = null;

  private constructor() {}

  // Create a single service instance
  static getInstance(): TwilioService {
    if (!TwilioService.serviceInstance) {
      TwilioService.serviceInstance = new TwilioService();
    }
    return TwilioService.serviceInstance;
  }

  // Use the chat client if available; otherwise, create a new chat client
  async getChatClient(
    twilioToken: string,
    clientOptions?: ClientOptions,
  ): Promise<Client> {
    if (!TwilioService.chatClient && !twilioToken) {
      throw new Error('Twilio token is null or undefined');
    }
    if (!TwilioService.chatClient && twilioToken) {
      const client = new Client(twilioToken, clientOptions);
      TwilioService.chatClient = client;
      return TwilioService.chatClient as Client;
    }
    return Promise.resolve(TwilioService.chatClient as Client);
  }

  // Manage token expiration
  addTokenListener(getToken: () => Promise<string>): Client {
    if (!TwilioService.chatClient) {
      throw new Error('Twilio client is null or undefined');
    }

    TwilioService.chatClient.on('tokenAboutToExpire', () => {
      getToken().then(newToken => {
        TwilioService.chatClient?.updateToken(newToken);
      });
    });

    TwilioService.chatClient.on('tokenExpired', () => {
      getToken().then(newToken => {
        TwilioService.chatClient?.updateToken(newToken);
      });
    });

    return TwilioService.chatClient as Client;
  }

  // Gracefully shut down the library instance.
  clientShutdown(): void {
    if (TwilioService.chatClient) {
      TwilioService.chatClient.shutdown();
      TwilioService.chatClient = null;
    }
  }
}
