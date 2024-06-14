import styles from "./register.module.css";
import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { registerValidationSchema } from "../../constants/validationSchemas";
import Input from "../../components/ui/input/input";
import Button from "../../components/ui/button/button";
import reg from "../../shared/api/requests/register/register";
export interface FormData {
  password: string;
  lastname: string;
  firstname: string;
  email: string;
}
interface ApiResponse {
  data: {
    token: string;
  };
}
interface ApiError {
  response: string;
  message: string;
}
function Register() {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({
    resolver: yupResolver(registerValidationSchema),
    mode: "onBlur",
  });
  const onSubmit: SubmitHandler<FormData> = (data) => {
    console.log(data);
    reg(data)
      .then((response: ApiResponse) => {
        const { token } = response.data;
        localStorage.setItem("token", token);
        console.log(response);
      })
      .catch((error: ApiError) => {
        if (error.response) {
          alert(`Ошибка: ${error.message}`);
        }
      });
  };

  return (
    <div className={styles.register}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Input<FormData>
          register={register}
          name="lastname"
          placeholder="Фамилия"
          errors={errors}
        />
        <Input<FormData>
          register={register}
          name="firstname"
          placeholder="Имя"
          errors={errors}
        />
        <Input<FormData>
          register={register}
          name="email"
          placeholder="Почта"
          errors={errors}
        />
        <Input<FormData>
          register={register}
          name="password"
          placeholder="Пароль"
          errors={errors}
        />
        <Button type="submit">Зарегистрироваться</Button>
      </form>
    </div>
  );
}

export default Register;
