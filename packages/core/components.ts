import {
  ErButton,
  ErButtonGroup,
  ErIcon,
  ErCollapse,
  ErCollapseItem,
  ErAlert,
  ErTooltip,
  ErPopconfirm,
  ErDropdown,
  ErDropdownItem,
  ErMessage,
  ErNotification,
} from '@sakana-element/components';
import type { Plugin } from 'vue';

export default [
  ErButton,
  ErButtonGroup,
  ErIcon,
  ErCollapse,
  ErCollapseItem,
  ErAlert,
  ErTooltip,
  ErPopconfirm,
  ErDropdown,
  ErDropdownItem,
  ErMessage,
  ErNotification,
] as Plugin[]; //为了方便使用，我们将所有组件导出为一个数组，这样在使用时只需要导入这个数组即可。
