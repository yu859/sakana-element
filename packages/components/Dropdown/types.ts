import type { VNode, ComputedRef } from 'vue'; //VNode 是 Vue 的虚拟节点类型允许使用h函数,ComputedRef 是 Vue 的计算属性类型，表示是计算属性而且可以定义类型
import type { TooltipProps } from '../Tooltip/types';
import type { ButtonType, ButtonSize } from '../Button/types';

export type DropdownCommand = string | number;

export interface DropdownItemProps {
  command?: DropdownCommand; //命令
  label: string | VNode; //VNode 是 Vue 的虚拟节点类型允许使用h函数，label是显示的文本
  disabled?: boolean; //禁用
  divided?: boolean; //分割线
}

export interface DropdownProps extends TooltipProps {
  type?: ButtonType;
  size?: ButtonSize;
  items?: DropdownItemProps[];
  hideOnClick?: boolean;
  splitButton?: boolean;
}

export interface DropdownEmits {
  //定义事件
  (e: 'visible-change', value: boolean): void;
  (e: 'command', value: DropdownCommand): void;
  (e: 'click', value: MouseEvent): void;
}

export interface DropdownInstance {
  //定义方法
  open(): void;
  close(): void;
}

export interface DropdownContext {
  handleItemClick(item: DropdownItemProps): void;
  size: ComputedRef<ButtonSize | void>;
}
