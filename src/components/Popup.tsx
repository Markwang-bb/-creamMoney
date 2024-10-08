import { animated, useSpring } from '@react-spring/web'
import type { ReactNode } from 'react'
import { useState } from 'react'

type Props = {
  visible: boolean
  onClickMask?: () => void
  children?: ReactNode
  position?: 'bottom' | 'center'
}
export const Popup: React.FC<Props> = (props) => {
  const { visible, onClickMask, children, position = 'bottom' } = props
  const [maskVisible, setMaskVisible] = useState(visible)
  const maskStyles = useSpring({
    opacity: visible ? 1 : 0,
    onStart: ({ value }) => {
      if (value.opacity < 0.1) { setMaskVisible(true) }
    },
    onRest: ({ value }) => {
      if (value.opacity < 0.1) { setMaskVisible(false) }
    }
  })
  const maskStyles2 = {
    ...maskStyles,
    visibility: (maskVisible ? 'visible' : 'hidden') as 'visible' | 'hidden'
  } // workaround
  const wrapperStyles = useSpring({
    opacity: visible ? 1 : 0,
    transform: position === 'bottom'
      ? (visible ? 'translateY(0%)' : 'translateY(100%)')
      : '',
  })
  return (
    <div touch-none>
      <animated.div fixed top-0 left-0 h-full w-full className="bg-black:75"
        z="[calc(var(--z-popup)-1)]" onClick={() => onClickMask?.()}
        style={maskStyles2} />
      {position === 'bottom'
        ? (
          <animated.div fixed bottom-0 left-0 w-full min-h-100px bg-white
            z="[calc(var(--z-popup))]"
            style={wrapperStyles} rounded-t-8px overflow-hidden>
            {children}
          </animated.div>
        )
        : (
          <animated.div fixed bg-white left="[50%]" top="[50%]"
            translate-x="-50%" translate-y="-50%"
            z="[calc(var(--z-popup))]"
            style={wrapperStyles} rounded-8px overflow-hidden>
            {children}
          </animated.div>
        )
      }
    </div>
  )
}
