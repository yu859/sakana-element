<script setup lang="ts">
import { ErButton, ErPopconfirm } from 'sakana-element';

function confirm() {
  console.log('yes');
}

function cancel() {
  console.log('no');
}
</script>

<template>
  <er-popconfirm title="确认删除吗？" @confirm="confirm" @cancel="cancel">
    <er-button type="primary" size="small">test</er-button>
  </er-popconfirm>
</template>

<style scoped></style>
