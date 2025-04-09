import { describe, it, expect, vi } from 'vitest'; // 测试框架
import type { AlertType } from './types'; // 类型
import { mount } from '@vue/test-utils'; // 测试工具，用于挂载组件
import Alert from './Alert.vue'; // 测试组件
import Icon from '../Icon/Icon.vue'; // 测试组件
import { ErAlert } from './index';
import { withInstall } from '@sakana-element/utils';

describe('Alert.vue', () => {
  //describe创建一个测试组，第一个参数是测试组的名称，第二个参数是测试组的内容
  const title = 'Test Alert' as const;
  const desc = 'This is a test description' as const;
  it('should render the alert with default props', () => {
    const wrapper = mount(Alert, {
      //mount挂载组件，传入参数，属性是自带的
      props: {
        title,
      },
      slots: {
        default: desc,
      },
      global: {
        stubs: ['ErIcon'],
      },
    });
    expect(wrapper.text()).toContain(title);
    expect(wrapper.text()).toContain(desc);

    // close icon
    const iconElement = wrapper.findComponent(Icon); //查找组件
    expect(iconElement.exists()).toBeTruthy(); //断言组件是否存在
    expect(iconElement.attributes('icon')).toBe('xmark'); //断言组件的icon属性是否为xmark

    const wrapper2 = mount(() => (
      <Alert title={title} description={desc}></Alert>
    ));

    expect(wrapper2.text()).toContain(title);
    expect(wrapper2.text()).toContain(desc);
  });

  //测试图标
  it.each([
    ['info', 'circle-info'],
    ['success', 'check-circle'],
    ['warning', 'circle-exclamation'],
    ['danger', 'circle-xmark'],
    ['error', 'circle-xmark'],
    ['non-compliance', 'circle-info'], // 不符合 type 定义的
  ])('should has the correct icon when props type is %s', (type, iconName) => {
    const wrapper = mount(Alert, {
      props: {
        title,
        closable: false,
        showIcon: true,
        type: type as AlertType,
      },
      slots: {
        default: desc,
      },
      global: {
        stubs: ['ErIcon'],
      },
    });

    const iconElement = wrapper.findComponent(Icon);
    expect(iconElement.exists()).toBeTruthy();
    expect(iconElement.attributes('icon')).toBe(iconName);
  });

  //测试关闭事件
  it('should emit close event when close icon is clicked', () => {
    const onClose = vi.fn(); //创建一个模拟函数监听

    const wrapper = mount(Alert, {
      props: {
        title,
        closable: true,
        showIcon: false,
        onClose,
      },
      slots: {
        default: desc,
      },
      global: {
        stubs: ['ErIcon'],
      },
    });
    wrapper.findComponent(Icon).trigger('click'); //模拟点击事件
    expect(onClose).toHaveBeenCalled(); //断言onClose函数是否被调用
  });

  //测试插槽
  it('should allow custom content via slots', () => {
    const wrapper = mount(Alert, {
      props: {
        title: 'test title',
      },
      slots: {
        default: desc,
        title,
      },
    });
    expect(wrapper.text()).toContain(desc);
    expect(wrapper.text()).toContain(title);
    expect(wrapper.text()).not.toContain('test title');
  });

  //测试文本居中
  it('should support centering text', () => {
    const wrapper = mount(Alert, {
      props: {
        title,
        description: desc,
        center: true,
      },
    });
    //class
    const rootNode = wrapper.find('.er-alert');
    expect(rootNode.classes()).toContain('text-center');
  });

  //测试关闭图标
  it('should not render close icon when closable is false', () => {
    const wrapper = mount(Alert, {
      props: { closable: false },
    });
    expect(wrapper.find('.er-alert__close').exists()).toBe(false);
  });

  //测试打开和关闭
  it('should toggle visibility when open and close methods are called', async () => {
    const wrapper = mount(Alert, {
      props: { title, closable: false },
    });
    await wrapper.vm.close();
    expect(wrapper.find('.er-alert').attributes().style).toBe('display: none;');
    await wrapper.vm.open();
    expect(wrapper.find('.er-alert').attributes().style).toBe('');
  });
});

describe('Alert/index', () => {
  it('should be exported with withInstall()', () => {
    expect(ErAlert.install).toBeDefined();
  });
  it('component should be exported', () => {
    expect(ErAlert).toBe(Alert);
  });

  // 可选
  it('should enhance Alert component', () => {
    const enhancedAlert = withInstall(Alert);
    expect(enhancedAlert).toBe(ErAlert);
  });

  // 可选
  it('should apply specific enhance', () => {
    const enhancedAlert = withInstall(Alert);
    expect(enhancedAlert).toHaveProperty('install');
  });
});
