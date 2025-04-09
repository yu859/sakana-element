import { describe, it, expect } from 'vitest';
import {
  debugWarn,
  throwError,
  withInstall,
  makeInstaller,
  typeIconMap,
} from '..';
import { each } from 'lodash-es';

describe('utils/index', () => {
  //it应该做某事，test做某事应该是什么结果
  //被定义时触发提示
  it('debugWarn should be exported', () => {
    expect(debugWarn).toBeDefined();
  });
  it('throwError should be exported', () => {
    expect(throwError).toBeDefined();
  });
  it('withInstall should be exported', () => {
    expect(withInstall).toBeDefined();
  });
  it('makeInstaller should be exported', () => {
    expect(makeInstaller).toBeDefined();
  });
  it('typeIconMap should be worked', () => {
    expect(typeIconMap).toBeDefined();
    each(
      [
        ['info', 'circle-info'],
        ['success', 'check-circle'],
        ['warning', 'circle-exclamation'],
        ['danger', 'circle-xmark'],
        ['error', 'circle-xmark'],
      ],
      ([type, icon]) => {
        expect(typeIconMap.get(type)).toBe(icon);
      }
    );
  });
});
