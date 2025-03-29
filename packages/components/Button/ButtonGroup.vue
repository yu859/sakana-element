<script setup lang="ts">
import type { ButtonGroupProps } from './types';
import { provide, reactive, toRef } from 'vue';
import { BUTTON_GROUP_CTX_KEY } from './contants';

defineOptions({
  name: 'ErButtonGroup',
});
const props = defineProps<ButtonGroupProps>();

//提供按钮组上下文
provide(
  //注入
  BUTTON_GROUP_CTX_KEY,
  reactive({
    size: toRef(props, 'size'),
    type: toRef(props, 'type'),
    disabled: toRef(props, 'disabled'),
  })
);
</script>

<template>
  <div class="er-button-group">
    <slot></slot>
  </div>
</template>

<style scoped>
@import './style.css';
</style>
