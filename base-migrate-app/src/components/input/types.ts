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
  onChange?: (val: string) => void;
  error?: string | React.ReactNode;
}
