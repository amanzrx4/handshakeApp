import { flexRow } from '@app/lib/styles/common'
import styled from 'styled-components/native'

export const Container = styled.Pressable`
  ${flexRow};
  gap: 16px;
  padding-vertical: 12px;
`

export const ItemLeft = styled.View``

export const ItemRight = styled.View``

export const ItemMiddle = styled.View`
  flex-grow: 1;
`
