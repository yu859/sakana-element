import { rAF } from '@sakana-element/utils';
import { describe, it, expect } from 'vitest';
import { Loading } from './service';

//测试Loading组件
describe('Loading', () => {
  //测试Loading组件是否创建实例
  it('should creat Loading instance', () => {
    const instance = Loading();
    expect(instance).toBeTruthy();
  });

  //测试Loading组件是否渲染mask
  it('should render mask', async () => {
    Loading();
    await rAF();
    expect(document.querySelector('.er-loading__mask')).toBeTruthy();
  });

  //测试Loading组件是否关闭并从DOM中移除
  it('should close Loading and remove it from DOM', async () => {
    const instance = Loading();

    await rAF();
    expect(document.querySelector('.er-loading')).toBeTruthy();
    instance.close();
    await rAF();

    expect(document.querySelector('.er-loading')).toBeFalsy();
  });
});
