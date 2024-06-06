import styles from "./input.module.css";
import { UseFormRegister, FieldErrors } from "react-hook-form";

interface FormValues {
  [key: string]: string;
}

interface InputProps {
  register: UseFormRegister<FormValues>;
  name: string;
  placeholder?: string;
  errors?: FieldErrors;
}
function Input({ register, name, placeholder, errors }: InputProps) {
  return (
    <>
      <input
        {...register(name)}
        placeholder={placeholder}
        className={`${styles.input} ${errors?.[name] && styles.input_error}`}
      />
      {errors?.[name] && (
        <div className={styles.errors}>
          {errors?.[name]?.message || "Error!"}
        </div>
      )}
    </>
  );
}

export default Input;
