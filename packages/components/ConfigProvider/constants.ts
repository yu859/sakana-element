import type { ConfigProviderProps } from './types';
import type { InjectionKey, Ref } from 'vue';

export type ConfigProviderContext = Partial<ConfigProviderProps>;
//Partial表示ConfigProviderContext类型是ConfigProviderProps类型的子集，即ConfigProviderContext类型可以包含ConfigProviderProps类型中的任意属性，也可以不包含任何属性

export const configProviderContextKey: InjectionKey<
  Ref<ConfigProviderContext>
> = Symbol();
//Symbol() 创建一个唯一的标识符，用于在组件中注入和获取配置提供者的上下文
