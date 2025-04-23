export { default as en } from './lang/en'; // 导出英文语言包
export { default as ja } from './lang/ja'; // 导出日文语言包
export { default as ko } from './lang/ko'; // 导出韩文语言包
export { default as zhCn } from './lang/zh-cn'; // 导出中文简体语言包
export { default as zhTw } from './lang/zh-tw'; // 导出中文繁体语言包

export type TranslatePair = {
  [key: string]: string | string[] | TranslatePair;
  // 翻译对，键值对，键是字符串，值可以是字符串、字符串数组或翻译对，最后TranslatePair是递归
};

export type Language = {
  name: string; // 语言名称
  el: TranslatePair; // 语言包
};
