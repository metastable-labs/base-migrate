export interface Button {
  onClick?: () => void;
  text: string;
  type?: "button" | "submit" | "reset";
  loading?: boolean;
  disabled?: boolean;
  icon?: React.ReactNode;
  variant?: "primary" | "secondary" | "tertiary";
}
