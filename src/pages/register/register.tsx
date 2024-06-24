import styles from "./register.module.css";
import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { registerValidationSchema } from "../../constants/validationSchemas";
import Input from "../../components/ui/input/input";
import Button from "../../components/ui/button/button";
import reg from "../../shared/api/requests/register/register";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setUser } from "../../store/slices/userSlice";
export interface FormData {
  password: string;
  lastname: string;
  firstname: string;
  email: string;
}
interface ApiResponse {
  data: {
    token: string;
    name: string;
    id: string;
  };
}
interface ApiError {
  response: string;
  message: string;
}
function Register() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
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
        console.log(response);
        const { token, name, id } = response.data;
        localStorage.setItem("token", token);
        console.log(response.data.token);
        dispatch(
          setUser({
            fullName: name,
            token: token,
            id: id,
          })
        );
        navigate(`{"/profile/${id}"}`);
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
          type="password"
          placeholder="Пароль"
          errors={errors}
        />
        <Button type="submit">Зарегистрироваться</Button>
      </form>
    </div>
  );
}

export default Register;
