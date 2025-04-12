//@popperjs/core用于处理元素位置计算，Placement是定义出现位置，Options是Popper.js的配置选项
import type { Placement, Options } from '@popperjs/core';

export interface TooltipProps {
  content?: string;
  trigger?: 'hover' | 'click' | 'contextmenu';
  placement?: Placement;
  manual?: boolean;
  disabled?: boolean;
  popperOptions?: Partial<Options>; //可选的Popper.js配置选项
  transition?: string;
  showTimeout?: number;
  hideTimeout?: number;
}

export interface TooltipEmits {
  //定义事件
  (e: 'visible-change', value: boolean): void; //定义visible-change事件，接收2个参数，不返回任何值
  (e: 'click-outside'): void; //定义click-outside事件，不接收任何参数，不返回任何值
}

export interface TooltipInstance {
  //定义直接暴露给用户的方法
  show(): void;
  hide(): void;
}
