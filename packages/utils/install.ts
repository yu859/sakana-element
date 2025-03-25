import type { App, Plugin } from 'vue' // vue 是一个模块化的 vue，它只包含一些常用的方法，而不是全部方法
import { each } from 'lodash-es' // lodash-es 是一个模块化的 lodash，它只包含一些常用的方法，而不是全部方法

type SFCWithInstall<T> = T & Plugin // SFCWithInstall<T> 是一个类型，它是 T 和 Plugin 的交集,T 必须是一个对象，Plugin 是一个函数

export function makeInstaller(components: Plugin[]) {
  // makeInstaller 是一个函数，它接收一个数组 components，components 的每一项都是一个 Plugin，为了让 components 具有 install 方法，我们需要将 components 转换为 Plugin 类型
  const install = (
    app: App // install 是一个函数，它接收一个 App
  ) =>
    each(components, (c) => {
      // each 是 lodash-es 提供的方法，它接收一个数组 components 和一个函数，函数的参数是 components 的每一项
      app.use(c) // app.use 是 vue 提供的方法，它接收一个 Plugin
    })

  return install as Plugin
}

export const withInstall = <T>(component: T) => {
  // withInstall 是一个函数，它接收一个对象 component,为了让 component 具有 install 方法，我们需要将 component 转换为 SFCWithInstall<T> 类型
  ;(component as SFCWithInstall<T>).install = (app: App) => {
    // component as SFCWithInstall<T> 是一个类型断言，它将 component 转换为 SFCWithInstall<T> 类型
    const name = (component as any).name // component as any 是一个类型断言，它将 component 转换为 any 类型
    app.component(name, component as Plugin) // app.component 是 vue 提供的方法，它接收一个字符串和一个对象，将对象注册为全局组件
  }
  return component as SFCWithInstall<T>
}
