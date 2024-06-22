import { ChangeEvent } from "react";
import styles from "./textarea.module.css";
import {
  FieldErrors,
  FieldValues,
  UseFormRegister,
  Path,
} from "react-hook-form";

interface Props<T extends FieldValues> {
  children?: React.ReactNode;
  onChange?: (event: ChangeEvent<HTMLTextAreaElement>) => void;
  placeholder?: string;
  register?: UseFormRegister<T>;
  name: Path<T>;
  errors?: FieldErrors<T>;
}

const Textarea = <T extends FieldValues>({
  children,
  onChange,
  placeholder,
  register,
  name,
  errors,
}: Props<T>) => {
  return (
    <>
      <textarea
        {...(register && name && register(name))}
        className={`${styles.textarea} ${
          errors && name && errors[name] ? styles.error : ""
        }`}
        onChange={onChange}
        placeholder={placeholder}
      >
        {children}
      </textarea>
      {errors && name && errors[name] && (
        <div className={styles.errors}>{errors[name]?.message as string}</div>
      )}
    </>
  );
};
export default Textarea;
