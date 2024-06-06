import * as yup from "yup";

export const registerValidationSchema = yup.object().shape({
  phone: yup
    .string()
    .required("Поле обязательно к заполнению")
    .matches(/^[0-9]*$/, "Введите только цифры"),
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
