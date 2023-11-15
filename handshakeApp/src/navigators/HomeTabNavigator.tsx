/**
 * The app navigator (formerly "AppNavigator" and "MainNavigator") is used for the primary
 * navigation flows of your app.
 * Generally speaking, it will contain an auth flow (registration, login, forgot password)
 * and a "main" flow which the user will use once logged in.
 */
// import { createNativeStackNavigator, NativeStackScreenProps } from "@react-navigation/native-stack"
import {
  BottomTabScreenProps,
  createBottomTabNavigator,
} from '@react-navigation/bottom-tabs';
// import { observer } from "mobx-react-lite"
import React from 'react';
// import { useColorScheme } from "react-native"
import * as Screens from '../screens';
import {SvgXml} from 'react-native-svg';
import {
  homeActive,
  homeInactive,
  searchActive,
  searchInactive,
} from '@app/assets/svg';
import theme, {commonColors, palette} from '@app/lib/styles/theme';
import {CommonFont} from '@app/lib/styles/common';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

/**
 * This type allows TypeScript to know what routes are defined in this navigator
 * as well as what properties (if any) they might take when navigating to them.
 *
 * If no params are allowed, pass through `undefined`. Generally speaking, we
 * recommend using your MobX-State-Tree store(s) to keep application state
 * rather than passing state through navigation params.
 *
 * For more information, see this documentation:
 *   https://reactnavigation.org/docs/params/
 *   https://reactnavigation.org/docs/typescript#type-checking-the-navigator
 *   https://reactnavigation.org/docs/typescript/#organizing-types
 */
export type HomeTabParamList = {
  Home: undefined;
  Search: undefined;
  // Notification: undefined
  // Profile: undefined
};

/**
 * This is a list of all the route names that will exit the app if the back button
 * is pressed while in that screen. Only affects Android.
 */
// const exitRoutes = Config.exitRoutes

const TabBarLabel: React.FC<{focused: boolean; label: string}> = ({
  focused,
  label,
}) => {
  const color = focused ? commonColors.black : palette.textGray;

  return (
    <CommonFont
      color={color}
      size="10px"
      weight="700"
      style={{letterSpacing: -0.24}}>
      {label}
    </CommonFont>
  );
};

export type AppStackScreenProps<T extends keyof HomeTabParamList> =
  BottomTabScreenProps<HomeTabParamList, T>;
const Tab = createBottomTabNavigator<HomeTabParamList>();

export const BOTTOM_TAB_HEIGHT = 56;
export default function HomeTabs() {
  const insets = useSafeAreaInsets();

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          height: BOTTOM_TAB_HEIGHT + insets.bottom,
          backgroundColor: theme.palette.common.white,
          paddingVertical: 6,
        },
      }}>
      <Tab.Screen
        name="Home"
        component={Screens.HomeScreen}
        options={{
          tabBarIcon({focused}) {
            const icon = focused ? homeActive : homeInactive;
            return <SvgXml xml={icon} />;
          },
          tabBarLabel: p => <TabBarLabel {...p} label="Home" />,
        }}
      />
      <Tab.Screen
        name="Search"
        component={Screens.SearchScreen}
        options={{
          tabBarIcon({focused}) {
            const icon = focused ? searchActive : searchInactive;
            return <SvgXml xml={icon} />;
          },
          tabBarLabel: p => <TabBarLabel {...p} label="Search" />,
        }}
      />
      {/* <Tab.Screen name="Notification" component={Screens.NotificationsScreen} /> */}
      {/* <Tab.Screen name="Profile" component={Screens.ProfileScreen} /> */}
    </Tab.Navigator>
  );
}
