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
  variant?: string;
  multiple?: boolean;
}

function Input<T extends FieldValues>({
  register,
  name,
  placeholder,
  errors,
  type,
  multiple,
  variant,
}: InputProps<T>) {
  const path = typeof name === "string" ? name : (name as string);
  return (
    <>
      <input
        type={type ? type : "text"}
        {...register(name)}
        placeholder={placeholder}
        className={`${type == "file" ? styles.input_file : styles.input} ${
          errors?.[path] && type != "file" && styles.input_error
        } ${errors?.photo && type == "file" && styles.file_error}
        ${variant ? styles[variant] : ""}`}
        multiple={multiple ? true : undefined}
      />
      {errors && errors[name] && type != "file" && (
        <div className={styles.errors}>{errors[name]?.message as string}</div>
      )}
    </>
  );
}

export default Input;
