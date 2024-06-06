import styles from "./register.module.css";
import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { registerValidationSchema } from "../../constants/validationSchemas";
import Input from "../../components/ui/input/input";
import Button from "../../components/ui/button/button";

function Register() {
  interface FormData {
    phone: string;
    lastname: string;
    firstname: string;
    email: string;
  }
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
  };

  return (
    <div className={styles.register}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Input<FormData>
          register={register}
          name="phone"
          placeholder="Телефон"
          errors={errors}
        />
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
        <Button type="submit">Зарегистрироваться</Button>
      </form>
    </div>
  );
}

export default Register;
