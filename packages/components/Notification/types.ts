import type { VNode, Ref, ComponentInternalInstance } from 'vue';

//样式类型
export const notificationTypes = [
  'info',
  'success',
  'warning',
  'danger',
] as const;
//表示属于notificationTypes的类型中的一个,number是索引
export type NotificationType = (typeof notificationTypes)[number];

//位置类型
export const notificationPosition = [
  'top-right',
  'top-left',
  'bottom-right',
  'bottom-left',
] as const;
export type NotificationPosition = (typeof notificationPosition)[number];

//通知组件的props
export interface NotificationProps {
  title: string;
  id: string;
  zIndex: number;
  position: NotificationPosition;
  type?: 'success' | 'info' | 'warning' | 'danger' | 'error';
  message?: string | VNode;
  duration?: number;
  showClose?: boolean;
  offset?: number;
  transitionName?: string;
  icon?: string;
  onClick?(): void;
  onClose?(): void;
  onDestory(): void;
}
export interface NotificationInstance {
  id: string;
  vnode: VNode;
  vm: ComponentInternalInstance;
  props: NotificationProps;
  handler: NotificationHandler;
}

export interface NotificationCompInstance {
  close(): void;
  bottomOffset: Ref<number>;
}

export type CreateNotificationProps = Omit<
  NotificationProps,
  'onDestory' | 'id' | 'zIndex'
>;

export interface NotificationHandler {
  close(): void;
}

export type NotificationOptions = Partial<Omit<NotificationProps, 'id'>>;
export type NotificationParams = string | VNode | NotificationOptions;

export type NotificationFn = {
  (props: NotificationParams): NotificationHandler;
  closeAll(type?: NotificationType): void;
};

export type NotificationTypeFn = (
  props: NotificationParams
) => NotificationHandler;

export interface Notification extends NotificationFn {
  success: NotificationTypeFn;
  warning: NotificationTypeFn;
  info: NotificationTypeFn;
  danger: NotificationTypeFn;
}
