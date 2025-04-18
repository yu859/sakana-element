<script setup lang="ts">
import { computed, ref, provide } from 'vue';
import { isNil, omit } from 'lodash-es';
import type { TooltipInstance } from '../Tooltip/types';
import { type ButtonInstance, ErButton, ErButtonGroup } from '../Button/index';
import type {
  DropdownProps,
  DropdownItemProps,
  DropdownEmits,
  DropdownInstance,
  DropdownContext,
} from './types';

import { DROPDOWN_CTX_KEY } from './constants';

import DropdownItem from './DropdownItem.vue';
import ErTooltip from '../Tooltip/Tooltip.vue';

defineOptions({
  name: 'ErDropdown',
  inheritAttrs: false, //透传，不继承父组件的非prop属性
});
const props = withDefaults(defineProps<DropdownProps>(), {
  hideOnClick: true,
  items: () => [] as DropdownItemProps[], //数组类型，每一个元素都是DropdownItemProps类型
});
const emits = defineEmits<DropdownEmits>();
const slots = defineSlots(); //控制所有插槽

const tooltipRef = ref<TooltipInstance>();
const triggerRef = ref<ButtonInstance>();

const tooltipProps = computed(
  () => omit(props, ['items', 'hideAfterClick', 'size', 'type', 'splitButton']) //排除这些属性
);

function handleItemClick(e: DropdownItemProps) {
  props.hideOnClick && tooltipRef.value?.hide();
  !isNil(e.command) && emits('command', e.command);
}

provide<DropdownContext>(DROPDOWN_CTX_KEY, {
  handleItemClick,
  size: computed(() => props.size),
});

defineExpose<DropdownInstance>({
  open: () => tooltipRef.value?.show(),
  close: () => tooltipRef.value?.hide(),
});
</script>

<template>
  <div class="er-dropdown" :class="{ 'is-disabled': props.disabled }">
    <er-tooltip
      ref="tooltipRef"
      v-bind="tooltipProps"
      :virtual-triggering="splitButton"
      :virtual-ref="triggerRef?.ref.value"
      @visible-change="$emit('visible-change', $event)"
    >
      <er-button-group
        v-if="splitButton"
        :type="type"
        :size="size"
        :disabled="disabled"
      >
        <er-button @click="$emit('click', $event)">
          <slot name="default"></slot>
        </er-button>
        <er-button ref="triggerRef" icon="angle-down" />
      </er-button-group>
      <slot name="default" v-else></slot>

      <template #content>
        <div class="er-dropdown__menu">
          <slot name="dropdown">
            <template v-for="item in items" :key="item.command">
              <dropdown-item v-bind="item" />
            </template>
          </slot>
        </div>
      </template>
    </er-tooltip>
  </div>
</template>

<style scoped>
@import './style.css';

:deep(.er-button-group) {
  & > :last-child {
    padding: 5px 7px;
  }
}
</style>
