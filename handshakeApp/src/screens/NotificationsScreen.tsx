import React, {FC} from 'react';
// import {observer} from 'mobx-react-lite';
import {ViewStyle} from 'react-native';
import {AppStackScreenProps} from 'src/navigators';
// import {Screen, Text} from 'app/components';
import {Text, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
// import { useNavigation } from "@react-navigation/native"
// import { useStores } from "app/models"

interface NotificationsScreenProps
  extends AppStackScreenProps<''> {}

export const NotificationsScreen: FC<NotificationsScreenProps> = () => {
  // Pull in one of our MST stores
  // const { someStore, anotherStore } = useStores()

  // Pull in navigation via hook
  // const navigation = useNavigation()
  return (
    <View style={$root}>
      <SafeAreaView style={$root}>
        <Text>Notifications</Text>
      </SafeAreaView>
    </View>
  );
};

const $root: ViewStyle = {
  flex: 1,
};
