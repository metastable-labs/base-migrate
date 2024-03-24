import React from 'react';

export interface InputType {
  label: string;
  type?: 'text' | 'textarea' | 'email' | 'number' | 'tel' | 'url';
  name: string;
  disabled?: boolean;
  valueAlt?: string;
  placeholder?: string;
  multiline?: boolean;
  valid?: boolean;
  value?: string;
  onChange?: (val: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string | React.ReactNode;
  required?: boolean;
}
