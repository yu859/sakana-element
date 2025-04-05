import { isString } from 'lodash-es';

class ErUIError extends Error {
  constructor(msg: string) {
    super(msg);
    this.name = 'ErUIError';
  }
}
function createErUIError(scope: string, msg: string) {
  return new ErUIError(`[${scope}]:${msg}`);
}

// 抛出错误
export function throwError(scope: string, msg: string) {
  throw createErUIError(scope, msg); //scope提示错误地方，msg提示错误信息
}

// 打印错误，函数重载，至少满足其中一种情况，而且不能有多余的类型，同一个函数名能够以不同的方式使用
export function debugWarn(error: Error): void; // 传入一个Error对象
export function debugWarn(scope: string, msg: string): void; // 也可以传入一个scope和msg
export function debugWarn(scope: string | Error, msg?: string) {
  if (process.env.NODE_ENV !== 'production') {
    // 开发环境打印错误
    const err = isString(scope) ? createErUIError(scope, msg!) : scope;
    console.warn(err);
  }
}
