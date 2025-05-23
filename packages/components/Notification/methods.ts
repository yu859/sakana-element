import { shallowReactive, isVNode, render, h } from 'vue';
import type {
  CreateNotificationProps,
  NotificationFn,
  NotificationHandler,
  NotificationInstance,
  NotificationParams,
  NotificationProps,
  NotificationType,
} from './types';
import { notificationTypes, notificationPosition } from './types';
import { useId, useZIndex } from '@sakana-element/hooks';
import { isString, findIndex, set, each, get } from 'lodash-es';
import NotificationConstructor from './Notification.vue';

// instances是NotificationInstance的数组类型,shallowReactive是浅响应式,shallowReactive会监听数组的变化,但是不会监听数组中的对象的变化
// ref是响应式,任何变化都响应，shallowRef是浅响应式整体变化才响应
// const instances: NotificationInstance[] = shallowReactive([]);
//instancesMap是NotificationInstance的数组类型里面的值只能是position的值
const instancesMap: Map<NotificationProps['position'], NotificationInstance[]> =
  new Map();

//遍历notificationPosition,将position作为key,shallowReactive([])作为value,存入instancesMap
each(notificationPosition, (position) => {
  instancesMap.set(position, shallowReactive([]));
});
const { nextZIndex } = useZIndex();

export const notificationDefaults = {
  type: 'info',
  duration: 3000,
  offset: 20,
  transitionName: 'fade',
  showClose: true,
} as const;

const normalizedOptions = (
  opts: NotificationParams
): CreateNotificationProps => {
  const result =
    !opts || isVNode(opts) || isString(opts) ? { message: opts } : opts;
  return { ...notificationDefaults, ...result } as CreateNotificationProps;
};

const getInstancesByPosition = (
  position: NotificationProps['position']
): NotificationInstance[] => instancesMap.get(position)!;

const createNotification = (
  props: CreateNotificationProps
): NotificationInstance => {
  const id = useId().value;
  const container = document.createElement('div');
  const instances = getInstancesByPosition(props.position || 'top-right');

  const destory = () => {
    const idx = findIndex(instances, { id });
    if (idx === -1) return;

    instances.splice(idx, 1);
    render(null, container);
  };

  const _props: NotificationProps = {
    ...props,
    id,
    zIndex: nextZIndex(),
    onDestory: destory,
  };
  const vnode = h(NotificationConstructor, _props);

  //render函数是渲染vnode,并将其挂载到container上
  render(vnode, container);
  document.body.appendChild(container.firstElementChild!);

  const vm = vnode.component!;
  const handler: NotificationHandler = {
    close: () => vm.exposed!.close(),
  };
  const instance: NotificationInstance = {
    props: _props,
    id,
    vm,
    vnode,
    handler,
  };
  instances.push(instance);
  return instance;
};

export const notification: NotificationFn & Partial<Notification> = function (
  options = {}
) {
  const normalized = normalizedOptions(options);
  const instance = createNotification(normalized);

  return instance.handler;
};

export function closeAll(type?: NotificationType) {
  //each函数是遍历instances数组,并执行instance.handler.close()
  instancesMap.forEach((instances) => {
    each(instances, (instance) => {
      if (type) {
        instance.props.type === type && instance.handler.close();
        return;
      }
      instance.handler.close();
    });
  });
}

//获取最后一个bottomOffset
export function getLastBottomOffset(this: NotificationProps) {
  const instances = getInstancesByPosition(this.position || 'top-right');
  const idx = findIndex(instances, { id: this.id });

  if (idx <= 0) return 0;

  return get(instances, [idx - 1, 'vm', 'exposed', 'bottomOffset', 'value']);
}

each(notificationTypes, (type) => {
  //set函数是设置notification的type属性,type属性是notification的类型
  set(notification, type, (opts: NotificationParams) => {
    const normalized = normalizedOptions(opts);
    return notification({ ...normalized, type });
  });
});
notification.closeAll = closeAll;

export default notification as Notification;
