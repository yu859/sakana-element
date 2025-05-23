<script setup lang="ts">
import { ref, computed, watch, useAttrs, shallowRef, nextTick } from 'vue';
import { useFocusController, useId } from '@sakana-element/hooks';
import { each, noop } from 'lodash-es';
import type { InputProps, InputEmits, InputInstance } from './types';

import Icon from '../Icon/Icon.vue';

defineOptions({
  name: 'ErInput',
  inheritAttrs: false,
});

//父组件传入的属性
const props = withDefaults(defineProps<InputProps>(), {
  type: 'text',
  autocomplete: 'off',
});

//定义导出事件的类型，可以不用写['']这些，因为自动识别后面的事件类型
const emits = defineEmits<InputEmits>();

const innerValue = ref(props.modelValue); //内部值
const pwdVisible = ref(false); //可见性

const inputRef = shallowRef<HTMLInputElement>();
const textareaRef = shallowRef<HTMLTextAreaElement>();

const _ref = computed(() => inputRef.value || textareaRef.value);

const attrs = useAttrs(); //useAttrs获取父组件传入的属性
const isDisabled = computed(() => props.disabled); //是否禁用

//可清除为true，且有值，且不禁止，且聚焦，!!表示非空
const showClear = computed(
  () =>
    props.clearable &&
    !!innerValue.value &&
    !isDisabled.value &&
    isFocused.value
);

//密码显示为true，且showPassword为true，且不禁止，且有值
const showPwdArea = computed(
  () =>
    props.type === 'password' &&
    props.showPassword &&
    !isDisabled.value &&
    !!innerValue.value
);

const { wrapperRef, isFocused, handleFocus, handleBlur } = useFocusController(
  _ref,
  {
    afterBlur() {
      // form 校验
    },
  }
);

const clear: InputInstance['clear'] = function () {
  innerValue.value = '';
  each(['input', 'change', 'update:modelValue'], (e) => emits(e as any, ''));
  emits('clear');
  // 清空表单校验
};
const focus: InputInstance['focus'] = async function () {
  await nextTick();
  _ref.value?.focus();
};

const blur: InputInstance['blur'] = function () {
  _ref.value?.blur();
};

const select: InputInstance['select'] = function () {
  _ref.value?.select();
};

function handleInput() {
  emits('update:modelValue', innerValue.value);
  emits('input', innerValue.value);
}

function handleChange() {
  emits('change', innerValue.value);
}

function togglePwdVisible() {
  pwdVisible.value = !pwdVisible.value;
}

watch(
  () => props.modelValue,
  (newVal) => {
    innerValue.value = newVal;
    // 表单校验触发
  }
);

defineExpose<InputInstance>({
  ref: _ref,
  focus,
  blur,
  select,
  clear,
});
</script>

<template>
  <div
    class="er-input"
    :class="{
      [`er-input--${type}`]: type,
      [`er-input--${size}`]: size,
      'is-disabled': isDisabled,
      'is-prepend': $slots.prepend,
      'is-append': $slots.append,
      'is-prefix': $slots.prefix,
      'is-suffix': $slots.suffix,
      'is-focus': isFocused,
    }"
  >
    <template v-if="type !== 'textarea'">
      <div v-if="$slots.prepend" class="er-input__prepend">
        <slot name="prepend"></slot>
      </div>
      <div class="er-input__wrapper" ref="wrapperRef">
        <span v-if="$slots.prefix" class="er-input__prefix">
          <slot name="prefix"></slot>
        </span>
        <input
          class="er-input__inner"
          ref="inputRef"
          :id="useId().value"
          :type="showPassword ? (pwdVisible ? 'text' : 'password') : type"
          :disabled="isDisabled"
          :readonly="readonly"
          :autocomplete="autocomplete"
          :placeholder="placeholder"
          :autofocus="autofocus"
          :form="form"
          v-model="innerValue"
          v-bind="attrs"
          @input="handleInput"
          @change="handleChange"
          @focus="handleFocus"
          @blur="handleBlur"
        />
        <span
          v-if="$slots.suffix || showClear || showPwdArea"
          class="er-input__suffix"
        >
          <slot name="suffix"></slot>
          <Icon
            icon="circle-xmark"
            v-if="showClear"
            class="er-input__clear"
            @click="clear"
            @mousedown.prevent="noop"
          />
          <Icon
            icon="eye"
            class="er-input__password"
            v-if="showPwdArea && pwdVisible"
            @click="togglePwdVisible"
          />
          <Icon
            icon="eye-slash"
            class="er-input__password"
            v-if="showPwdArea && !pwdVisible"
            @click="togglePwdVisible"
          />
        </span>
      </div>
      <div v-if="$slots.append" class="er-input__append">
        <slot name="append"></slot>
      </div>
    </template>
    <template v-else>
      <textarea
        class="er-textarea__wrapper"
        ref="textareaRef"
        :id="useId().value"
        :disabled="isDisabled"
        :readonly="readonly"
        :autocomplete="autocomplete"
        :placeholder="placeholder"
        :autofocus="autofocus"
        :form="form"
        v-model="innerValue"
        v-bind="attrs"
        @input="handleInput"
        @change="handleChange"
        @focus="handleFocus"
        @blur="handleBlur"
      ></textarea>
    </template>
  </div>
</template>

<style>
@import './style.css';
</style>
