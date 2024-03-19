import React from 'react';

export interface InputType {
  label: string;
  type?: 'text' | 'email' | 'number' | 'tel' | 'url';
  name: string;
  disabled?: boolean;
  valueAlt?: string;
  placeholder?: string;
  valid?: boolean;
  value?: string;
  onChange?: (val: string) => void;
  error?: string | React.ReactNode;
}
