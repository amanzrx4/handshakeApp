import React, {FC, useEffect} from 'react';
// import { observer } from "mobx-react-lite"
import {BottomTabScreenProps} from '@react-navigation/bottom-tabs';
import {CompositeScreenProps} from '@react-navigation/native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {Button, Pressable, Text, View, ViewStyle, Image} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {AppStackParamList} from '../navigators';
import {HomeTabParamList} from '../navigators/HomeTabNavigator';
import {trpc} from '../utils/trpc';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ScreenContainer from '@app/components/ScreenContainer';
import {SvgXml} from 'react-native-svg';
import {plusCircle, questionMarkCircle} from '@app/assets/svg';
// import {ReclaimHttps} from "@reclaimprotocol/reclaim-react-native"
import {
  CommonFont,
  FlexColumn,
  H2,
  H3,
  colorBlack10,
} from '@app/lib/styles/common';
import {commonColors, palette} from '@app/lib/styles/theme';
import CardButton from '@app/components/CardButton';
import {useQuery} from '@tanstack/react-query';
import {useUserContext} from '@app/contexts/UserContext';
import {ReclaimHttps} from '@reclaimprotocol/reclaim-react-native';
// import "@app/utils/trpc";
// import { useNavigation } from "@react-navigation/native"
// import { useStores } from "app/models"

// // interface HomeScreenProps extends AppStackScreenProps<'HomeTabs'> {}
// type  = CompositeScreenProps<
//   BottomTabScreenProps<HomeTabParamList, 'Home'>,
//   NativeStackNavigationProp<AppStackParamList>
// >;

// type ProfileScreenProps = CompositeScreenProps<
//   BottomTabScreenProps<TabParamList, 'Profile'>,
//   StackScreenProps<StackParamList>
// >;

// type HomeScreenProps = CompositeNavigationProp<
//   BottomTabScreenProps<HomeTabParamList, 'Home'>,
//   NativeStackScreenProps<AppStackParamList>
// >;

interface HomeScreenProps
  extends CompositeScreenProps<
    BottomTabScreenProps<HomeTabParamList, 'Home'>,
    NativeStackScreenProps<AppStackParamList>
  > {}

export const HomeScreen: FC<HomeScreenProps> = ({navigation}) => {
  const {client} = useUserContext();
  const channels = useQuery({
    queryFn: async () => {
      if (!client) return;
      return await client.getSubscribedConversations();
    },
    queryKey: ['channels'],
    enabled: !!client,
  });

  const onCreateDatingHandshake = () => {
    navigation.navigate('HandshakeInit');
  };

  const onCreateHandshake = onCreateDatingHandshake;

  return (
    <ScreenContainer
      backgroundColor={palette.background}
      // headerOverflow={bottomSheetOpen ? 'visible' : 'hidden'}
      isShadowScroll={true}
      headerLeft={
        <CommonFont
          size="28px"
          weight="800"
          lineHeight="28px"
          color={commonColors.blackNext}>
          Home
        </CommonFont>
      }
      headerRight={<SvgXml xml={questionMarkCircle} />}>
      <FlexColumn gap="20px">
        <View>
          <Text>Profile card</Text>
        </View>

        <CardButton
          flexDirection="row"
          gap={4}
          title="Handshake"
          justifyContent="center"
          style={{width: '100%'}}
          onPress={onCreateHandshake}
          iconXml={plusCircle}></CardButton>

        <View>
          <H2 style={{marginVertical: 10}}>Chats</H2>
          <View
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              width: '100%',
              // backgroundColor: 'red',
              flexDirection: 'row',
              gap: 20,
              padding: 10,
              justifyContent: 'space-between',
            }}>
            {channels.data &&
              channels.data.items.map(ch => {
                // const name = 'Aman+Sagar';
                const uri =
                  'https://engineering.fb.com/wp-content/uploads/2016/04/yearinreview.jpg';
                return (
                  <View key={ch.sid}>
                    {/* <Text>{'ch.uniqueName'}</Text> */}
                    <Image
                      style={{width: 72, height: 72, borderRadius: 72 / 2}}
                      source={{uri}}
                    />
                  </View>
                  // <Text key={ch.sid}>{ch.uniqueName}</Text>
                );
              })}
          </View>
        </View>

        {/* <SafeAreaView style={{flex: 1}}> */}
      </FlexColumn>
    </ScreenContainer>
  );
};

/**
 * 
 *
 *
 *
 *
 *[
  {
    chainId: 420,
    context: '',
    epoch: 2,
    extractedParameterValues: {YC_USER_ID: '182853'},
    identifier:
      '0xc37b8e0bf927ce0ef2b8fc508d857fdf6f9ae91ddd20d58c9490c867e016cb05',
    onChainClaimId: '0',
    ownerPublicKey:
      '0x021ee9251bc5bd687a2cb6e535dcd47bfb479997ea54e4e9f8ec2baf2b6a41dc9f',
    parameters:
      '{"method":"GET","responseSelections":[{"responseMatch":""}],"url":"https://bookface.ycombinator.com/home"}',
    provider: 'http',
    redactedParameters:
      '{"method":"GET","responseSelections":[{"responseMatch":""}],"url":"https://bookface.ycombinator.com/home"}',
    sessionId: undefined,
    signatures: [
      '0x74864f6a9fe726f16817a1f06d297a739587372241f5169252d356294afd936b62e0f761a4608bb589b8af5949aaddbfe9a242b83a1a31ec808eb7cd2dff136d1c',
    ],
    templateClaimId: '0',
    timestampS: '1699440403',
    witnessAddresses: undefined,
  },
];

 *
 *
 */
