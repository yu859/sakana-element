import type { Directive, DirectiveBinding, MaybeRef } from 'vue';
//Directive 自定义指令的类型, DirectiveBinding 指令绑定对象的类型，包含 value、oldValue、modifiers 等属性,MaybeRef表示可能是响应式引用（ref）或普通值的类型
import type { LoadingOptions } from './types';
import { Loading, type LoadingInstance } from './service';

//INSTANCE_KEY 是一个 Symbol 类型的常量，用于在元素上存储 loading 实例和选项。
const INSTANCE_KEY = Symbol('loading');
export interface ElementLoading extends HTMLElement {
  //[] 表示元素的属性，INSTANCE_KEY 是一个 Symbol 类型的常量，用于在元素上存储 loading 实例和选项。
  [INSTANCE_KEY]?: {
    instance: LoadingInstance;
    options: LoadingOptions;
  };
}

function createInstance(
  el: ElementLoading,
  binding: DirectiveBinding<boolean>
) {
  const getProp = <K extends keyof LoadingOptions>(name: K) =>
    el.getAttribute(`er-loading-${name}`) as MaybeRef<string>;
  const getModifier = <K extends keyof LoadingOptions>(name: K) =>
    binding.modifiers[name];

  const fullscreen = getModifier('fullscreen');
  const options: LoadingOptions = {
    text: getProp('text'),
    spinner: getProp('spinner'),
    background: getProp('background'),
    target: fullscreen ? void 0 : el,
    body: getModifier('body'),
    lock: getModifier('lock'),
    fullscreen,
  };

  el[INSTANCE_KEY] = {
    options,
    instance: Loading(options),
  };
}

//vLoading 是一个自定义指令，用于在 Vue 组件中实现加载状态的显示和隐藏。
//ElementLoading 是一个扩展了 HTMLElement 的类型，添加了 loading 实例和选项的属性。
//Directive<ElementLoading, boolean> 表示这个指令的类型，其中 ElementLoading 是元素的类型，boolean 是指令的值类型。绑定在元素上，值为boolean类型
export const vLoading: Directive<ElementLoading, boolean> = {
  //自定义指令的钩子函数，el是元素，binding是指令的值
  //里面是生命周期函数，el是元素，binding是指令的值
  //mounted 是挂载时执行的函数，el是元素，binding是指令的值
  mounted(el, binding) {
    if (binding.value) createInstance(el, binding);
  },
  //updated 是更新时执行的函数，el是元素，binding是指令的值
  updated(el, binding) {
    if (binding.oldValue === binding.value) return;

    if (binding.value && !binding.oldValue) {
      createInstance(el, binding);
      return;
    }
    el[INSTANCE_KEY]?.instance.close();
  },
  //unmounted 是卸载时执行的函数，el是元素
  unmounted(el) {
    el[INSTANCE_KEY]?.instance.close();
    el[INSTANCE_KEY] = void 0;
  },
};
