import React, {FC} from 'react';
// import {observer} from 'mobx-react-lite';
import {ViewStyle} from 'react-native';
import {AppStackScreenProps} from 'src/navigators';
import {View, Text} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
// import { useNavigation } from "@react-navigation/native"
// import { useStores } from "app/models"

interface ReceipientSelectScreenProps
  extends AppStackScreenProps<'ReceipientSelect'> {}

export const ReceipientSelectScreen: FC<ReceipientSelectScreenProps> = () => {
  // Pull in one of our MST stores
  // const { someStore, anotherStore } = useStores()

  // Pull in navigation via hook
  // const navigation = useNavigation()
  return (
    <SafeAreaView>
      <View style={$root}>
        <Text>receipientSelect</Text>
      </View>
    </SafeAreaView>
  );
};

const $root: ViewStyle = {
  flex: 1,
};
