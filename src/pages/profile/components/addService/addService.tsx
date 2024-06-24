import {
  Controller,
  FieldErrors,
  SubmitHandler,
  useForm,
} from "react-hook-form";
import Input from "../../../../components/ui/input/input";
import styles from "./addService.module.css";
import { ConfigProvider, InputNumber, Select } from "antd";
import { yupResolver } from "@hookform/resolvers/yup";
import { addServiceValidationSchema } from "../../../../constants/validationSchemas";
import Button from "../../../../components/ui/button/button";
import Textarea from "../../../../components/ui/textarea/textarea";
import { Dayjs } from "dayjs";
import DayShedule from "./dayShedule";
import { useEffect, useState } from "react";
import addService from "../../../../shared/api/requests/profile/addService";
import { useAuth } from "../../../../hooks/useAuth";
import { Item } from "../../../../components/ui/card/card";

export interface FormData {
  photo: FileList;
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
interface Props {
  Cansel: () => void;
  onSave: (data: Item) => void;
}
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
const AddService: React.FC<Props> = ({ Cansel, onSave }) => {
  const user = useAuth();
  const {
    register,
    formState: { errors },
    handleSubmit,
    setValue,
    control,
    //reset,
  } = useForm({
    resolver: yupResolver(addServiceValidationSchema),
    mode: "onBlur",
    defaultValues: {
      schedule: defaultSchedule,
      cost: 1000,
    },
  });
  interface UserServicesResponse {
    data: Item;
  }
  const onSubmit: SubmitHandler<FormData> = (data) => {
    console.log(data);

    addService(data, Number(user.id) as number, user.fullName as string)
      .then((response: UserServicesResponse) => {
        console.log(response);
        onSave(response.data);
        Cansel();
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

  const [schedule, setSchedule] = useState<{ [key: string]: string }>(
    defaultSchedule
  );

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
    <div className={styles.service_wrapper}>
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
          <Select
            {...register("type")}
            onChange={(value) => setValue("type", value)}
            className={errors.type ? styles.error_select : ""}
            style={{ width: "200px" }}
            placeholder="Тип"
            allowClear
            options={[
              { value: "0", label: "Одежда и обувь" },
              { value: "1", label: "Реквизит" },
              { value: "2", label: "Техника" },
              { value: "3", label: "Помещения и места" },
              { value: "4", label: "Услуги фотографи" },
              { value: "5", label: "Услуги фидеографа" },
              { value: "6", label: "Услуги визажиста" },
              { value: "7", label: "Другое" },
            ]}
          />
          <Input
            type="file"
            register={register}
            name="photo"
            multiple={true}
            errors={errors as FieldErrors<FormData>}
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

          <div>
            <Button type="submit" variant="form">
              Добавить
            </Button>
            <Button
              type="button"
              onClick={() => {
                Cansel();
              }}
              variant="form_close"
            >
              Закрыть
            </Button>
          </div>
        </ConfigProvider>
      </form>
    </div>
  );
};

export default AddService;
