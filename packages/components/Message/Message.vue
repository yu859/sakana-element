<script setup lang="ts">
import type { MessageProps, MessageCompInstance } from './types';
import { computed, onMounted, ref, watch } from 'vue';
import { getLastBottomOffset } from './methods';
import { bind, delay } from 'lodash-es';
import { useEventListener, useOffset } from '@sakana-element/hooks';
import { addUnit } from '@sakana-element/utils';
import { typeIconMap, RenderVnode } from '@sakana-element/utils';
import ErIcon from '../Icon/Icon.vue';

defineOptions({ name: 'ErMessage' });

const props = withDefaults(defineProps<MessageProps>(), {
  type: 'info',
  duration: 3000,
  offset: 10,
  transitionName: 'fade-up',
});

const visible = ref(false);
const messageRef = ref<HTMLDivElement>();
// div 高度
const boxHeight = ref(0);

const { topOffset, bottomOffset } = useOffset({
  getLastBottomOffset: bind(getLastBottomOffset, props), //将props作为参数传递给getLastBottomOffset
  offset: props.offset,
  boxHeight,
});

const iconName = computed(() => typeIconMap.get(props.type) ?? 'circle-info');

const customStyle = computed(() => ({
  top: addUnit(topOffset.value),
  zIndex: props.zIndex,
}));

let timer: number;
function startTimmer() {
  if (props.duration === 0) return;
  timer = delay(close, props.duration);
}

function clearTimer() {
  clearTimeout(timer);
}

function close() {
  visible.value = false;
}

watch(visible, (val) => {
  if (!val) boxHeight.value = -props.offset; // 使得退出的动画更加流畅
});

useEventListener(document, 'keydown', (e: Event) => {
  const { code } = e as KeyboardEvent;
  if (code === 'Escape') close();
});

onMounted(() => {
  //组件渲染后，显示组件，并设置定时器
  visible.value = true;
  startTimmer();
});

defineExpose<MessageCompInstance>({
  close,
  bottomOffset,
});
</script>

<template>
  <Transition
    :name="transitionName"
    @enter="boxHeight = messageRef!.getBoundingClientRect().height"
    @after-leave="!visible && onDestory()"
  >
    <div
      ref="messageRef"
      class="er-message"
      :class="{
        [`er-message--${type}`]: type,
        'is-close': showClose,
        'text-center': center,
      }"
      :style="customStyle"
      v-show="visible"
      role="alert"
      @mouseenter="clearTimer"
      @mouseleave="startTimmer"
    >
      <er-icon class="er-message__icon" :icon="iconName" />
      <div class="er-message__content">
        <slot>
          <render-vnode v-if="message" :vNode="message" />
        </slot>
      </div>
      <div class="er-message__close" v-if="showClose">
        <er-icon icon="xmark" @click.stop="close" />
      </div>
    </div>
  </Transition>
</template>

<style>
@import './style.css';
</style>
