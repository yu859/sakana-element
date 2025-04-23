import { each } from 'lodash-es'; // lodash-es 是一个模块化的 lodash，它只包含一些常用的方法，而不是全部方法
import type { App, Plugin } from 'vue'; // vue 是一个模块化的 vue，它只包含一些常用的方法，而不是全部方法
import {
  provideGlobalConfig,
  type ConfigProviderProps,
} from '@sakana-element/components';

export function makeInstaller(components: Plugin[]) {
  // makeInstaller 是一个函数，它接收一个数组 components，components 的每一项都是一个 Plugin，为了让 components 具有 install 方法，我们需要将 components 转换为 Plugin 类型
  const installer = (app: App, opts?: ConfigProviderProps) => {
    // install 是一个函数，它接收一个 App
    each(components, (c) => app.use(c));
    // each 是 lodash-es 提供的方法，它接收一个数组 components 和一个函数，函数的参数是 components 的每一项
    // app.use 是 vue 提供的方法，它接收一个 Plugin
    if (opts) provideGlobalConfig(opts, app, true);
  };

  return installer as Plugin;
}

export default makeInstaller;
