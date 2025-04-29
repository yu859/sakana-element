import { type Ref, computed } from 'vue';

//UseOffsetOptions适用于多参数，定义一个对象结构的接口
interface UseOffsetOptions {
  offset: number;
  boxHeight: Ref<number>;
  getLastBottomOffset(): number;
}

interface UseOffsetResult {
  topOffset: Ref<number>;
  bottomOffset: Ref<number>;
}

export function useOffset(opts: UseOffsetOptions): UseOffsetResult {
  const lastBottomOffset = computed(() => opts.getLastBottomOffset()); //计算上一次的bottomOffset

  const topOffset = computed(() => opts.offset + lastBottomOffset.value); //计算当前的topOffset

  const bottomOffset = computed(() => topOffset.value + opts.boxHeight.value); //计算当前的bottomOffset

  return {
    topOffset,
    bottomOffset,
  };
}

export default useOffset;
