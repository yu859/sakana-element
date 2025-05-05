import { isFunction } from 'lodash-es';
import { getCurrentInstance, ref, type Ref } from 'vue';
import useEventListener from './useEventListener';

interface UseFocusControllerOptions {
  afterFocus?(): void; //聚焦后执行
  beforeBlur?(event: FocusEvent): boolean | void; //聚焦前执行
  afterBlur?(): void; //失去焦点后执行
}

//<T extends HTMLElement | { focus(): void }>限制传入的类型
export function useFocusController<T extends HTMLElement | { focus(): void }>(
  target: Ref<T | void>,
  { afterBlur, beforeBlur, afterFocus }: UseFocusControllerOptions = {}
) {
  const instance = getCurrentInstance()!; //getCurrentInstance()获取当前组件实例差不多就是组件属性
  const { emit } = instance;
  const wrapperRef = ref<HTMLElement>();
  const isFocused = ref(false);

  const handleFocus = (event: FocusEvent) => {
    if (isFocused.value) return;
    isFocused.value = true;
    emit('focus', event);
    afterFocus?.();
  };

  const handleBlur = (event: FocusEvent) => {
    const cancelBlur = isFunction(beforeBlur) ? beforeBlur(event) : false;
    if (
      cancelBlur ||
      (event.relatedTarget &&
        wrapperRef.value?.contains(event.relatedTarget as Node))
    )
      return;

    isFocused.value = false;
    emit('blur', event);
    afterBlur?.();
  };

  const handleClick = () => {
    target.value?.focus();
  };

  useEventListener(wrapperRef, 'click', handleClick);

  return {
    wrapperRef,
    isFocused,
    handleFocus,
    handleBlur,
  };
}

export default useFocusController;
