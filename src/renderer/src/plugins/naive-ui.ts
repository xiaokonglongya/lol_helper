import type { App } from 'vue'
import { create, NAvatar, NButton, NSpace, NSwitch } from 'naive-ui'
export function injectNaiveui(App: App<Element>): App<Element> {
  const naive = create({
    components: [NButton, NSwitch, NSpace, NAvatar]
  })
  return App.use(naive)
}
