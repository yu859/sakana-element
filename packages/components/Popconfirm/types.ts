import type { ButtonType } from '../Button';

export interface PopconfirmProps {
  title: string;
  confirmButtonText?: string;
  cancelButtonText?: string;
  confirmButtonType?: ButtonType;
  cancelButtonType?: ButtonType;
  icon?: string;
  iconColor?: string;
  hideIcon?: boolean;
  hideAfter?: number;
  width?: number | string;
}

export interface PopconfirmEmits {
  //调用签名 确认，表示一个函数，e表示事件，value表示事件的值
  (e: 'confirm', value: MouseEvent): void;
  //调用签名 取消
  (e: 'cancel', value: MouseEvent): void;
}
