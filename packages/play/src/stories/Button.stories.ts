import type { Meta, StoryObj, ArgTypes } from '@storybook/vue3';
import { fn, within, userEvent, expect, clearAllMocks } from '@storybook/test';
import { set } from 'lodash-es';

import { ErButton, ErButtonGroup } from 'sakana-element';
import 'sakana-element/dist/theme/Button.css';

type Story = StoryObj<typeof ErButton> & { argTypes?: ArgTypes };
//argTypes用于定义组件的参数类型和控制方式，可以生成参数文档

const meta: Meta<typeof ErButton> = {
  title: 'Example/Button',
  component: ErButton,
  tags: ['autodocs'],
  argTypes: {
    type: {
      control: { type: 'select' }, //显示为下拉选择框
      options: ['primary', 'success', 'warning', 'danger', 'info', ''], //当控制器类型为 select 时，定义可选的值列表
    },
    size: {
      control: { type: 'select' },
      options: ['large', 'default', 'small', ''],
    },
    disabled: {
      control: 'boolean', //显示为开关
    },
    loading: {
      control: 'boolean',
    },
    useThrottle: {
      control: 'boolean',
    },
    throttleDuration: {
      control: 'number',
    },
    autofocus: {
      control: 'boolean',
    },
    tag: {
      control: { type: 'select' },
      options: ['button', 'a', 'div'],
    },
    nativeType: {
      control: { type: 'select' },
      options: ['button', 'submit', 'reset', ''],
    },
    icon: {
      control: { type: 'text' },
    },
    loadingIcon: {
      control: { type: 'text' },
    },
  },
  args: { onClick: fn() },
};

const container = (val: string) => `
<div style="margin:5px">
  ${val}
</div>
`;

export const Default: Story & { args: { content: string } } = {
  argTypes: {
    content: {
      control: { type: 'text' },
    },
  },
  args: {
    type: 'primary',
    content: 'Button',
  },
  render: (args) => ({
    components: { ErButton },
    setup() {
      return { args };
    },
    template: container(
      `<er-button data-testid="story-test-btn" v-bind="args">{{args.content}}</er-button>`
    ),
  }),

  // 异步测试函数
  play: async ({ canvasElement, args, step }) => {
    // 获取测试环境中的 canvas 和按钮元素
    const canvas = within(canvasElement);
    const btn = canvas.getByTestId('story-test-btn');

    // 测试场景1：节流模式开启时的点击行为
    await step(
      'When useThrottle is set to true, the onClick should be called once',
      async () => {
        set(args, 'useThrottle', true);
        await userEvent.tripleClick(btn);
        expect(args.onClick).toHaveBeenCalledOnce();
        clearAllMocks();
      }
    );

    // 测试场景2：节流模式关闭时的点击行为
    await step(
      'When useThrottle is set to false, the onClick should be called three times',
      async () => {
        set(args, 'useThrottle', false);
        await userEvent.tripleClick(btn);
        expect(args.onClick).toHaveBeenCalledTimes(3);
        clearAllMocks();
      }
    );

    // 测试场景3：按钮禁用时的点击行为
    await step(
      'When disabled is set to true, the onClick should not be called',
      async () => {
        set(args, 'disabled', true);
        await userEvent.click(btn);
        expect(args.onClick).toHaveBeenCalledTimes(0);
        set(args, 'disabled', false);
        clearAllMocks();
      }
    );

    // 测试用例：测试加载状态下按钮的点击行为
    await step(
      'When loading is set to true, the onClick should not be called',
      async () => {
        set(args, 'loading', true);
        await userEvent.click(btn);

        expect(args.onClick).toHaveBeenCalledTimes(0);
        set(args, 'loading', false);
        clearAllMocks();
      }
    );
  },
};

// 自动聚焦按钮组件的故事配置
export const Autofocus: Story & { args: { content: string } } = {
  argTypes: {
    content: {
      control: { type: 'text' },
    },
  },
  args: {
    content: 'Button',
    autofocus: true,
  },
  render: (args) => ({
    components: { ErButton },
    setup() {
      return { args };
    },
    template: container(`
      <p>请点击浏览器的刷新页面来获取按钮聚焦</p>
      <er-button data-testid="story-test-btn" v-bind="args">{{args.content}}</er-button>
    `),
  }),
  play: async ({ args }) => {
    await userEvent.keyboard('{enter}');

    expect(args.onClick).toHaveBeenCalledOnce();
    clearAllMocks();
  },
};

//圆形按钮
export const Circle: Story = {
  args: {
    icon: 'search',
  },
  render: (args) => ({
    components: { ErButton },
    setup() {
      return { args };
    },
    template: container(`
      <er-button circle v-bind="args"/>
    `),
  }),
  play: async ({ canvasElement, args, step }) => {
    const canvas = within(canvasElement);
    await step('click button', async () => {
      await userEvent.click(canvas.getByRole('button'));
    });

    expect(args.onClick).toHaveBeenCalled();
  },
};
Circle.parameters = {};

//按钮组
export const Group: Story & { args: { content1: string; content2: string } } = {
  argTypes: {
    groupType: {
      control: { type: 'select' },
      options: ['primary', 'success', 'warning', 'danger', 'info', ''],
    },
    groupSize: {
      control: { type: 'select' },
      options: ['large', 'default', 'small', ''],
    },
    groupDisabled: {
      control: 'boolean',
    },
    content1: {
      control: { type: 'text' },
      defaultValue: 'Button1',
    },
    content2: {
      control: { type: 'text' },
      defaultValue: 'Button2',
    },
  },
  args: {
    round: true,
    content1: 'Button1',
    content2: 'Button2',
  },
  render: (args) => ({
    components: { ErButton, ErButtonGroup },
    setup() {
      return { args };
    },
    template: container(`
      <er-button-group :type="args.groupType" :size="args.groupSize" :disabled="args.groupDisabled">
        <er-button v-bind="args">{{args.content1}}</er-button>
        <er-button v-bind="args">{{args.content2}}</er-button>
      </er-button-group>
    `),
  }),
  play: async ({ canvasElement, args, step }) => {
    const canvas = within(canvasElement);
    await step('click btn1', async () => {
      await userEvent.click(canvas.getByText('Button1'));
    });
    await step('click btn2', async () => {
      await userEvent.click(canvas.getByText('Button2'));
    });
    expect(args.onClick).toHaveBeenCalled();
  },
};

export default meta;
