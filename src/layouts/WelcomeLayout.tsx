import { animated, useTransition } from '@react-spring/web'
import type { ReactNode } from 'react'
import { useEffect, useRef,useState } from 'react'
import { useLocation, useOutlet,useNavigate } from 'react-router-dom'
import logo from '../assets/images/logo.svg'
import { useSwipe } from '../hooks/useSwipe'
import { useLocalStore } from '../stores/useLocalStore'

const linkMap:Record<string,string> = {
  '/welcome/1': '/welcome/2',
  '/welcome/2': '/welcome/3',
  '/welcome/3': '/welcome/4',
  '/welcome/4': '/home',
} as const  // 使用 `as const` 使 `linkMap` 变为只读

export const WelcomeLayout: React.FC = () => {
  const animating = useRef(false)
  const map = useRef<Record<string, ReactNode>>({})
  const location = useLocation()
  const currentPath = location.pathname

  // 类型保护，确保 currentPath 是 linkMap 的一个有效键
  if (!(currentPath in linkMap)) {
    return <div>无效路径</div>
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const link = linkMap[currentPath]  // `link` 的类型现在是 `string`
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const outlet = useOutlet()
  map.current[currentPath] = outlet
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [extraStyle, setExtraStyle] = useState<{ position: 'relative' | 'absolute' }>({ position: 'relative' })
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const transitions = useTransition(currentPath, {
    from: { transform: currentPath === '/welcome/1' ? 'translateX(0%)' : 'translateX(100%)' },
    enter: { transform: 'translateX(0%)' },
    leave: { transform: 'translateX(-100%)' },
    config: { duration: 300 },
    onStart: () => {
      setExtraStyle({ position: 'absolute' })
    },
    onRest: () => {
      animating.current = false
      setExtraStyle({ position: 'relative' })
    }
  })
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const main = useRef<HTMLElement>(null)
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { direction } = useSwipe(main)
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const nav = useNavigate()
  // eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect(() => {
    if (direction === 'left') {
      if (animating.current) { return }
      animating.current = true
      nav(linkMap[location.pathname])
    }
  }, [direction, location.pathname, linkMap])
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { setHasReadWelcomes } = useLocalStore()
  const onSkip = ()=>{
    setHasReadWelcomes(true)
    nav('/home')
  }

  return (
    <div className='bg-#5f34bf' h-screen flex flex-col items-stretch pb-16px>
      <span fixed text-white top-16px right-16px text-32px onClick={onSkip}>跳过</span>
      <header shrink-0 text-center pt-64px>
        <img src={logo} w-64px h-69px / >
        <h1 text="#D4D4EE" text-32px>奶油记账</h1>
      </header>
      <main shrink-1 grow-1  relative ref={main}>
        {transitions((style, pathname) =>
          <animated.div key={pathname} style={{ ...style, ...extraStyle }} w="100%" h="100%" p-16px flex>
          <div grow-1 bg-white flex justify-center items-center rounded-8px>
            {map.current[pathname]}
          </div>
        </animated.div>
        )}
      </main>
    </div>
  )
}
