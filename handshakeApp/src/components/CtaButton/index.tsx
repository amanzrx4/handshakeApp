import React, {ReactNode} from 'react';
import {Bold, H3} from '../../lib/styles/common';
import theme, {colorWithOpacity} from '../../lib/styles/theme';
import {StyledButton, StyledRoundCtaButton} from './styles';
import {ActivityIndicator, PressableProps} from 'react-native';

const black30 = colorWithOpacity(theme.palette.common.black, 0.3);
interface Props extends PressableProps {
  onPress: () => void;
  backgroundColor?: string;
  text?: string;
  textColor?: string;
  width?: string;
  height?: string;
  isDisabled?: boolean;
  loading?: boolean;
}

const CtaButton: React.FC<Props> = ({
  onPress,
  text,
  backgroundColor,
  textColor,
  width,
  isDisabled,
  loading,
  children,
  ...rest
}) => {
  return (
    <StyledButton
      {...rest}
      android_ripple={{
        color: theme.palette.common.white,
      }}
      onPress={onPress}
      backgroundColor={backgroundColor}
      width={width}
      disabled={isDisabled}>
      {loading && (
        <ActivityIndicator size="small" color={theme.palette.common.white} />
      )}

      {(children as ReactNode) ?? (
        <H3
          color={isDisabled ? black30 : textColor ?? theme.palette.common.white}
          weight="700">
          <Bold>{text}</Bold>
        </H3>
      )}
    </StyledButton>
  );
};

const RoundCtaButton: React.FC<Props> = ({
  onPress,
  text,
  backgroundColor,
  textColor,
  width,
  height,
  isDisabled,
  loading,
}) => {
  return (
    <StyledRoundCtaButton
      android_ripple={{
        color: theme.palette.common.white,
      }}
      onPress={onPress}
      backgroundColor={backgroundColor}
      width={width}
      height={height}
      disabled={isDisabled}>
      {loading && (
        <ActivityIndicator size="small" color={theme.palette.common.white} />
      )}

      <H3 color={textColor ?? theme.palette.common.white}>
        <Bold>{text}</Bold>
      </H3>
    </StyledRoundCtaButton>
  );
};

export {CtaButton, RoundCtaButton};
