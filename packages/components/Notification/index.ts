import Notification from './methods';
import { withInstallFunction } from '@sakana-element/utils';

export const ErNotification = withInstallFunction(Notification, '$notify');

export * from './types';
