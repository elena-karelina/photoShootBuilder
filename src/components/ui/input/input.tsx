import styles from "./input.module.css";
import {
  UseFormRegister,
  FieldErrors,
  FieldValues,
  Path,
} from "react-hook-form";

interface InputProps<T extends FieldValues> {
  register: UseFormRegister<T>;
  name: Path<T>;
  placeholder?: string;
  errors?: FieldErrors<T>;
  type?: string;
}

function Input<T extends FieldValues>({
  register,
  name,
  placeholder,
  errors,
  type,
}: InputProps<T>) {
  const path = typeof name === "string" ? name : (name as string);
  return (
    <>
      <input
        type={type ? type : "text"}
        {...register(name)}
        placeholder={placeholder}
        className={`${type ? styles.input_file : styles.input} ${
          errors?.[path] && styles.input_error
        }`}
      />
      {errors && errors[name] && (
        <div className={styles.errors}>{errors[name]?.message as string}</div>
      )}
    </>
  );
}

export default Input;
