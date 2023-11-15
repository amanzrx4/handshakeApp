import {
  flexColumn,
  flexRow,
  marginBottom,
  paddingLeft,
  paddingRight,
  RightView,
} from '../../lib/styles/common';
import {Dimensions, FlexStyle} from 'react-native';
import Animated from 'react-native-reanimated';
import styled from 'styled-components/native';

const screenHeight = Dimensions.get('screen').height;
const minHeight = 48;
const maxHeight = 56;

const headerHeight = Math.min(
  Math.max(screenHeight * 0.07, minHeight),
  maxHeight,
);

export const Container = styled.View<{
  unfocused?: boolean;
  backgroundColor: string;
  overflow?: FlexStyle['overflow'];
}>`
  ${({unfocused, backgroundColor}) =>
    !unfocused &&
    `
    background-color: ${backgroundColor};

  `}
  ${paddingLeft[0]}
  ${paddingRight[0]}
  height: 100%;
  overflow: ${({overflow}) => overflow ?? 'hidden'};
`;

export const HeaderContainer = styled(Animated.View)`
  ${flexRow}
  gap: 40px;
  height: ${headerHeight}px;
  z-index: 1;
`;

export const HeaderLeftContainer = styled.View<{flexGrow: number}>`
  display: flex;
  flex-direction: row;
  gap: 12px;
  align-items: center;
  flex-basis: 0;
  flex-grow: ${props => props.flexGrow};
`;

export const HeaderMiddleContainer = styled.View`
  display: flex;
  flex-direction: row;
  gap: 12px;
  align-items: center;
`;

export const HeaderRightContainer = styled(RightView)`
  display: flex;
  flex-direction: row;
  gap: 12px;
  align-items: center;
  flex-grow: 1;
  justify-content: flex-end;
  flex-basis: 0;
  text-align: right;
`;

export const TitleContainer = styled.View`
  ${marginBottom[1]}
`;

export const BodyContainer = styled.View``;

export const FooterContainer = styled.View`
  ${flexColumn}
  left: 0;
  right: 0;
  bottom: 0;
  margin-top: auto;
`;
