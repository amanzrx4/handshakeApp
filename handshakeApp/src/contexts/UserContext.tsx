import {trpc} from '@app/utils/trpc';
import React from 'react';
import {AppRouter, inferRouterOutputs} from '../../../backend/trpc/router';
import {TwilioService} from '@app/services/Conversation';
import {Client} from '@twilio/conversations';

type RouterOutput = inferRouterOutputs<AppRouter>;

export type User = RouterOutput['user']['getMe'];
type Token = RouterOutput['chat']['getToken'];

const UserContext = React.createContext<{
  currentUser?: User;
  token?: Token;
  client?: Client;
}>({});

export const useUserContext = () => React.useContext(UserContext);

export const UserContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [client, setClient] = React.useState<Client | undefined>(undefined);
  const currentUserQuery = trpc.user.getMe.useQuery();
  const tokenQuery = trpc.chat.getToken.useQuery(undefined, {
    enabled: !!currentUserQuery.data,
    onSuccess: async data => {
      const client = await TwilioService.getInstance().getChatClient(data.jwt);
      setClient(client);
    },
  });

  console.log('current user in top level component', currentUserQuery.data);

  return (
    <UserContext.Provider
      value={{
        currentUser: currentUserQuery.data,
        token: tokenQuery.data,
        client,
      }}>
      {children}
    </UserContext.Provider>
  );
};
