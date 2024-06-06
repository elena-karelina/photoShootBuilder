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
}

function Input<T extends FieldValues>({
  register,
  name,
  placeholder,
  errors,
}: InputProps<T>) {
  const path = typeof name === "string" ? name : (name as string);
  return (
    <>
      <input
        {...register(name)}
        placeholder={placeholder}
        className={`${styles.input} ${errors?.[path] && styles.input_error}`}
      />
      {errors?.[name] && (
        <div className={styles.errors}>
          {(errors?.[path]?.message as string) || "Error!"}
        </div>
      )}
    </>
  );
}

export default Input;
