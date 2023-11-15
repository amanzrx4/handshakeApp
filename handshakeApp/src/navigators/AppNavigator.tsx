/**
 * The app navigator (formerly "AppNavigator" and "MainNavigator") is used for the primary
 * navigation flows of your app.
 * Generally speaking, it will contain an auth flow (registration, login, forgot password)
 * and a "main" flow which the user will use once logged in.
 */
import {
  DarkTheme,
  DefaultTheme,
  NavigationContainer,
  NavigatorScreenParams,
} from '@react-navigation/native';
import {
  NativeStackScreenProps,
  createNativeStackNavigator,
} from '@react-navigation/native-stack';
import React from 'react';
import {useColorScheme} from 'react-native';
import * as Screens from '../screens';
// import Config from '../config';
// import {navigationRef} from './navigationUtilities';
// import {colors} from 'app/theme';
import {UserContextProvider, useUserContext} from '@app/contexts/UserContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {HandshakeType} from '../types';
import HomeTabs, {HomeTabParamList} from './HomeTabNavigator';
// import {HandshakeType} from 'app/types';

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
export type AppStackParamList = {
  Welcome: undefined;
  HomeTabs: NavigatorScreenParams<HomeTabParamList>;
  // Search: undefined;
  // Notifications: undefined
  // Profile: undefined
  HandshakeInit: {handshakeType: HandshakeType};
  ProofsSelect: undefined;
  ReceipientSelect: undefined;
  Chat: {conversationSid: string};
  ReceipientSearch: undefined;
  UserProfile: undefined;
  UsernameCreate: undefined;
  PasswordCreate: {username: string};
};

/**
 * This is a list of all the route names that will exit the app if the back button
 * is pressed while in that screen. Only affects Android.
 */
// const exitRoutes = Config.exitRoutes;

export type AppStackScreenProps<T extends keyof AppStackParamList> =
  NativeStackScreenProps<AppStackParamList, T>;

const getStorage = async () => {
  const t = await AsyncStorage.getAllKeys();

  console.log('storage', await AsyncStorage.getItem(t[0]));
};
// Documentation: https://reactnavigation.org/docs/stack-navigator/
export const Stack = createNativeStackNavigator<AppStackParamList>();

export const USER_MUTATION_KEY = 'user';

export const AppStack = () => {
  const {currentUser} = useUserContext();

  console.log('current user', currentUser);
  // getStorage().then(c => console.log('storage', c));
  // const {data} = trpc.user.login.useMutation({
  //   mutationKey: [USER_MUTATION_KEY],
  // });

  // console.log('data here brooooo', data);
  // const [user, setUser] = React.useState<any>(null);

  // useEffect(() => {
  //   console.log('fetching user');
  //   const getUser = async () => {
  //     const user = await AsyncStorage.getItem('user');
  //     setUser(JSON.parse(user));
  //   };

  //   getUser();
  // }, []);
  // const {data: user} = trpc.user.login.useMutation();

  // console.log('user', error, user);
  // console.log('storage', getStorage());

  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      {!currentUser ? (
        <Stack.Group>
          <Stack.Screen
            name="UsernameCreate"
            component={Screens.UsernameCreate}
          />
          <Stack.Screen
            name="PasswordCreate"
            component={Screens.PasswordCreate}
          />
        </Stack.Group>
      ) : (
        <Stack.Group>
          <Stack.Screen name="HomeTabs" component={HomeTabs} />
          <Stack.Screen
            initialParams={{
              handshakeType: HandshakeType.Dating,
            }}
            name="HandshakeInit"
            component={Screens.HandshakeInitScreen}
          />
          <Stack.Screen
            name="ProofsSelect"
            component={Screens.ProofsSelectScreen}
          />
          <Stack.Screen
            name="ReceipientSelect"
            component={Screens.ReceipientSelectScreen}
          />
          <Stack.Screen
            name="ReceipientSearch"
            component={Screens.ReceipientSearchScreen}
          />
          <Stack.Screen
            name="UserProfile"
            component={Screens.UserProfileScreen}
          />
          <Stack.Screen name="Chat" component={Screens.ChatScreen} />
        </Stack.Group>
      )}
    </Stack.Navigator>
  );
};

export interface NavigationProps
  extends Partial<React.ComponentProps<typeof NavigationContainer>> {}

export const AppNavigator = (props: NavigationProps) => {
  // const colorScheme = useColorScheme();

  // useBackButtonHandler(routeName => exitRoutes.includes(routeName));

  return (
    <SafeAreaProvider>
      <NavigationContainer
        // ref={navigationRef}
        // theme={colorScheme === 'dark' ? DarkTheme : DefaultTheme}
        {...props}>
        <UserContextProvider>
          <AppStack />
        </UserContextProvider>
      </NavigationContainer>
    </SafeAreaProvider>
  );
};
