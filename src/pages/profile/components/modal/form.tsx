import React, { useEffect, useMemo, useState } from "react";
import { Modal } from "antd";
import Button from "../../../../components/ui/button/button";
import { FieldErrors, SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { editProfileValidationSchema } from "../../../../constants/validationSchemas";
import Input from "../../../../components/ui/input/input";
import style from "./form.module.css";
import { useAuth } from "../../../../hooks/useAuth";

interface Props {
  children: React.ReactNode;
  onSave: (data: FormData) => void;
}
export interface FormData {
  photo?: FileList;
  name: string;
  city: string;
  tg?: string | null;
  inst?: string | null;
  description?: string;
}
const Form: React.FC<Props> = ({ children, onSave }) => {
  const auth = useAuth();

  const user = useMemo(
    () => ({
      fullName: auth.fullName,
      city: auth.city,
      inst: auth.inst,
      tg: auth.tg,
    }),
    [auth.fullName, auth.city, auth.inst, auth.tg]
  );

  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm({
    resolver: yupResolver(editProfileValidationSchema),
    mode: "onBlur",
    defaultValues: {
      name: user.fullName ? user.fullName : "",
      city: user.city ? user.city : "",
      inst: user.inst,
      tg: user.tg,
    },
  });

  useEffect(() => {
    reset({
      name: user.fullName ? user.fullName : "",
      city: user.city ? user.city : "",
      inst: user.inst,
      tg: user.tg,
    });
  }, [user, reset]);
  const [open, setOpen] = useState(false);

  const showModal = () => {
    setOpen(true);
  };

  const handleOk = () => {
    setOpen(false);
    reset();
  };

  const handleCancel = () => {
    setOpen(false);
    reset();
  };

  const onSubmit: SubmitHandler<FormData> = (data) => {
    console.log(data.photo);
    onSave(data);
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
            name="photo"
            placeholder="Имя"
            type="file"
          />
          <Input<FormData>
            register={register}
            name="name"
            placeholder="Имя"
            errors={errors as FieldErrors<FormData>}
          />
          <Input<FormData>
            register={register}
            name="city"
            placeholder="Город"
            errors={errors as FieldErrors<FormData>}
          />
          <Input<FormData>
            register={register}
            name="tg"
            placeholder="Telegram"
            errors={errors as FieldErrors<FormData>}
          />
          <Input<FormData>
            register={register}
            name="inst"
            placeholder="Instagram"
            errors={errors as FieldErrors<FormData>}
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
