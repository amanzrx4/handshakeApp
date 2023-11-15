import {H1, colorBlack30} from '../../lib/styles/common';
import theme, {commonColors} from '../../lib/styles/theme';
import {AppStackParamList} from '../../navigators/AppNavigator';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React, {forwardRef, useMemo} from 'react';
import {FlexStyle, Platform, SafeAreaView, View, ViewProps} from 'react-native';
import Animated, {
  Extrapolation,
  interpolate,
  useAnimatedRef,
  useAnimatedStyle,
  useScrollViewOffset,
  withSpring,
} from 'react-native-reanimated';
import {
  Container,
  FooterContainer,
  HeaderContainer,
  HeaderLeftContainer,
  HeaderMiddleContainer,
  HeaderRightContainer,
  TitleContainer,
} from './styles';

const MAX_SCROLL_OFFSET = 5;
interface Props<T extends keyof AppStackParamList> extends ViewProps {
  headerLeft?: React.ReactNode;
  headerMiddle?: React.ReactNode;
  headerRight?: React.ReactNode;
  title?: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
  navigation?: NativeStackScreenProps<AppStackParamList, T>['navigation'];
  unfocused?: boolean;
  backgroundColor?: string;
  flexGrow?: 0 | 1;
  headerOverflow?: FlexStyle['overflow'];
  isShadowScroll?: boolean;
  headerBgColor?: string;
}

const ScreenContainer = forwardRef<View, Props<keyof AppStackParamList>>(
  (
    {
      headerLeft,
      headerMiddle,
      headerRight,
      title,
      children,
      footer,
      unfocused,
      backgroundColor,
      flexGrow = 1,
      headerOverflow,
      isShadowScroll = false,
      headerBgColor = commonColors.white,
    },
    ref,
  ) => {
    const bgColor = backgroundColor ?? theme.palette.common.white;
    // const scrollViewRef = useAnimatedRef<Animated.ScrollView>();
    // const animatedValue = useScrollViewOffset(scrollViewRef);
    const isAndroid = () => Platform.OS === 'android';

    // const headerAnimatedStyle = useAnimatedStyle(() => {
    //   if (!animatedValue) return {};

    //   const animatedValueInput = Math.min(
    //     Math.max(animatedValue.value, 0),
    //     MAX_SCROLL_OFFSET,
    //   );

    //   switch (Platform.OS) {
    //     case 'ios':
    //       return {
    //         shadowOffset: {
    //           width: 0,
    //           height: withSpring(
    //             interpolate(
    //               animatedValueInput,
    //               [0, MAX_SCROLL_OFFSET],
    //               [0, 10],
    //               Extrapolation.CLAMP,
    //             ),
    //           ),
    //         },
    //         shadowRadius: withSpring(
    //           interpolate(
    //             animatedValueInput,
    //             [0, MAX_SCROLL_OFFSET],
    //             [0, 10],
    //             Extrapolation.CLAMP,
    //           ),
    //         ),
    //         shadowOpacity: withSpring(
    //           interpolate(
    //             animatedValueInput,
    //             [0, MAX_SCROLL_OFFSET],
    //             [0, 0.5],
    //             Extrapolation.CLAMP,
    //           ),
    //         ),
    //       };
    //     case 'android':
    //       return {
    //         elevation: withSpring(
    //           interpolate(
    //             animatedValueInput,
    //             [0, MAX_SCROLL_OFFSET],
    //             [0, 20],
    //             Extrapolation.CLAMP,
    //           ),
    //         ),
    //       };
    //     default:
    //       return {};
    //   }
    // });

    const headerStyle = useMemo(
      () =>
        true
          ? // !animatedValue || !isShadowScroll
            {}
          : [
              {
                backgroundColor: headerBgColor,
                marginHorizontal: -16,
                paddingHorizontal: 16,
                shadowColor: isAndroid() ? commonColors.black : colorBlack30,
              },
              {},
            ],
      [isShadowScroll],
    );

    return (
      <SafeAreaView style={{flex: 1, backgroundColor: bgColor}}>
        <Container
          unfocused={unfocused}
          backgroundColor={bgColor}
          // style={{backgroundColor: 'red'}}
          ref={ref}
          overflow={headerOverflow}>
          <HeaderContainer style={[headerStyle, {}]}>
            <HeaderLeftContainer flexGrow={flexGrow}>
              {headerLeft}
            </HeaderLeftContainer>
            <HeaderMiddleContainer>{headerMiddle}</HeaderMiddleContainer>
            <HeaderRightContainer>{headerRight}</HeaderRightContainer>
          </HeaderContainer>

          {title && (
            <TitleContainer>
              <H1>{title}</H1>
            </TitleContainer>
          )}

          {/* {isShadowScroll ? (
            <Animated.ScrollView
              style={{
                marginHorizontal: -16,
                paddingHorizontal: 16,
              }}
              contentContainerStyle={{
                flexGrow: 1,
              }}
              ref={scrollViewRef}>
              {children}
            </Animated.ScrollView>
          ) : (
            <>{children}</>
          )} */}
          {children}

          {footer && <FooterContainer>{footer}</FooterContainer>}
        </Container>
      </SafeAreaView>
    );
  },
);

export default ScreenContainer;
