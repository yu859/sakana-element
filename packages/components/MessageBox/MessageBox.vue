<script setup lang="ts">
import type { MessageBoxProps, MessageBoxAction } from './types';
import type { InputInstance } from '../Input/types';
import { useZIndex, useId } from '@sakana-element/hooks';
import { typeIconMap } from '@sakana-element/utils';
import { reactive, computed, ref, watch, nextTick, type Ref } from 'vue';

import ErOverlay from '../Overlay/Overlay.vue';
import ErIcon from '../Icon/Icon.vue';
import ErButton from '../Button/Button.vue';
import ErInput from '../Input/Input.vue';
import { isFunction, isNil } from 'lodash-es';

defineOptions({
  name: 'ErMessageBox',
  inheritAttrs: false,
});

const props = withDefaults(defineProps<MessageBoxProps>(), {
  lockScroll: true,
  showClose: true,
  closeOnClickModal: true,
  confirmButtonType: 'primary',
  roundButton: false,
  boxType: '',
  inputValue: '',
  inputPlaceholder: 'Please input...',
  confirmButtonText: 'Ok',
  cancelButtonText: 'Cancel',
  showConfirmButton: true,
});

const { doAction } = props;
const { nextZIndex } = useZIndex();

const headerRef = ref<HTMLElement>();
const inputRef = ref<InputInstance>();
const inputId = useId();

//这里不用ref是因为要多写.value,而reactive不用
const state = reactive({
  ...props,
  zIndex: nextZIndex(),
});

const hasMessage = computed(() => !!state.message);
const iconComponent = computed(
  () => state.icon ?? typeIconMap.get(state.type ?? '')
);

watch(
  //监听深层响应式数据
  () => props.visible?.value,
  (val) => {
    if (val) state.zIndex = nextZIndex();
    if (props.boxType !== 'prompt') return;

    if (!val) return;

    //nextTick 是 Vue 的异步更新机制，它会在下一个 DOM 更新周期中执行回调函数。
    // 在 Vue 的虚拟 DOM 更新机制中，DOM 的更新是异步的，
    // 所以当我们需要获取到最新的 DOM 元素时，需要使用 nextTick 来等待 DOM 更新完成。
    nextTick(() => {
      inputRef.value && inputRef.value.focus();
    });
  }
);

// 点击遮罩层
function handleWrapperClick() {
  props.closeOnClickModal && handleAction('close'); //前面是true则执行handleAction('close')
}

// 输入框回车
function handleInputEnter(e: KeyboardEvent) {
  if (state.inputType === 'textarea') return; //如果inputType是textarea文本域则不执行
  e.preventDefault(); //阻止默认行为
  return handleAction('confirm'); //执行handleAction('confirm')
}

// 点击按钮
function handleAction(action: MessageBoxAction) {
  // 判断beforeClose是否是函数如果是则执行beforeClose(action, state, () => doAction(action, state.inputValue))
  isFunction(props.beforeClose)
    ? props.beforeClose(action, state, () => doAction(action, state.inputValue)) //beforeClose是函数则执行beforeClose(action, state, () => doAction(action, state.inputValue))
    : doAction(action, state.inputValue);
}

function handleClose() {
  handleAction('close');
}
</script>

<template>
  <transition name="fade-in-linear" @after-leave="destroy">
    <er-overlay v-show="(visible as Ref).value" :z-index="state.zIndex" mask>
      <div
        role="dialog"
        class="er-overlay-message-box"
        @click="handleWrapperClick"
      >
        <div
          ref="rootRef"
          :class="[
            'er-message-box',
            {
              'is-center': state.center,
            },
          ]"
          @click.stop
        >
          <div
            v-if="!isNil(state.title)"
            ref="headerRef"
            class="er-message-box__header"
            :class="{ 'show-close': state.showClose }"
          >
            <div class="er-message-box__title">
              <er-icon
                v-if="iconComponent && state.center"
                :class="{
                  [`er-icon-${state.type}`]: state.type,
                }"
                :icon="iconComponent"
              />
              {{ state.title }}
            </div>
            <button
              v-if="showClose"
              class="er-message-box__header-btn"
              @click.stop="handleClose"
            >
              <er-icon icon="xmark" />
            </button>
          </div>
          <div class="er-message-box__content">
            <er-icon
              v-if="iconComponent && !state.center && hasMessage"
              :class="{
                [`er-icon-${state.type}`]: state.type,
              }"
              :icon="iconComponent"
            />
            <div v-if="hasMessage" class="er-message-box__message">
              <slot>
                <component
                  :is="state.showInput ? 'label' : 'p'"
                  :for="state.showInput ? inputId : void 0"
                >
                  {{ state.message }}
                </component>
              </slot>
            </div>
          </div>
          <div v-show="state.showInput" class="er-message-box__input">
            <er-input
              v-model="state.inputValue"
              ref="inputRef"
              :placeholder="state.inputPlaceholder"
              :type="state.inputType"
              @keyup.enter="handleInputEnter"
            />
          </div>
          <div class="er-message-box__footer">
            <er-button
              v-if="state.showCancelButton"
              class="er-message-box__footer-btn er-message-box__cancel-btn"
              :type="state.cancelButtonType"
              :round="state.roundButton"
              :loading="state.cancelButtonLoading"
              @click="handleAction('cancel')"
              @keydown.prevent.enter="handleAction('cancel')"
              >{{ state.cancelButtonText }}</er-button
            >
            <er-button
              v-show="state.showConfirmButton"
              class="er-message-box__footer-btn er-message-box__confirm-btn"
              :type="state.confirmButtonType ?? 'primary'"
              :round="state.roundButton"
              :loading="state.confirmButtonLoading"
              @click="handleAction('confirm')"
              @keydown.prevent.enter="handleAction('confirm')"
              >{{ state.confirmButtonText }}</er-button
            >
          </div>
        </div>
      </div>
    </er-overlay>
  </transition>
</template>

<style>
@import './style.css';
</style>
