import React, {FC} from 'react';
import {ViewStyle} from 'react-native';
import {AppStackScreenProps} from 'src/navigators';
import {View, Text} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
// import { useNavigation } from "@react-navigation/native"
// import { useStores } from "app/models"

interface ProfileScreenProps extends AppStackScreenProps<'Profile'> {}

export const ProfileScreen: FC<ProfileScreenProps> = () => {
  // Pull in one of our MST stores
  // const { someStore, anotherStore } = useStores()

  // Pull in navigation via hook
  // const navigation = useNavigation()
  return (
    <View style={$root}>
      <SafeAreaView style={$root}>
        <Text>Profile</Text>
      </SafeAreaView>
    </View>
  );
};

const $root: ViewStyle = {
  flex: 1,
};
