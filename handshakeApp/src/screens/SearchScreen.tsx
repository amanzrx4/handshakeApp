import React, {FC, useEffect, useState} from 'react';
// import {observer} from 'mobx-react-lite';
import {searchIcon} from '@app/assets/svg';
import ListItem from '@app/components/ListItem';

import SearchInput from '@app/components/SearchInput';
import {getUserFromStorage} from '@app/utils/helpers';
import {trpc} from '@app/utils/trpc';
import {BottomTabScreenProps} from '@react-navigation/bottom-tabs';
import {CompositeScreenProps} from '@react-navigation/native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {View, ViewStyle} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import {SafeAreaView} from 'react-native-safe-area-context';
import {SvgXml} from 'react-native-svg';
import {AppStackParamList} from '../navigators';
import {HomeTabParamList} from '../navigators/HomeTabNavigator';
import {ListContent} from './ProofsSelectScreen';
import {commonColors} from '@app/lib/styles/theme';
import {TwilioService} from '@app/services/Conversation';
import {Client} from '@twilio/conversations';
import {User, useUserContext} from '@app/contexts/UserContext';
import {HANDSHAKE_FIRST_MESSAGE} from '@app/lib/utils/constants';
// import { useNavigation } from "@react-navigation/native"
// import { useStores } from "app/models"

// interface SearchScreenProps extends AppStackScreenProps<'Search'> {}
interface SearchScreenProps
  extends CompositeScreenProps<
    BottomTabScreenProps<HomeTabParamList, 'Search'>,
    NativeStackScreenProps<AppStackParamList>
  > {}

function generateRandomId() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    const r = (Math.random() * 16) | 0,
      v = c == 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

export const SearchScreen: FC<SearchScreenProps> = ({navigation}) => {
  const token = trpc.chat.getToken.useQuery();
  const createConversationDb = trpc.chat.createConversation.useMutation({
    onSuccess: data => {
      console.log('success', data);
    },
  });
  const {currentUser} = useUserContext();

  const testFunction = async () => {
    if (token.data?.jwt) {
      const client = await TwilioService.getInstance().getChatClient(
        token.data?.jwt,
      );
      await getSubsChannel(client);
    }
  };

  useEffect(() => {
    testFunction();
  }, [token.data?.jwt]);

  const onUserPress = async (receipientUser: User) => {
    try {
      if (!token.data?.jwt) return;
      const client = await TwilioService.getInstance().getChatClient(
        token.data?.jwt,
      );

      const randomId = generateRandomId();
      const conversationFriendlyName = [
        currentUser!.username,
        receipientUser.username,
      ]
        .sort()
        .join('-');
      console.log('random id hree', randomId);
      const conversationUniqueName =
        conversationFriendlyName + '-' + randomId.replaceAll('-', '');

      const conversation = await client.createConversation({
        uniqueName: conversationUniqueName,
        friendlyName: conversationFriendlyName,
      });

      await createConversationDb.mutateAsync({
        id: conversation.sid,
        friendlyName: conversationFriendlyName,
        uniqueName: conversationUniqueName,
        senderId: currentUser!.id,
        recipientId: receipientUser.id,
      });

      await conversation.join();
      conversation.sendMessage(HANDSHAKE_FIRST_MESSAGE);
      await conversation.add(receipientUser.identity);
      navigation.navigate('Chat', {conversationSid: conversation.sid});
    } catch (error) {
      console.log('error', error);
    }
  };

  const getSubsChannel = async (client: Client) => {
    const subsChannel = await client.getSubscribedConversations();
    console.log('subsChannel', subsChannel);
  };

  const [input, setInput] = React.useState('');

  // const users = trpc.user.list.useQuery({username: value});
  const onChangeText = (value: string) => {
    value = value.trim();

    setInput(value);
  };

  // const [userStorage, setUserStorage] = useState<{username: string} | null>(
  //   null,
  // );
  const allUsers = trpc.user.listUsers.useQuery({
    username: input,
  });
  // useEffect(() => {
  //   getUserFromStorage().then(u => setUserStorage(u));
  // }, []);

  // console.log('userStorage', userStorage);

  // const user = getUserFromStorage() as any;
  return (
    // <SafeAreaView style={{flex: 1}}>
    <SafeAreaView style={$root}>
      <View style={{paddingVertical: 5}}>
        <SearchInput
          containerStyle={{
            gap: 4,
            alignContent: 'center',
            justifyContent: 'center',
            alignItems: 'center',
          }}
          onChangeText={onChangeText}
          placeholder="Search"
          leftAdornment={<SvgXml xml={searchIcon} />}
        />
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        <ListContent style={{paddingVertical: 10}}>
          {allUsers.data &&
            allUsers.data.map((user, i) => {
              return (
                <ListItem
                  onPress={() => onUserPress(user)}
                  // onPress={() => navigation.navigate('UserProfile')}
                  key={i}
                  title={user.username}
                  desc={user.username}
                  left={<SvgXml xml={searchIcon} />}
                />
              );
            })}
        </ListContent>
      </ScrollView>
    </SafeAreaView>
    // </SafeAreaView>
  );
};

const $root: ViewStyle = {
  flex: 1,
  padding: 20,
  backgroundColor: commonColors.white,
};
