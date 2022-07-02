// @ts-ignore
import { addParameters, configure, addDecorator } from '@storybook/react'
import { create } from '@storybook/theming'
import theme from './theme'

// import global css
import 'semantic-ui-css/semantic.min.css'
import 'balloon-css/balloon.min.css'
import '../src/themes/base-theme.css'
import '../src/themes/alternative/light-theme.css'

addParameters({
  options: {
    theme: create({
      base: 'light',
      brandTitle: 'UI | Birdezkingdom',
      brandUrl: 'https://birdezkingdom.com',
      brandImage: 'https://birdezkingdom.com/favicon/android-icon-192x192.png'
    })
  }
})

addDecorator(theme)

// automatically import all files ending in *.stories.tsx in /stories
const req = require.context('../src/components', true, /.stories.tsx?$/)

function loadStories() {
  req.keys().forEach(req)
}

configure(loadStories, module)
