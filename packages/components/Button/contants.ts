//存依赖注入的key
import type { InjectionKey } from 'vue'; //导入vue的依赖注入key
import type { ButtonGroupContext } from './types'; //导入按钮组上下文类型

export const BUTTON_GROUP_CTX_KEY: InjectionKey<ButtonGroupContext> = Symbol(
  'BUTTON_GROUP_CTX_KEY'
);
//作用是提供按钮组上下文
