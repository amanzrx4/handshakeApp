import { FlexStyle, Pressable } from 'react-native'
import styled from 'styled-components/native'

export const GrayContainer = styled(Pressable)<{
  flexDirection?: FlexStyle['flexDirection']
  gap?: FlexStyle['gap']
  alignItems?: FlexStyle['alignItems']
  justifyContent?: FlexStyle['justifyContent']
}>`
  background-color: ${(props) => props.theme.palette.common.lightGray};
  padding: 16px;
  border-radius: 12px;
  display: flex;
  flex-direction: ${(props) => props.flexDirection ?? 'column'};
  gap: ${(props) => props.gap ?? 4}px;
  align-items: ${(props) => props.alignItems ?? 'center'};
`

export const InfoContainer = styled.View``
