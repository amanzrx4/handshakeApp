import React, {FC} from 'react';
// import {observer} from 'mobx-react-lite';
import {
  dialogActive,
  circleInactive as dialogInactive,
  searchIcon,
} from '@app/assets/svg';
import BackButton from '@app/components/BackButton';
import {CtaButton} from '@app/components/CtaButton';
import ListItem from '@app/components/ListItem';
import ScreenContainer from '@app/components/ScreenContainer';
import SearchInput from '@app/components/SearchInput';
import {CommonFont, H1} from '@app/lib/styles/common';
import {colorWithOpacity, palette} from '@app/lib/styles/theme';
import {View, StyleSheet} from 'react-native';
import {SvgXml} from 'react-native-svg';
import {AppStackScreenProps} from 'src/navigators';
import {ListContent} from './ProofsSelectScreen';
import {ScrollView} from 'react-native-gesture-handler';
import {trpc} from '@app/utils/trpc';
// import { useNavigation } from "@react-navigation/native"
// import { useStores } from "app/models"

interface ReceipientSearchScreenProps
  extends AppStackScreenProps<'ReceipientSearch'> {}

const black20 = colorWithOpacity(palette.common.black, 0.2);
export const ReceipientSearchScreen: FC<ReceipientSearchScreenProps> = ({
  navigation,
}) => {
  const [selectedUsername, setSelectedUsername] = React.useState<string | null>(
    null,
  );
  const [input, setInput] = React.useState('');
  const allUsers = trpc.user.listUsers.useQuery({
    username: input,
  });
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
        <View
          style={{
            paddingVertical: 1,
            borderTopWidth: StyleSheet.hairlineWidth,
            borderTopColor: black20,
          }}>
          <CtaButton
            style={{
              paddingVertical: 16,
              maxHeight: 'auto',
              margin: 12,
              backgroundColor: 'blue',
            }}
            text="Create"
            onPress={() => {
              console.log('');
            }}
            //   isDisabled={selectedProofLabel.length === 0}
          >
            <CommonFont
              weight="700"
              size="15px"
              lineHeight="20px"
              color={palette.common.white}>
              Start handshake
            </CommonFont>
          </CtaButton>
        </View>
      }>
      <View style={{paddingVertical: 5}}>
        <H1 weight="800" lineHeight="40px" style={{paddingBottom: 12}}>
          Find recipient
        </H1>
      </View>

      {/* header */}
      <View style={{paddingVertical: 5}}>
        <SearchInput
          onChangeText={text => setInput(text.trim())}
          containerStyle={{
            gap: 4,
            alignContent: 'center',
            justifyContent: 'center',
            alignItems: 'center',
          }}
          placeholder="Search"
          leftAdornment={<SvgXml xml={searchIcon} />}
        />
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        <ListContent style={{paddingVertical: 10}}>
          {allUsers?.data &&
            allUsers.data.map(({username}, i) => {
              const rightIcon =
                selectedUsername === username ? dialogActive : dialogInactive;

              return (
                <ListItem
                  onPress={() => setSelectedUsername(username)}
                  key={i}
                  title={username}
                  desc={username}
                  left={<SvgXml xml={searchIcon} />}
                  right={<SvgXml xml={rightIcon} />}
                />
              );
            })}
        </ListContent>
      </ScrollView>
    </ScreenContainer>
  );
};
