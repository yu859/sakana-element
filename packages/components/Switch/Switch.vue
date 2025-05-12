<script setup lang="ts">
import type { SwitchProps, SwitchEmits, SwitchInstance } from './types';
import { ref, computed, onMounted, watch } from 'vue';
import { useId } from '@sakana-element/hooks';

//inheritAttrs: false 表示组件的属性不会自动传入到子组件中,但是使用v-bind="$attrs"可以获取到
defineOptions({ name: 'ErSwitch', inheritAttrs: false });
const props = withDefaults(defineProps<SwitchProps>(), {
  activeValue: true,
  inactiveValue: false,
});

const emits = defineEmits<SwitchEmits>(); //表示子传父的emit类型是SwitchEmits
const isDisabled = computed(() => props.disabled);

const innerValue = ref(props.modelValue);
const inputRef = ref<HTMLInputElement>();
const inputId = useId().value;
const checked = computed(() => innerValue.value === props.activeValue);

const focus: SwitchInstance['focus'] = function () {
  inputRef.value?.focus();
};
function handleChange() {
  if (isDisabled.value) return;

  const newVal = checked.value ? props.inactiveValue : props.activeValue;

  innerValue.value = newVal;

  emits('update:modelValue', newVal);

  emits('change', newVal);
}

//onMounted 表示组件挂载后执行
onMounted(() => {
  inputRef.value!.checked = checked.value;
});
watch(checked, (val) => {
  inputRef.value!.checked = val;
  // 预留 form 校验
});

defineExpose<SwitchInstance>({
  checked,
  focus,
});
</script>

<template>
  <div
    class="er-switch"
    :class="{
      [`er-switch--${size}`]: size,
      'is-disabled': isDisabled,
      'is-checked': checked,
    }"
    @click="handleChange"
  >
    <input
      class="er-switch__input"
      type="checkbox"
      role="switch"
      ref="inputRef"
      :id="inputId"
      :name="name"
      :disabled="isDisabled"
      :checked="checked"
      @keydown.enter="handleChange"
    />
    <div class="er-switch__core">
      <div class="er-switch__core-inner">
        <span
          v-if="activeText || inactiveText"
          class="er-switch__core-inner-text"
        >
          {{ checked ? activeText : inactiveText }}
        </span>
      </div>
      <div class="er-switch__core-action"></div>
    </div>
  </div>
</template>

<style>
@import './style.css';
</style>
