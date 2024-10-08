import {
  defineConfig, presetAttributify, presetIcons,
  presetTypography, presetUno, transformerAttributifyJsx
} from 'unocss'

export default defineConfig({
  theme: {
  },
  shortcuts: {
    'n-btn': 'h-48px w-100% bg-#5C33BE b-none text-white text-18px rounded-8px',
    'n-input-text': 'h-48px px-16px leading-32px py-8px b-#5C33BE b-1 focus:shadow focus:shadow-inset rounded-8px text-18px',
    'n-form': 'px-16px flex flex-col gap-y-24px children-flex children-flex-col',
    'n-form-label': 'text-18px mb-8px',
  },
  safelist: [],
  rules: [
    ['h-screen', { height: 'calc(100vh - var(--vh-offset, 0px))' }]
  ],
  presets: [
    presetUno(),
    presetAttributify(),
    presetIcons({
      extraProperties: { 'display': 'inline-block', 'vertical-align': 'middle' },
    }),
    presetTypography(),
  ],
  transformers: [
    transformerAttributifyJsx()
  ],
})
