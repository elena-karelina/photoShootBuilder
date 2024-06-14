import styles from "./login.module.css";
import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { loginValidationSchema } from "../../constants/validationSchemas";
import Input from "../../components/ui/input/input";
import Button from "../../components/ui/button/button";
import login from "../../shared/api/requests/login/login";

export interface FormData {
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
    login(data)
      .then((response: object) => {
        //const { token } = response.data;
        //localStorage.setItem("token", token);
        console.log(response);
      })
      .catch((error: object) => {
        console.log(error);
        // if (error.response) {
        //   alert(`Ошибка: ${error.message}`);
        // }
      });
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
