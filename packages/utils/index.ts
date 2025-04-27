import { defineComponent } from 'vue';
import { isFunction } from 'lodash-es';

// 映射图标，用于根据类型获取对应的图标
export const typeIconMap = new Map([
  ['info', 'circle-info'],
  ['success', 'check-circle'],
  ['warning', 'circle-exclamation'],
  ['danger', 'circle-xmark'],
  ['error', 'circle-xmark'],
]);

//定义一个组件，用于渲染vnode
export const RenderVnode = defineComponent({
  //父组件传入一个vnode，然后渲染这个vnode
  props: {
    vNode: {
      type: [String, Object, Function],
      required: true, //必填
    },
  },
  setup(props) {
    //如果props.vNode是一个函数，则调用这个函数，否则直接返回props.vNode
    return () => (isFunction(props.vNode) ? props.vNode() : props.vNode);
  },
});

export * from './install';
export * from './error';
export * from './style';
