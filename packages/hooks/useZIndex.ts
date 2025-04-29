import { computed, ref } from 'vue';

const zIndex = ref(0);

// 生成z-index接受初始值，默认2000
export default function useZIndex(initVal = 2000) {
  const _initVal = ref(initVal); // 传入的初始值转换为响应式
  const currentZIndex = computed(() => zIndex.value + _initVal.value); // 当前z-index

  const nextZIndex = () => {
    zIndex.value++;
    return currentZIndex.value;
  };

  return {
    initialValue: _initVal,
    currentZIndex,
    nextZIndex,
  };
}
