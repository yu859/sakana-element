import type { MaybeRef } from 'vue';

export interface LoadingOptionsResolved {
  parent?: HTMLElement;
  target?: HTMLElement;
  visible?: MaybeRef<boolean>; //表示可能是响应式布尔值，为了方便接收ref和普通值
  background?: MaybeRef<string>;
  spinner?: MaybeRef<boolean | string>;
  text?: MaybeRef<string>;
  fullscreen?: MaybeRef<boolean>;
  lock?: MaybeRef<boolean>;
  beforeClose?(): boolean;
  closed?(): void;
}

//Partial表示所有属性都是可选的，Omit表示排除parent和target属性，&表示联合类型
export type LoadingOptions = Partial<
  Omit<LoadingOptionsResolved, 'parent' | 'target'> & {
    target: HTMLElement | string;
    body: boolean;
    zIndex?: number;
    onAfterLeave(): void;
  }
>;
