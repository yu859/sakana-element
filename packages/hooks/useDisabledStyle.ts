import { each, isFunction, cloneDeep, assign } from 'lodash-es';
import { watchEffect, useSlots, getCurrentInstance, type VNode } from 'vue'; //watchEffect自动追踪响应式依赖并执行副作用，useSlots访问组件的插槽，getCurrentInstance获取当前组件实例，type VNode表示虚拟节点

const _dfs = (nodes: VNode[], cb: (node: VNode) => void) =>
  //nodes是虚拟节点数组，cb是回调函数，node是当前节点，node.children是子节点
  //each遍历数组，cb是回调函数，node是当前节点，node.children是子节点
  each(nodes, (node) => {
    isFunction(cb) && cb(node); //如果cb是函数，则执行cb(node)，node是当前节点
    node.children && _dfs(node.children as VNode[], cb); //如果node有子节点，则递归遍历子节点
  });

export function useDisabledStyle() {
  const nodePropsMap = new Map();

  const instance = getCurrentInstance();
  const children = useSlots()?.default?.();

  watchEffect(() => {
    if (!instance?.props.disabled) {
      _dfs(children ?? [], (node) => {
        if (!nodePropsMap.has(node)) return;
        node.props = nodePropsMap.get(node);
      });
      return;
    }
    _dfs(children ?? [], (node) => {
      if (!node?.props) return;

      nodePropsMap.set(node, cloneDeep(node.props));
      node.props = assign(node?.props, {
        style: {
          cursor: 'not-allowed',
          color: 'var(--er-text-color-placeholder)',
        },
      });
    });
  });
}

export default useDisabledStyle;
