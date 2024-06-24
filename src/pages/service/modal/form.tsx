import React, { useEffect, useState } from "react";
import { ConfigProvider, InputNumber, Modal, Select } from "antd";
import {
  Controller,
  FieldErrors,
  SubmitHandler,
  useForm,
} from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Dayjs } from "dayjs";
import styles from "./form.module.css";
import Button from "../../../components/ui/button/button";
import Input from "../../../components/ui/input/input";
import Textarea from "../../../components/ui/textarea/textarea";
import DayShedule from "../../profile/components/addService/dayShedule";
import { editServiceValidationSchema } from "../../../constants/validationSchemas";
import { ServiceData } from "../service";
import editService from "../../../shared/api/requests/service/editService";

interface Props {
  children: React.ReactNode;
  data: ServiceData;
  onSave: (data: ServiceData) => void;
}
interface apiRes {
  data: ServiceData;
}
export interface FormDataEditService {
  name: string;
  type: string;
  description?: string;
  cost: number;
  schedule: {
    monStart?: string;
    monEnd?: string;
    tueStart?: string;
    tueEnd?: string;
    wedStart?: string;
    wedEnd?: string;
    thuStart?: string;
    thuEnd?: string;
    friStart?: string;
    friEnd?: string;
    satStart?: string;
    satEnd?: string;
    sunStart?: string;
    sunEnd?: string;
  };
}

const Form: React.FC<Props> = ({ children, data, onSave }) => {
  // const user = useMemo(
  //   () => ({
  //     fullName: auth.fullName,
  //     city: auth.city,
  //     inst: auth.inst,
  //     tg: auth.tg,
  //   }),
  //   [auth.fullName, auth.city, auth.inst, auth.tg]
  // );
  const defaultSchedule = {
    monStart: "08:00",
    monEnd: "20:00",
    tueStart: "08:00",
    tueEnd: "20:00",
    wedStart: "08:00",
    wedEnd: "20:00",
    thuStart: "08:00",
    thuEnd: "20:00",
    friStart: "08:00",
    friEnd: "20:00",
    satStart: "08:00",
    satEnd: "20:00",
    sunStart: "08:00",
    sunEnd: "20:00",
  };
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
    setValue,
    control,
  } = useForm({
    resolver: yupResolver(editServiceValidationSchema),
    mode: "onBlur",
    defaultValues: {
      type: String(data.itemType),
      schedule: defaultSchedule,
    },
  });
  const [schedule, setSchedule] = useState<{ [key: string]: string }>(
    defaultSchedule
  );
  useEffect(() => {
    reset({
      type: String(data.itemType),
      name: data.itemName,
      description: data.itemDescription,
      cost: data.costPerHour,
    });
  }, [data, reset]);
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

  const onSubmit: SubmitHandler<FormDataEditService> = (dataModal) => {
    console.log("savedData", dataModal);
    editService(data.id, dataModal)
      .then((response: apiRes) => {
        console.log(response.data);
        onSave(response.data);
        handleOk();
      })
      .catch((error: object) => {
        console.log(error);
      });
  };

  const daysOfWeek = [
    { day: "Понедельник", key: "mon" },
    { day: "Вторник", key: "tue" },
    { day: "Среда", key: "wed" },
    { day: "Четверг", key: "thu" },
    { day: "Пятница", key: "fri" },
    { day: "Суббота", key: "sat" },
    { day: "Воскресенье", key: "sun" },
  ];

  const handleScheduleChange = (key: string, times: [Dayjs, Dayjs] | null) => {
    setSchedule((prevSchedule) => {
      if (times === null) {
        const newSchedule = { ...prevSchedule };
        delete newSchedule[`${key}Start`];
        delete newSchedule[`${key}End`];
        return newSchedule;
      } else {
        return {
          ...prevSchedule,
          [`${key}Start`]: times[0].format("HH:mm"),
          [`${key}End`]: times[1].format("HH:mm"),
        };
      }
    });
  };
  useEffect(() => {
    setValue("schedule", schedule);
  }, [schedule, setValue]);

  return (
    <>
      <span onClick={showModal} className={styles.icon}>
        {children}
      </span>
      <Modal
        open={open}
        title="Редактирование профиля"
        onOk={handleOk}
        onCancel={handleCancel}
        footer={[]}
      >
        <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
          <ConfigProvider
            theme={{
              token: {
                colorPrimary: "rgb(167, 112, 187)",
              },
            }}
          >
            <Input
              register={register}
              name="name"
              errors={errors as FieldErrors<FormData>}
              variant="addService"
              placeholder="Название"
            />
            <Controller
              name="type"
              control={control}
              render={({ field }) => (
                <Select
                  {...field}
                  className={errors.type ? styles.error_select : ""}
                  style={{ width: "200px" }}
                  placeholder="Тип"
                  allowClear
                  options={[
                    { value: "0", label: "Одежда и обувь" },
                    { value: "1", label: "Реквизит" },
                    { value: "2", label: "Техника" },
                    { value: "3", label: "Помещения и места" },
                    { value: "4", label: "Услуги фотографа" },
                    { value: "5", label: "Услуги видеографа" },
                    { value: "6", label: "Услуги визажиста" },
                    { value: "7", label: "Другое" },
                  ]}
                  onChange={(value) => field.onChange(value)}
                />
              )}
            />
            <Textarea
              placeholder="Описание услуги"
              register={register}
              name="description"
            />
            <div>
              Стоимость:
              <Controller
                name="cost"
                control={control}
                render={({ field }) => (
                  <InputNumber
                    {...field}
                    className={styles.cost}
                    defaultValue={1000}
                    min={0}
                    formatter={(value) =>
                      `${value} ₽`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                    }
                    parser={(value) =>
                      value?.replace(/₽\s?|(,*)/g, "") as unknown as number
                    }
                    onChange={(value) => field.onChange(value)}
                  />
                )}
              />
            </div>

            <div>Расписание:</div>
            <div className={styles.days}>
              {daysOfWeek.map(({ day, key }) => (
                <DayShedule
                  key={key}
                  day={day}
                  keyName={key}
                  onScheduleChange={handleScheduleChange}
                />
              ))}
            </div>

            <Button type="submit" variant="form">
              Сохранить
            </Button>
          </ConfigProvider>
        </form>
      </Modal>
    </>
  );
};

export default Form;
