<script setup></script>
<template>
  <div class="basic block">
    <er-alert title="Unclosable alert" type="success" :closable="false" />
    <er-alert title="Alert with callback" type="warning" @close="handleClose" />
  </div>
</template>
