import {GrayContainer, InfoContainer} from '@app/components/CardButton/styles';
import {H5} from '@app/lib/styles/common';
import theme from '@app/lib/styles/theme';
import React from 'react';
import IconButton from '../IconButton';
import {FlexStyle, ViewProps} from 'react-native';
import {SvgXml} from 'react-native-svg';

interface Props extends ViewProps {
  onPress: () => void;
  iconXml: string;
  title: string;
  flexDirection?: FlexStyle['flexDirection'];
  gap?: FlexStyle['gap'];
  alignItems?: FlexStyle['alignItems'];
  justifyContent?: FlexStyle['justifyContent'];
}

const CardButton: React.FC<Props> = ({onPress, iconXml, title, ...rest}) => {
  return (
    <GrayContainer {...rest} onPress={onPress}>
      <SvgXml xml={iconXml} />
      <InfoContainer>
        <H5 color={theme.palette.common.blue}>{title}</H5>
      </InfoContainer>
    </GrayContainer>
  );
};

export default CardButton;
