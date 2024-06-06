import styles from "./login.module.css";
import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { loginValidationSchema } from "../../constants/validationSchemas";
import Input from "../../components/ui/input/input";
import Button from "../../components/ui/button/button";

function Login() {
  interface FormData {
    login: string;
    password: string;
  }
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({
    resolver: yupResolver(loginValidationSchema),
    mode: "onBlur",
  });
  const onSubmit: SubmitHandler<FormData> = (data) => {
    console.log(data);
  };

  return (
    <div className={styles.login}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Input
          register={register}
          name="login"
          placeholder="Логин"
          errors={errors}
        />
        <Input
          register={register}
          name="password"
          placeholder="пароль"
          errors={errors}
        />

        <Button type="submit">Войти</Button>
      </form>
    </div>
  );
}

export default Login;
