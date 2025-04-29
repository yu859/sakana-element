import type { App, Plugin } from 'vue'; // vue 是一个模块化的 vue，它只包含一些常用的方法，而不是全部方法

type SFCWithInstall<T> = T & Plugin; // SFCWithInstall<T> 是一个类型，它是 T 和 Plugin 的交集,T 必须是一个对象，Plugin 是一个函数

export const withInstall = <T>(component: T) => {
  // withInstall 是一个函数，它接收一个对象 component,为了让 component 具有 install 方法，我们需要将 component 转换为 SFCWithInstall<T> 类型
  //install就是一个方法，用来在 Vue 应用中注册组件
  (component as SFCWithInstall<T>).install = (app: App) => {
    // component as SFCWithInstall<T> 是一个类型断言，它将 component 转换为 SFCWithInstall<T> 类型
    //简单来说就是内部注册组件
    const name = (component as any).name; // component as any 是一个类型断言，它将 component 转换为 any 类型
    app.component(name, component as Plugin); // app.component 是 vue 提供的方法，它接收一个字符串和一个对象，将对象注册为全局组件
  };
  return component as SFCWithInstall<T>;
};

export const withInstallFunction = <T>(fn: T, name: string) => {
  (fn as SFCWithInstall<T>).install = (app: App) => {
    app.config.globalProperties[name] = fn; //这样注册后，可以在任何组件中通过 this[name] 访问该函数
  };
  return fn as SFCWithInstall<T>;
};
