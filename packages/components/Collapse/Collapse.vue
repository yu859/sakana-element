<script setup lang="ts">
import type { CollapseProps, CollapseEmits, CollapseItemName } from './types';
import { provide, ref, watch, watchEffect } from 'vue';
import { debugWarn } from '@sakana-element/utils';
import { COLLAPSE_CTX_KEY } from './constants';

const COMP_NAME = 'ErCollapse' as const;

defineOptions({
  name: COMP_NAME,
});
const props = defineProps<CollapseProps>();
const emits = defineEmits<CollapseEmits>();
const activeNames = ref(props.modelValue);

if (props.accordion && activeNames.value.length > 1) {
  console.warn('accordion mode should only have one active item');
}

function handleItemClick(item: CollapseItemName) {
  let _activeNames = [...activeNames.value]; //私有变量，人为约定

  if (props.accordion) {
    _activeNames = [_activeNames[0] === item ? '' : item]; //如果当前点击的item与私有变量中的item相同，则将私有变量中的item设置为空，否则将当前点击的item设置为私有变量中的item
    updateActiveNames(_activeNames);
    return;
  }

  const index = _activeNames.indexOf(item);
  if (index > -1) {
    _activeNames.splice(index, 1);
  } else {
    _activeNames.push(item);
  }
  updateActiveNames(_activeNames);
}

function updateActiveNames(newNames: CollapseItemName[]) {
  activeNames.value = newNames;
  emits('update:modelValue', newNames);
  emits('change', newNames);
}

watchEffect(() => {
  if (props.accordion && activeNames.value.length > 1) {
    debugWarn(COMP_NAME, 'accordion mode should only have one active item');
  }
});

watch(
  //外来的要用函数包，自家的直接用就行
  () => props.modelValue, //监听modelValue的变化，这么写是监听响应式数据的变化
  (newNames) => updateActiveNames(newNames)
);

provide(COLLAPSE_CTX_KEY, {
  activeNames,
  handleItemClick,
});
</script>

<template>
  <div class="er-collapse">
    <slot></slot>
  </div>
</template>

<style scoped>
@import './style.css';
</style>
