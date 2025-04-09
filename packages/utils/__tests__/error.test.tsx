import { describe, it, expect, vi } from 'vitest';

import { debugWarn, throwError } from '../error';

describe('error', () => {
  it('throwError should be worked', () => {
    expect(() => {
      throwError('scope', 'msg');
    }).toThrowError('[scope]:msg');
  });
  it('debugWarn should be worked', () => {
    //spyOn 监听console.warn，mockImplementation控制console.warn的行为执行不同的操作(替身)
    const warn = vi.spyOn(console, 'warn').mockImplementation(() => {});
    debugWarn('scope', 'msg');
    debugWarn(new SyntaxError('custom error')); //创建一个SyntaxError对象，然后抛出错误
    //mock.calls用于记录所有对先前 mock 函数的调用进行测试，toMatchInlineSnapshot用于匹配调用记录
    expect(warn.mock.calls).toMatchInlineSnapshot(`
      [
        [
          [ErUIError: [scope]:msg],
        ],
        [
          [SyntaxError: custom error],
        ],
      ]
    `);
  });
});
