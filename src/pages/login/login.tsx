import styles from "./login.module.css";
import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { loginValidationSchema } from "../../constants/validationSchemas";
import Input from "../../components/ui/input/input";
import Button from "../../components/ui/button/button";
import login from "../../shared/api/requests/login/login";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setUser } from "../../store/slices/userSlice";

export interface FormData {
  login: string;
  password: string;
}
interface ApiResponse {
  data: {
    token: string;
    name: string;
  };
}
interface ApiError {
  response: string;
  message: string;
}
function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
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
      .then((response: ApiResponse) => {
        const { token } = response.data;
        localStorage.setItem("token", token);
        console.log(response);
        dispatch(
          setUser({
            fullName: response.data.name,
            token: token,
          })
        );
        navigate(`/profile/8`);
      })
      .catch((error: ApiError) => {
        console.log(error);
        if (error.response) {
          alert(`Ошибка: ${error.message}`);
        }
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
          placeholder="Пароль"
          errors={errors}
          type="password"
        />

        <Button type="submit">Войти</Button>
      </form>
    </div>
  );
}

export default Login;
