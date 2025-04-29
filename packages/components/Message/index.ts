import Message from './methods';
import { withInstallFunction } from '@sakana-element/utils';

export const ErMessage = withInstallFunction(Message, '$message');

export * from './types';
