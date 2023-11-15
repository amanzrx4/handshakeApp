/* eslint-disable no-constant-condition */
import {useUserContext} from '@app/contexts/UserContext';
import {AppStackParamList} from '@app/navigators';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {useQuery} from '@tanstack/react-query';
import React, {FC, useEffect} from 'react';
import {SafeAreaView, View, ViewStyle} from 'react-native';
import {GiftedChat, IMessage} from 'react-native-gifted-chat';
import {ReclaimHttps} from '@reclaimprotocol/reclaim-react-native';
import {trpc} from '@app/utils/trpc';
import {Proof} from '@app/types';

type Props = NativeStackScreenProps<AppStackParamList, 'Chat'>;

export const ChatScreen: FC<Props> = ({route}) => {
  const conversationSid = route.params.conversationSid;
  console.log('conversationSid', conversationSid);
  const addProof = trpc.chat.addProof.useMutation();
  const {client, currentUser} = useUserContext();

  const conversation = useQuery({
    queryFn: async () => {
      if (!client) return;

      return await client.getConversationBySid(conversationSid);
    },
    queryKey: ['conversation', conversationSid],
    enabled: !!client,
  });

  const messages = useQuery({
    queryFn: async () => {
      if (!client || !conversation.data) return;
      return await conversation.data.getMessages();
    },
    queryKey: ['messages', conversationSid],
    enabled: !!client && !!conversation.data,
  });

  // console.log('messages', messages);

  const channelListener = () => {
    if (!client) return;
    client.on('messageAdded', message => {
      if (conversationSid === message.conversation.sid) {
        messages.refetch();
      }
    });
  };

  useEffect(() => {
    console.log('registered event');
    channelListener();
  }, [client]);

  const onMessageSend = (message: IMessage[]) => {
    if (!client || !conversation.data) return;

    conversation.data.sendMessage(message[0].text);
  };

  const onProofSuccess = (proofs: Proof[]) => {
    if (!client || !conversation.data) return;
    const proof = proofs[0];

    addProof.mutate({
      conversationId: conversationSid,
      userId: currentUser?.id as string,
      chainId: proof.chainId,
      identifier: proof.identifier,
      context: proof.context,
      epoch: proof.epoch,
      extractedParameterValues: JSON.stringify(proof.extractedParameterValues),
      onChainClaimId: proof.onChainClaimId,
      parameters: JSON.stringify(proof.parameters),
      ownerPublicKey: proof.ownerPublicKey,
      provider: proof.provider,
      templateClaimId: proof.templateClaimId,
      signatures: proof.signatures,
      redactedParameters: proof.redactedParameters,
      timestampS: proof.timestampS,
      sessionId: proof.sessionId,
      witnessAddresses: proof.witnessAddresses,
    });
  };

  const messagesArrToRender = (): IMessage[] => {
    if (!messages.data) return [];
    return messages.data?.items
      .map(message => {
        return {
          text: message.body ? message.body : '',
          _id: message.sid,
          createdAt: message.dateCreated || new Date(),
          user: {
            _id: 12,
          },
        };
      })
      .reverse();
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={$root}>
        <GiftedChat
          messages={messagesArrToRender()}
          onSend={onMessageSend}
          user={{
            _id: 1,
          }}
        />

        <ReclaimHttps
          showShell={false}
          requestedProofs={[
            {
              url: 'https://bookface.ycombinator.com/home',
              loginUrl: 'https://bookface.ycombinator.com/home',
              loginCookies: ['_sso.key'],
              responseSelections: [
                {
                  responseMatch:
                    '\\{"id":{{YC_USER_ID}},.*?waas_admin.*?:{.*?}.*?:\\{.*?}.*?(?:full_name|first_name).*?}',
                },
              ],
            },
          ]}
          // context="Proving on 2023 for eth India"
          title="YC Login"
          subTitle="Prove you have a YC Login"
          cta="Prove"
          onSuccess={proofs => {
            onProofSuccess(proofs as Proof[]);
            /*do something*/
            console.log('proofs', proofs);
          }}
          onFail={e => {
            /*do something*/
            console.log('Error', e);
          }}
          buttonStyle={{backgroundColor: 'black'}}
          buttonTextStyle={{color: 'blue'}}
          onStatusChange={(text: string) => {
            console.log('from on Status change, the status is: ', text);
          }}
        />

        {/* {messages.data &&
          messages.data.items.map(message => {
            const msg = message.body ? message.body : '';
            return <Text key={message.sid}>{msg}</Text>;
          })} */}
      </View>
    </SafeAreaView>
  );
};

const $root: ViewStyle = {
  flex: 1,
};

/**
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 */

// const [userStorage, setUserStorage] = useState<{username: string} | null>(
//   null,
// );

// useEffect(() => {
//   testFunction();
// }, [token.data?.jwt]);

// const testFunction = async () => {
//   if (token.data?.jwt) {
//     console.log('test function running');
//     const client = await TwilioService.getInstance().getChatClient(
//       token.data?.jwt,
//     );
//     const user = client.user;

//     console.log('user here', user.friendlyName, token.data);

//     // client.
//     // const allUsers = await client.user.
//     // console.log('all users here', allUsers);
//   }
// };

// console.log('token', token);
// const conversationChannel = trpc.chat.getChannel.useQuery(
//   {
//     receiverUsername,
//     senderUsername: userStorage?.username as string,
//   },
//   {
//     enabled: !!userStorage?.username && !!token.data?.jwt,
//     onSuccess: async data => {
//       console.log('on successs calling');
//       if (token.data?.jwt) {
//         try {
//           const client = await TwilioService.getInstance().getChatClient(
//             token.data?.jwt,
//           );

//           // console.log('client here bro', client);
//           // await client.
//           // const conversations = await client.getSubscribedConversations();

//           // const channel = await client.createConversation({
//           //   uniqueName: 'something',
//           // });

//           // channel.addNonChatParticipant

//           // console.log('conversations', conversations);

//           // // await client.getUser(data.receiverUsername).then(user => {user.conver
//           // const messages = await conversation.getMessages();
//           // console.log('messages', messages);
//           // client.on('messageAdded', message => {
//           //   console.log('message', message);
//           // });
//         } catch (error) {
//           console.log('error', error);
//         }
//       }
//     },
//   },
// );

// const makeChannel = async () => {
//   const tkd = token.data?.jwt;
//   if (tkd) {
//     const client = await TwilioService.getInstance().getChatClient(tkd);
//     const conv = await client.createConversation({
//       friendlyName: 'General Chat Channel',
//     });
//     // conv.join()
//     // conv.
//   }
// };
// const s = async () => {
//   const client = await TwilioService.getInstance().getChatClient(
//     ' token.data?.jwt,',
//   );

// client.create

// await client.
// const conversations = await client.getSubscribedConversations();

// const conversation = await client.createConversation({
//   uniqueName: 'something',
// });

// conversation.join()
// };

// console.log('conversationChannel', conversationChannel);

// if ('conversationChannel.data') {
