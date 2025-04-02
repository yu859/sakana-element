import type { InjectionKey } from 'vue';
import type { CollapseContext } from './types';

export const COLLAPSE_CTX_KEY: InjectionKey<CollapseContext> =
  Symbol('collapseContext');
// 创建一个唯一的符号，用于在组件中注入和获取上下文
