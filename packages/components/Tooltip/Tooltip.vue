<script setup lang="ts">
import { computed, onUnmounted, ref, watch, watchEffect, type Ref } from 'vue';
import { createPopper, type Instance } from '@popperjs/core';
import { bind, debounce, isNil, type DebouncedFunc } from 'lodash-es';
import type { TooltipProps, TooltipEmits, TooltipInstance } from './types';
import { useClickOutside } from '@sakana-element/hooks';

import useEventsToTiggerNode from './useEventsToTiggerNode';

interface _TooltipProps extends TooltipProps {
  virtualRef?: HTMLElement | void; //虚拟触发节点
  virtualTriggering?: boolean; //是否虚拟触发
}

defineOptions({
  name: 'ErTooltip', //加前缀，避免和别的组件冲突，业界惯例
});
const props = withDefaults(defineProps<_TooltipProps>(), {
  //defineProps不仅可以用来接收父组件传递的数据，还可以用来定义和导入类型
  //withDefaults 设置默认值
  placement: 'bottom',
  trigger: 'hover',
  transition: 'fade',
  showTimeout: 0,
  hideTimeout: 200,
});

const emits = defineEmits<TooltipEmits>(); //定义子组件向父组件发送什么类型的事件
const visible = ref(false);

const events: Ref<Record<string, EventListener>> = ref({}); //Record创建一个对象类型，指定键值的类型，EventListener是事件处理函数类型，Ref告诉后面是一个ref数据
const outerEvents: Ref<Record<string, EventListener>> = ref({});
const dropdownEvents: Ref<Record<string, EventListener>> = ref({});

const containerNode = ref<HTMLElement>();
const popperNode = ref<HTMLElement>();
const _triggerNode = ref<HTMLElement>();

const triggerNode = computed(() => {
  if (props.virtualTriggering) {
    return (props.virtualRef as HTMLElement) ?? _triggerNode.value;
  }
  return _triggerNode.value as HTMLElement;
});

const popperOptions = computed(() => ({
  placement: props.placement,
  modifiers: [
    {
      name: 'offset',
      options: {
        offset: [0, 9],
      },
    },
  ],
  ...props.popperOptions,
}));

const openDelay = computed(() =>
  props.trigger === 'hover' ? props.showTimeout : 0
);
const closeDelay = computed(() =>
  props.trigger === 'hover' ? props.hideTimeout : 0
);

let openDebounce: DebouncedFunc<() => void> | void;
let closeDebounce: DebouncedFunc<() => void> | void;

// 打开提示框
function openFinal() {
  closeDebounce?.cancel();
  openDebounce?.();
}

// 关闭提示框
function closeFinal() {
  openDebounce?.cancel();
  closeDebounce?.();
}

// 切换提示框状态
function togglePopper() {
  visible.value ? closeFinal() : openFinal();
}

// 设置提示框可见性
function setVisible(val: boolean) {
  if (props.disabled) return;
  visible.value = val;
  emits('visible-change', val);
}

function attachEvents() {
  if (props.disabled || props.manual) return;
  if (props.trigger === 'hover') {
    events.value['mouseenter'] = openFinal;
    outerEvents.value['mouseleave'] = closeFinal;
    dropdownEvents.value['mouseenter'] = openFinal;
    return;
  }
  if (props.trigger === 'click') {
    events.value['click'] = togglePopper;
    return;
  }
  if (props.trigger === 'contextmenu') {
    events.value['contextmenu'] = (e) => {
      e.preventDefault();
      openFinal();
    };
    return;
  }
}

let popperInstance: null | Instance;

function destroyPopperInstance() {
  if (isNil(popperInstance)) return; // 如果实例不存在则返回,isNil是lodash-es库中的一个函数，用于检查值是否为null或undefined

  popperInstance.destroy();
  popperInstance = null;
}

// 重置所有事件处理函数
function resetEvents() {
  events.value = {}; // 清空触发器事件
  outerEvents.value = {}; // 清空外部容器事件
  dropdownEvents.value = {}; // 清空下拉框事件

  attachEvents(); // 重新绑定事件
}

const show: TooltipInstance['show'] = openFinal;
const hide: TooltipInstance['hide'] = function () {
  openDebounce?.cancel();
  setVisible(false);
};

watch(
  visible,
  (val) => {
    if (!val) return;
    if (triggerNode.value && popperNode.value) {
      popperInstance = createPopper(
        triggerNode.value,
        popperNode.value,
        popperOptions.value
      );
      console.log(popperInstance);
    }
  },
  { flush: 'post' }
);

watch(
  () => props.manual,
  (isManual) => {
    if (isManual) {
      resetEvents();
      return;
    }
    attachEvents();
  }
);

watch(
  () => props.trigger, //外部变量要监听，内部变量不需要监听，因为外部变量不是ref，内部变量是ref
  (val, oldVal) => {
    if (val === oldVal) return;
    openDebounce?.cancel();
    visible.value = false;
    emits('visible-change', false);
    resetEvents();
  }
);

watchEffect(() => {
  if (!props.manual) {
    attachEvents();
  }
  openDebounce = debounce(bind(setVisible, null, true), openDelay.value);
  closeDebounce = debounce(bind(setVisible, null, false), closeDelay.value);
});

useClickOutside(containerNode, () => {
  emits('click-outside');
  if (props.trigger === 'hover' || props.manual) return;

  visible.value && closeFinal();
});

useEventsToTiggerNode(props, triggerNode, events, () => {
  openDebounce?.cancel();
  setVisible(false);
});

onUnmounted(() => {
  console.log('unmount', popperInstance);
  destroyPopperInstance();
});

defineExpose<TooltipInstance>({
  show,
  hide,
});
</script>

<template>
  <div class="er-tooltip" ref="containerNode" v-on="outerEvents">
    <div
      class="er-tooltip__trigger"
      ref="_triggerNode"
      v-on="events"
      v-if="!virtualTriggering"
    >
      <slot></slot>
    </div>
    <slot name="default" v-else></slot>

    <transition :name="transition" @after-leave="destroyPopperInstance">
      <div
        class="er-tooltip__popper"
        ref="popperNode"
        v-on="dropdownEvents"
        v-if="visible"
      >
        <slot name="content">
          {{ content }}
        </slot>
        <div id="arrow" data-popper-arrow></div>
      </div>
    </transition>
  </div>
</template>

<style scoped>
@import './style.css';
</style>
