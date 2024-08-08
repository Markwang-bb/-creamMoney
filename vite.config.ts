import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import Unocss from 'unocss/vite'
import { viteMockServe } from 'vite-plugin-mock'
import { svgsprites } from './vite_plugins/svgsprites'

// https://vitejs.dev/config/
export default defineConfig(({ command }) => {
  const isBuild = command === 'build'
  return {
    define:{
      isDev:command === 'serve'
    },
    plugins: [
      Unocss(),
      react(),
      viteMockServe({
        mockEnabled: !isBuild // 根据 `isBuild` 配置 mockServe
      }),
      svgsprites()
    ]
  }
})
