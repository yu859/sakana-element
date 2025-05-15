import type { InjectionKey } from 'vue'; //InjectionKey 表示一个唯一的键，用于在 Vue 的依赖注入系统中标识一个上下文
import type { SelectContext } from './types';

//InjectionKey<SelectContext>表示SELECT_CTX_KEY属于InjectionKey类型，且值为SelectContext类型
export const SELECT_CTX_KEY: InjectionKey<SelectContext> =
  Symbol('selectContext');

export const POPPER_OPTIONS: any = {
  modifiers: [
    {
      name: 'offset',
      options: {
        offset: [0, 9],
      },
    },
    {
      name: 'sameWidth',
      enabled: true,
      fn: ({ state }: { state: any }) => {
        state.styles.popper.width = `${state.rects.reference.width}px`;
      },
      phase: 'beforeWrite',
      requires: ['computeStyles'],
    },
  ],
} as const;
