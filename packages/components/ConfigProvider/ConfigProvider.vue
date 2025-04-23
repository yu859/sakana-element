<script setup lang="ts">
import type { ConfigProviderProps } from './types';
import { provideGlobalConfig } from './hooks';

defineOptions({
  name: 'ErConfigProvider',
});
const props = defineProps<ConfigProviderProps>(); //表示父级传递的类型
const config = provideGlobalConfig(props);
</script>

<template>
  <slot name="default" :config="config"></slot>
</template>
