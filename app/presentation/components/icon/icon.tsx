import * as React from "react"
import { View, ImageStyle } from "react-native"
import { isObject } from "validate.js"
import { getHeightSize } from "~/application/common/utils/responsivity"
import { AutoImage as Image } from "../auto-image/auto-image"
import { IconProps } from "./icon.props"
import { icons } from "./icons"

const ROOT: ImageStyle = {
  resizeMode: "contain",
}

export function Icon(props: IconProps) {
  const { style: styleOverride, icon, containerStyle, size } = props

  const isSvg = React.useMemo(() => isObject(icons[icon]), [props])

  const SvgIcon = icons[icon]

  return (
    <View style={containerStyle}>
      {isSvg ? <SvgIcon style={[ROOT, styleOverride]} width={size || getHeightSize(25)} /> : <Image style={[ROOT, styleOverride]} source={icons[icon]} />}
    </View>
  )
}
