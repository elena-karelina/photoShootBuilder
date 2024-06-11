import * as yup from "yup";

const SUPPORTED_FORMATS = ["image/jpg", "image/jpeg", "image/gif", "image/png"];
const FILE_SIZE_LIMIT = 1024 * 1024 * 5;

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
export const editProfileValidationSchema = yup.object().shape({
  name: yup.string().required("Поле обязательно к заполнению"),
  photo: yup.mixed(),
  city: yup.string().required("Поле обязательно к заполнению"),
  inst: yup.string(),
  tg: yup.string(),
});
