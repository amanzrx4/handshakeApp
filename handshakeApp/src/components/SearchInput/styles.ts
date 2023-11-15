import {flexRow, font, manropeFont} from '@app/lib/styles/common';
import styled from 'styled-components/native';

export const SearchContainer = styled.View<{
  paddingVertical?: string;
  paddingHorizontal?: string;
}>`
  ${flexRow};
  width: 100%;
  border-radius: 12px;
  background-color: ${({theme}) => theme.palette.common.gray7};
  padding-vertical: ${({paddingVertical}) => paddingVertical ?? '14px'};
  padding-horizontal: ${({paddingHorizontal}) => paddingHorizontal ?? '16px'};
`;

export const SearchTextInput = styled.TextInput`
  flex: 1;
  ${font[3]};
  ${manropeFont};
  font-weight: 500;
  padding-vertical: 0;
`;
