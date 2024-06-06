import { ReactNode, MouseEventHandler } from "react";
import styles from "./button.module.css";
interface ButtonProps {
  children: ReactNode;
  type?: "button" | "submit" | "reset";
  variant?: string;
  onClick?: MouseEventHandler<HTMLButtonElement>;
}
function Button({ children, type, variant, onClick }: ButtonProps) {
  return (
    <button
      className={`${styles.button} ${variant && styles[variant]}`}
      type={type}
      onClick={onClick}
    >
      {children}
    </button>
  );
}

export default Button;
