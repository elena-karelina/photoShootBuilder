import React, { useState } from "react";
import { Modal } from "antd";
import Button from "../../../../components/ui/button/button";
import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { editProfileValidationSchema } from "../../../../constants/validationSchemas";
import Input from "../../../../components/ui/input/input";
import style from "./form.module.css";

interface Props {
  children: React.ReactNode;
}
interface FormData {
  name: string;
  city: string;
  tg?: string;
  inst?: string;
}
const Form: React.FC<Props> = ({ children }) => {
  const [open, setOpen] = useState(false);

  const showModal = () => {
    setOpen(true);
  };

  const handleOk = () => {
    setOpen(false);
  };

  const handleCancel = () => {
    setOpen(false);
    reset();
  };

  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm({
    resolver: yupResolver(editProfileValidationSchema),
    mode: "onBlur",
  });

  const onSubmit: SubmitHandler<FormData> = (data) => {
    console.log(data);
    handleOk();
  };

  return (
    <>
      <span onClick={showModal}>{children}</span>
      <Modal
        open={open}
        title="Редактирование профиля"
        onOk={handleOk}
        onCancel={handleCancel}
        footer={[]}
      >
        <form onSubmit={handleSubmit(onSubmit)} className={style.form}>
          <Input<FormData>
            register={register}
            name="name"
            placeholder="Имя"
            errors={errors}
          />
          <Input<FormData>
            register={register}
            name="city"
            placeholder="Город"
            errors={errors}
          />
          <Input<FormData>
            register={register}
            name="tg"
            placeholder="Telegram"
            errors={errors}
          />
          <Input<FormData>
            register={register}
            name="inst"
            placeholder="Instagram"
            errors={errors}
          />

          <Button type="submit" variant="form">
            Сохранить
          </Button>
        </form>
      </Modal>
    </>
  );
};

export default Form;
