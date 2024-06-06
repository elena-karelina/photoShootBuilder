import styles from "./login.module.css";
import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { loginValidationSchema } from "../../constants/validationSchemas";
import Input from "../../components/ui/input/input";
import Button from "../../components/ui/button/button";

interface FormData {
  login: string;
  password: string;
}
function Login() {
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
        <Input<FormData>
          register={register}
          name="login"
          placeholder="Логин"
          errors={errors}
        />
        <Input<FormData>
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
