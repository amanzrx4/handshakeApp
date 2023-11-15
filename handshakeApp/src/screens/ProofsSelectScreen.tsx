import React, {FC} from 'react';
// import { observer } from "mobx-react-lite"
import {ViewStyle} from 'react-native';
import {AppStackScreenProps} from 'src/navigators';
import {View, Text} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import ScreenContainer from '@app/components/ScreenContainer';
import {palette} from '@app/lib/styles/theme';
import BackButton from '@app/components/BackButton';
import {
  BodyEmphasized,
  CommonFont,
  FlexColumn,
  H1,
  H2,
  flexColumn,
  flexRow,
} from '@app/lib/styles/common';
import styled from 'styled-components/native';
import {proofLabel, proofsMap} from '@app/types';
import ListItem from '@app/components/ListItem';
import {SvgXml} from 'react-native-svg';
import {checkActive, circleInactive as checkInactive} from '@app/assets/svg';
import {CtaButton} from '@app/components/CtaButton';
// import { useNavigation } from "@react-navigation/native"
// import { useStores } from "app/models"

export const ListContent = styled.View`
  ${flexColumn};
  gap: 12px;
`;

// export const ListItem = styled.Pressable`
//   ${flexRow};
//   padding-top: 12px;
//   padding-bottom: 12px;
//   gap: 16px;
//   opacity: ${props => (props.disabled ? 0.5 : 1)};
// `;

interface ProofsSelectScreenProps extends AppStackScreenProps<'ProofsSelect'> {}

export const ProofsSelectScreen: FC<ProofsSelectScreenProps> = ({
  navigation,
}) => {
  const [selectedProofLabel, setSelectedProofLabel] = React.useState<any>([]);
  // Array<typeof proofLabel>
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
      }
      footer={
        <CtaButton
          style={{
            paddingVertical: 16,
            maxHeight: 'auto',
            margin: 12,
            backgroundColor: 'blue',
          }}
          text="Create"
          onPress={() => {
            navigation.navigate('ReceipientSearch');
          }}
          isDisabled={selectedProofLabel.length === 0}>
          <CommonFont
            weight="700"
            size="15px"
            lineHeight="20px"
            color={palette.common.white}>
            Next
          </CommonFont>
        </CtaButton>
      }>
      <View style={{paddingTop: 12, paddingBottom: 24}}>
        <H1 weight="800" lineHeight="40px" style={{paddingBottom: 12}}>
          Select proofs
        </H1>

        <BodyEmphasized color={palette.textGray} weight="500" lineHeight={20}>
          Select which proofs you want to verify between yourself and your date.
        </BodyEmphasized>
      </View>

      {/* header */}
      <View style={{paddingVertical: 20}}>
        <H2>Choose type</H2>
      </View>

      <ListContent>
        {proofLabel.map(key => {
          const {label, icon} = key;

          const selectionIcon = selectedProofLabel.includes(key)
            ? checkActive
            : checkInactive;

          return (
            <ListItem
              onPress={() =>
                setSelectedProofLabel(p =>
                  p.includes(key)
                    ? p.filter(item => item !== key)
                    : [...p, key],
                )
              }
              key={label}
              title={label}
              left={<SvgXml xml={icon} />}
              right={<SvgXml xml={selectionIcon} />}
            />
          );
        })}
      </ListContent>
    </ScreenContainer>
  );
};
