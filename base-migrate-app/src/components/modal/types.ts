export interface ModalType {
  close?: () => void;
  variant?: 'normal' | 'large';
  children: React.ReactNode;
}
