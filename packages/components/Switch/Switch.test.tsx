import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import Switch from './Switch.vue';

describe('Switch.vue', () => {
  it('should render correctly', () => {
    const wrapper = mount(Switch); // 挂载组件
    expect(wrapper.find('.er-switch')).toBeTruthy(); // 断言组件是否存在
  });

  it('should handle click event and toggle the checked state', async () => {
    const wrapper = mount(Switch, {
      props: {
        modelValue: false,
      },
    });

    await wrapper.trigger('click');
    expect(wrapper.emitted()['update:modelValue'][0]).toEqual([true]);
    expect(wrapper.emitted()['change'][0]).toEqual([true]);

    await wrapper.trigger('click');
    expect(wrapper.emitted()['update:modelValue'][1]).toEqual([false]);
    expect(wrapper.emitted()['change'][1]).toEqual([false]);
  });

  it('should not toggle when disabled', async () => {
    const wrapper = mount(Switch, {
      props: {
        modelValue: false,
        disabled: true,
      },
    });

    await wrapper.trigger('click');
    // 断言点击事件不会触发,toHaveProperty 断言对象是否存在该属性,emitted 返回一个对象,对象的属性是事件名,值是事件的回调函数
    expect(wrapper.emitted()).not.toHaveProperty('update:modelValue');
    expect(wrapper.emitted()).not.toHaveProperty('change');
  });
});
