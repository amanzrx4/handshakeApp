import React from 'react';
import {ColorValue, Pressable} from 'react-native';
import {SvgXml} from 'react-native-svg';
import theme from '@app/lib/styles/theme';
import {cancelIconXml} from '@app/assets/svg';

interface Props {
  onPress: () => void;
  stroke?: ColorValue;
}

const CancelButton: React.FC<Props> = ({onPress, stroke = 'black'}) => {
  return (
    <Pressable
      onPress={onPress}
      android_ripple={{
        color: theme.palette.common.gray4,
        borderless: true,
      }}>
      <SvgXml stroke={stroke} xml={cancelIconXml} width="24px" height="24px" />
    </Pressable>
  );
};

export default CancelButton;
