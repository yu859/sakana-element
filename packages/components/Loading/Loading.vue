<script setup lang="ts">
import type { LoadingOptions } from './types';
import { computed, type Ref } from 'vue';
import { isString } from 'lodash-es';
import ErIcon from '../Icon/Icon.vue';

defineOptions({
  name: 'ErLoading',
  inheritAttrs: false, //关闭透传属性，除了自己定义的属性
});
const props = defineProps<LoadingOptions>();

const iconName = computed(() => {
  if (isString(props.spinner)) {
    return props.spinner;
  }
  return 'spinner'; // 'circle-notch' 也很好看
});
</script>

<template>
  <transition name="fade-in-linear" @after-leave="onAfterLeave">
    <div
      v-show="(props.visible as Ref).value"
      class="er-loading er-loading__mask"
      :class="{ 'is-fullscreen': fullscreen }"
    >
      <div class="er-loading__spinner">
        <er-icon v-if="props.spinner !== false" :icon="iconName" spin />
        <p v-if="text" class="er-loading-text">{{ text }}</p>
      </div>
    </div>
  </transition>
</template>

<style>
@import './style.css';
.er-loading {
  --er-loading-bg-color: v-bind(
    background
  ) !important; /* !important 表示强制覆盖内联样式  v-bind(background) 表示绑定background属性 */
  --er-loading-z-index: v-bind(
    zIndex
  ) !important; /* !important 表示强制覆盖内联样式  v-bind(zIndex) 表示绑定zIndex属性 */
}
</style>
