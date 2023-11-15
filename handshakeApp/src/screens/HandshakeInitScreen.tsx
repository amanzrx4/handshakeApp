import {questionMarkCircle, plusCircle} from '@app/assets/svg';
import BackButton from '@app/components/BackButton';
import CardButton from '@app/components/CardButton';
import ScreenContainer from '@app/components/ScreenContainer';
import {
  BodyEmphasized,
  CommonFont,
  FlexColumn,
  H1,
  H2,
} from '@app/lib/styles/common';
import {palette, commonColors} from '@app/lib/styles/theme';
import {HandshakeType} from '@app/types';
import React, {FC} from 'react';
import {Button, View, Text} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';

import {SvgXml} from 'react-native-svg';
import {AppStackScreenProps} from 'src/navigators/AppNavigator';
// import { useNavigation } from "@react-navigation/native"
// import { useStores } from "app/models"

interface HandshakeInitScreenProps
  extends AppStackScreenProps<'HandshakeInit'> {}

export const HandshakeInitScreen: FC<HandshakeInitScreenProps> = ({
  route: {params},
  navigation,
}) => {
  const handshakeType = params.handshakeType;
  const supportedHandshakes = [HandshakeType.Dating, HandshakeType.General];

  const onBegin = () => {
    navigation.navigate('ProofsSelect');
  };

  console.log('handshakeType', handshakeType);
  // Pull in one of our MST stores
  // const { someStore, anotherStore } = useStores()

  // Pull in navigation via hook
  // const navigation = useNavigation()
  return (
    <ScreenContainer
      backgroundColor={palette.background}
      // headerOverflow={bottomSheetOpen ? 'visible' : 'hidden'}
      isShadowScroll={true}
      headerLeft={
        <BackButton
          onPress={() => {
            navigation.canGoBack()
              ? navigation.pop()
              : navigation.navigate('HomeTabs', {screen: 'Home'});
          }}
        />
        // headerRight={<SvgXml xml={questionMarkCircle} />}
      }>
      <View style={{paddingTop: 12, paddingBottom: 24}}>
        <H1 weight="800" lineHeight="40px" style={{paddingBottom: 12}}>
          Handshake
        </H1>

        <BodyEmphasized color={palette.textGray} weight="500" lineHeight={20}>
          Handshakes allow you to swap credentials with others without revealing
          the original source.
        </BodyEmphasized>
      </View>

      {/* header */}
      <View style={{paddingVertical: 20}}>
        <H2>Choose type</H2>
      </View>

      <FlexColumn gap="12px">
        {supportedHandshakes.map(h => (
          <CardButton
            key={h}
            flexDirection="row"
            gap={4}
            title={h.charAt(0).toUpperCase() + h.slice(1)}
            justifyContent="center"
            style={{width: '100%'}}
            onPress={() => navigation.navigate('ProofsSelect')}
            iconXml={plusCircle}></CardButton>
        ))}
      </FlexColumn>
    </ScreenContainer>
  );
};
