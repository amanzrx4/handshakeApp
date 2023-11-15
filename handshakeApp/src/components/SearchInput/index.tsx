import React from 'react';
import {StyleProp, TextInputProps, ViewStyle} from 'react-native';
import {SearchContainer, SearchTextInput} from './styles';
import {colorBlack30} from '@app/lib/styles/common';

interface Props extends TextInputProps {
  placeholder: string;
  leftAdornment?: React.ReactNode;
  rightAdornment?: React.ReactNode;
  paddingVertical?: string;
  paddingHorizontal?: string;
  containerStyle?: StyleProp<ViewStyle>;
}

const SearchInput: React.FC<Props> = ({
  leftAdornment,
  rightAdornment,
  placeholder,
  containerStyle,
  ...rest
}) => {
  return (
    <SearchContainer style={containerStyle} {...rest}>
      {leftAdornment}
      <SearchTextInput
        {...rest}
        placeholderTextColor={colorBlack30}
        placeholder={placeholder}
      />
      {rightAdornment}
    </SearchContainer>
  );
};

export default SearchInput;
