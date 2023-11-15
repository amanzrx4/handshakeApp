import React, {FC, useEffect, useState} from 'react';
// import {observer} from 'mobx-react-lite';
import {plusCircle, searchIcon} from '@app/assets/svg';
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
import CardButton from '@app/components/CardButton';
import ScreenContainer from '@app/components/ScreenContainer';
import CancelButton from '@app/components/CancelButton';
import {ScreenTitle} from '@app/lib/styles/common';
// import { useNavigation } from "@react-navigation/native"
// import { useStores } from "app/models"

// interface SearchScreenProps extends AppStackScreenProps<'Search'> {}
type UserProfileScreenProps = NativeStackScreenProps<
  AppStackParamList,
  'UserProfile'
>;

export const UserProfileScreen: FC<UserProfileScreenProps> = ({navigation}) => {
  // const user = getUserFromStorage() as any;
  return (
    <ScreenContainer
      headerMiddle={<ScreenTitle>Profile</ScreenTitle>}
      headerLeft={
        <CancelButton
          stroke="black"
          onPress={() => {
            navigation.canGoBack()
              ? navigation.pop()
              : navigation.navigate('HomeTabs', {screen: 'Home'});
          }}
        />
      }>
      <View style={{paddingVertical: 5}}>
        <CardButton
          flexDirection="row"
          gap={4}
          title="Handshake"
          justifyContent="center"
          style={{width: '100%'}}
          onPress={() => {
            navigation.navigate('HandshakeInit');
          }}
          iconXml={plusCircle}></CardButton>
      </View>
    </ScreenContainer>
  );
};

const $root: ViewStyle = {
  flex: 1,
  padding: 20,
  backgroundColor: commonColors.white,
};
