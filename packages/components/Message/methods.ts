import { isVNode, render, h, shallowReactive } from 'vue'; //h是创建虚拟节点，render是渲染函数，shallowReactive是浅响应式
import type {
  CreateMessageProps,
  MessageInstance,
  MessageFn,
  Message,
  MessageParams,
  MessageProps,
  MessageHandler,
  MessageType,
} from './types';
import { messageTypes } from './types';
import { isString, findIndex, set, each } from 'lodash-es';
import MessageConstructor from './Message.vue';

let seed = 0;

//ref是对基本和复杂类型不管什么变化都响应，shallowRef是全部变化才响应，reactive是对复杂类型不管什么变化都响应，shallowReactive是只有最外层复杂类型变化才响应
//ref可以基本和复杂类型响应式，reactive是复杂深响应式，shallowReactive是复杂浅响应式
//MessageInstance[]是MessageInstance类型的数组，shallowReactive是浅响应式，shallowReactive([])是创建一个浅响应式的空数组
const instances: MessageInstance[] = shallowReactive([]);

export const messageDefaults = {
  type: 'info',
  duration: 3000,
  offset: 10,
  transitionName: 'fade-up',
};

//opts是MessageParams类型，MessageParams是string | VNode | MessageOptions，返回值是CreateMessageProps类型
const normalizedOptions = (opts: MessageParams): CreateMessageProps => {
  //result意思是opts如果为空，或者opts是VNode，或者opts是string，则result为{message:opts}，否则result为opts
  const result =
    !opts || isVNode(opts) || isString(opts)
      ? {
          message: opts,
        }
      : opts;
  return { ...messageDefaults, ...result } as CreateMessageProps; //解构赋值，将messageDefaults和result的属性合并到一起
};

const createMessage = (props: CreateMessageProps): MessageInstance => {
  const id = `message_${seed++}`;
  const container = document.createElement('div'); //创建div作为消息的容器

  //销毁实例的函数
  const destory = () => {
    const idx = findIndex(instances, { id }); //找与当前 id 匹配的消息实例在 instances 数组中的索引
    if (idx === -1) return; //如果找不到，则返回

    instances.splice(idx, 1); //从 instances 数组中删除该消息实例
    //render是渲染函数，将null渲染到container中，即销毁消息实例
    render(null, container); //销毁消息实例
  };

  const _props: MessageProps = {
    ...props,
    id,
    zIndex: 200,
    onDestory: destory,
  };
  const vnode = h(MessageConstructor, _props); //创建虚拟节点，将_props作为props传递给MessageConstructor

  render(vnode, container); //渲染虚拟节点到容器中

  document.body.appendChild(container.firstElementChild!); //将容器中的第一个元素添加到body中，主要是为了少一个div，因为container本身有div，相当于少一层div

  const vm = vnode.component!; //获取虚拟节点的组件实例，！表示一定有组件实例
  const handler: MessageHandler = {
    close: () => vm.exposed!.close(),
  };
  const instance: MessageInstance = {
    props: _props,
    id,
    vm,
    vnode,
    handler,
  };
  instances.push(instance);

  return instance;
};

export const message: MessageFn & Partial<Message> = (options = {}) => {
  const normalized = normalizedOptions(options);
  const instance = createMessage(normalized);

  return instance.handler;
};

//关闭所有消息
export function closeAll(type?: MessageType) {
  each(instances, (instance) => {
    if (type) {
      instance.props.type === type && instance.handler.close(); //如果实例的props的type与type相同，则关闭实例
      return;
    }
    instance.handler.close(); //关闭实例
  });
}

each(messageTypes, (type) => {
  set(message, type, (opts: MessageParams) => {
    const normalized = normalizedOptions(opts);
    return message({ ...normalized, type });
  });
});

message.closeAll = closeAll;

export default message as Message;
