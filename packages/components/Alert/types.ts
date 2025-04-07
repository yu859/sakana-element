export type AlertType = 'success' | 'info' | 'warning' | 'danger';

export interface AlertProps {
  title?: string;
  type?: AlertType;
  description?: string; //文字描述
  effect?: 'light' | 'dark';
  closable?: boolean;
  center?: boolean;
  showIcon?: boolean;
}

export interface AlertEmits {
  (e: 'close'): void;
}

export interface AlertInstance {
  open(): void;
  close(): void;
}
