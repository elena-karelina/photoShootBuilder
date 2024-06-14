import * as yup from "yup";

export const registerValidationSchema = yup.object().shape({
  password: yup.string().required("Поле обязательно к заполнению"),
  lastname: yup.string().required("Поле обязательно к заполнению"),
  firstname: yup.string().required("Поле обязательно к заполнению"),
  email: yup
    .string()
    .required("Поле обязательно к заполнению")
    .email("Введите корректный адрес электронной почты"),
});
export const loginValidationSchema = yup.object().shape({
  login: yup.string().required("Поле обязательно к заполнению"),
  password: yup.string().required("Поле обязательно к заполнению"),
});
export const editProfileValidationSchema = yup.object().shape({
  name: yup.string().required("Поле обязательно к заполнению"),
  photo: yup.mixed(),
  city: yup.string().required("Поле обязательно к заполнению"),
  inst: yup.string(),
  tg: yup.string(),
});
