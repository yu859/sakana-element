import type { Ref } from 'vue'; //Ref 是一个响应式引用对象，它包装了一个值，使其成为响应式的。当该值发生变化时，依赖它的组件会自动更新。

export type CollapseItemName = string | number; // 定义CollapseItemName类型，可以是字符串或数字

export interface CollapseProps {
  modelValue: CollapseItemName[]; // 定义modelValue类型，是一个包含CollapseItemName的数组
  accordion?: boolean; // 定义accordion类型，是一个布尔值,是否开启手风琴模式
}

export interface CollapseItemProps {
  name: CollapseItemName; // 唯一标识符
  title?: string; // 标题
  disabled?: boolean; // 是否禁用
}

export interface CollapseEmits {
  (e: 'update:modelValue', value: CollapseItemName[]): void; // 调用签名 更新modelValue
  (e: 'change', value: CollapseItemName[]): void; // 调用签名 改变
}

export interface CollapseContext {
  activeNames: Ref<CollapseItemName[]>; // 当前展开的item
  handleItemClick(name: CollapseItemName): void; // 点击item
}
