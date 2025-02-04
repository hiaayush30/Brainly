import React from 'react'
import { IconProps } from '.'

const CloseIcon = (props:IconProps) => {
  return (
    <svg width={props.width} height={props.height} xmlns="http://www.w3.org/2000/svg" fill={props.color} viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className={props.className}>
  <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
</svg>

  )
}

export default CloseIcon
