import React from 'react'
import { SvgXml } from 'react-native-svg'
import { IconContainer } from './styles'
import { View } from 'react-native'

interface Props {
  xml: string
  fillColor: string
  strokeColor?: string
  onPress?: () => void
}
const IconButton: React.FC<Props> = ({ xml, fillColor, onPress, strokeColor }) => {
  const Element = onPress ? IconContainer : (View as React.ElementType)

  return (
    <Element onPress={onPress}>
      <SvgXml xml={xml} fill={fillColor} {...(strokeColor && { stroke: strokeColor })} />
    </Element>
  )
}

export default IconButton
