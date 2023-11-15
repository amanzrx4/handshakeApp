import React from 'react';
import {Pressable} from 'react-native';
import {SvgXml} from 'react-native-svg';
import theme from '../../lib/styles/theme';
import {backIconXml} from '../../assets/svg';

interface Props {
  onPress: () => void;
}

const BackButton: React.FC<Props> = ({onPress}) => {
  return (
    <Pressable
      onPress={onPress}
      android_ripple={{
        color: theme.palette.common.gray4,
        borderless: true,
      }}>
      <SvgXml xml={backIconXml} />
    </Pressable>
  );
};

export default BackButton;
