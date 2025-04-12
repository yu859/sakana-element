import {
  onMounted, //组件挂载后的生命周期钩子
  onBeforeUnmount, //组件卸载前的生命周期钩子
  watch, //监听响应式数据的变化
  isRef, //检查一个值是否是响应式引用
  unref, //获取 ref 对象的值，如果不是 ref 则返回原值
  type MaybeRef, //可能是一个响应式引用
} from 'vue';

export default function useEventListener(
  target: MaybeRef<EventTarget | HTMLElement | void>,
  event: string,
  handler: (e: Event) => any
) {
  if (isRef(target)) {
    watch(target, (val, oldVal) => {
      oldVal?.removeEventListener(event, handler);
      val?.addEventListener(event, handler);
    });
  } else {
    onMounted(() => target?.addEventListener(event, handler));
  }

  onBeforeUnmount(() => unref(target)?.removeEventListener(event, handler));
}
