import type { App } from 'vue'
import { create, NButton, NSwitch } from 'naive-ui'
export function injectNaiveui(App: App<Element>): App<Element> {
  const naive = create({
    components: [NButton, NSwitch]
  })
  return App.use(naive)
}
