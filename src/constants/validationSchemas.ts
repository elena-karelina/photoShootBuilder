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
  inst: yup.string().nullable(),
  tg: yup.string().nullable(),
});
export const addServiceValidationSchema = yup.object().shape({
  type: yup.string().required("Поле обязательно к заполнению"),
  name: yup.string().required("Поле обязательно к заполнению"),
  photo: yup
    .mixed<FileList>()
    .test("fileRequired", "Выберите хотя бы один файл", (value) => {
      if (value instanceof FileList) {
        return value.length > 0;
      }
      return false;
    })
    .required("Поле обязательно к заполнению"),
  description: yup.string(),
  cost: yup
    .number()
    .required("Поле обязательно к заполнению")
    .positive("Стоимость должна быть положительной"),
  schedule: yup.object().shape({
    monStart: yup.string(),
    monEnd: yup.string(),
    tueStart: yup.string(),
    tueEnd: yup.string(),
    wedStart: yup.string(),
    wedEnd: yup.string(),
    thuStart: yup.string(),
    thuEnd: yup.string(),
    friStart: yup.string(),
    friEnd: yup.string(),
    satStart: yup.string(),
    satEnd: yup.string(),
    sunStart: yup.string(),
    sunEnd: yup.string(),
  }),
});
export const editServiceValidationSchema = yup.object().shape({
  type: yup.string().required("Поле обязательно к заполнению"),
  name: yup.string().required("Поле обязательно к заполнению"),
  description: yup.string(),
  cost: yup
    .number()
    .required("Поле обязательно к заполнению")
    .positive("Стоимость должна быть положительной"),
  schedule: yup.object().shape({
    monStart: yup.string(),
    monEnd: yup.string(),
    tueStart: yup.string(),
    tueEnd: yup.string(),
    wedStart: yup.string(),
    wedEnd: yup.string(),
    thuStart: yup.string(),
    thuEnd: yup.string(),
    friStart: yup.string(),
    friEnd: yup.string(),
    satStart: yup.string(),
    satEnd: yup.string(),
    sunStart: yup.string(),
    sunEnd: yup.string(),
  }),
});
export const createOrderValidationSchema = yup.object().shape({
  name: yup.string().required("Поле обязательно к заполнению"),
  description: yup.string(),
  itemsInApplication: yup.array().of(
    yup.object().shape({
      itemId: yup.number().required(),
      ownerId: yup.number().required(),
      dateTimeStart: yup.string().required(),
      dateTimeEnd: yup.string().required(),
    })
  ),
});
