import type { App } from 'vue'
import {
  create,
  NAvatar,
  NButton,
  NCard,
  NDivider,
  NDrawer,
  NSpace,
  NSwitch,
  NTab,
  NTag,
  NIcon,
  NPopconfirm,
  NProgress,
  NTabs,
  NTabPane,
  NGradientText
} from 'naive-ui'
export function injectNaiveui(App: App<Element>): App<Element> {
  const naive = create({
    components: [
      NButton,
      NSwitch,
      NSpace,
      NAvatar,
      NTag,
      NTab,
      NDrawer,
      NDivider,
      NCard,
      NIcon,
      NPopconfirm,
      NProgress,
      NTabs,
      NTabPane,
      NGradientText
    ]
  })
  return App.use(naive)
}
