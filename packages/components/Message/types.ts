import type { VNode, ComponentInternalInstance } from 'vue';
//ComponentInternalInstance类型包含了组件实例的所有内部属性和方法，VNode类型代表了虚拟节点

export const messageTypes = [
  'info',
  'success',
  'warning',
  'danger',
  'error',
] as const;
export type MessageType = (typeof messageTypes)[number]; //MessageType是messageTypes数组中的一个元素

export interface MessageHandler {
  close(): void;
}

export type MessageFn = {
  (props: MessageParams): MessageHandler;
  closeAll(type?: MessageType): void;
};

export type MessageTypeFn = (props: MessageParams) => MessageHandler;

export interface Message extends MessageFn {
  success: MessageTypeFn;
  warning: MessageTypeFn;
  info: MessageTypeFn;
  danger: MessageTypeFn;
  error: MessageTypeFn;
}

export interface MessageProps {
  id: string;
  message?: string | VNode;
  duration?: number;
  showClose?: boolean;
  center?: boolean;
  type?: MessageType;
  offset?: number;
  zIndex: number;
  transitionName?: string;
  onDestory(): void;
}

export type MessageOptions = Partial<Omit<MessageProps, 'id'>>;
export type MessageParams = string | VNode | MessageOptions;

export interface MessageInstance {
  id: string;
  vnode: VNode;
  props: MessageProps;
  vm: ComponentInternalInstance;
  handler: MessageHandler;
}

//CreateMessageProps是MessageProps类型，去掉onDestory、id、zIndex属性
export type CreateMessageProps = Omit<
  MessageProps,
  'onDestory' | 'id' | 'zIndex'
>;
