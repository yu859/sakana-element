import type { Language, TranslatePair } from '@sakana-element/locale';

export interface ConfigProviderProps {
  locale?: Language; // 语言配置
  extendsI18nMsg?: TranslatePair; // 扩展的国际化消息
}
