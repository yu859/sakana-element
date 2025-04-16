import { isNumber, isString } from 'lodash-es';
import { debugWarn } from './error';

const SCOPE = 'utils/style' as const;

const isStringNumber = (val: string): boolean => {
  if (!isString(val)) {
    // 如果不是字符串，返回false
    return false;
  }
  return !Number.isNaN(Number(val)); // 如果是数字，返回true
};

export function addUnit(val?: string | number, defaultUnit = 'px') {
  if (!val) return '';
  if (isNumber(val) || isStringNumber(val)) {
    return `${val}${defaultUnit}`;
  }
  if (isString(val)) {
    return val;
  }
  debugWarn(SCOPE, 'binding value must be a string or number');
}
