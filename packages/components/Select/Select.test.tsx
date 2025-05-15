import { rAF } from '@sakana-element/utils';
import { describe, test, expect, vi } from 'vitest'; //vi可以模拟一个函数
import { mount } from '@vue/test-utils'; //mount挂载组件
import { SELECT_CTX_KEY } from './constants';

import type { SelectOptionProps } from './types';

import Select from './Select.vue';
import Option from './Option.vue';

describe('Select', () => {
  //测试组件是否正常渲染
  test('Select renders with default props', async () => {
    const wrapper = mount(Select, {
      props: {
        modelValue: '',
        options: [{ value: '1', label: 'option 1' }],
      },
    });

    wrapper.find('input').trigger('click');

    await rAF();
    //toContain 判断一个字符串是否包含另一个字符串
    expect(wrapper.text()).toContain('option 1');
  });

  //测试选择一个选项
  test('selects an option', async () => {
    const wrapper = mount(Select, {
      props: {
        modelValue: '',
        options: [{ value: '1', label: 'option 1' }],
      },
    });

    //find 获取第一个元素，findAll获取多个元素
    wrapper.find('input').trigger('click');

    await rAF();
    //at 获取一个元素
    const option = wrapper.findAll('li').at(0);
    await option?.trigger('click');

    expect(wrapper.emitted('update:modelValue')).toBeTruthy();
    //toEqual 判断两个值是否相等
    expect(wrapper.emitted('update:modelValue')?.[0]).toEqual(['1']);
  });

  test('Option emits an event on click', async () => {
    const ctx = {
      handleSelect: vi.fn(), //模拟一个函数，不注重函数的实现，只注重函数是否被调用
      selectStates: {
        selectedOption: null,
      },
      renderLabel: (props: SelectOptionProps) => `label:${props.label}`,
    };
    const wrapper = mount(Option, {
      props: {
        value: '1',
        label: 'option 1',
      },
      global: {
        //相当于将ctx注入到Option组件中成为父组件
        provide: {
          //断言SELECT_CTX_KEY为any类型，然后值为ctx
          [SELECT_CTX_KEY as any]: ctx,
        },
      },
    });

    await wrapper.trigger('click');

    //toHaveBeenCalled 判断一个函数是否被调用
    expect(ctx.handleSelect).toHaveBeenCalled();
  });
});
