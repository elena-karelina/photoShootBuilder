import { FieldErrors, SubmitHandler, useForm } from "react-hook-form";
import Input from "../../../../components/ui/input/input";
import styles from "./addService.module.css";
import { Checkbox, ConfigProvider, Select, Slider } from "antd";
import { yupResolver } from "@hookform/resolvers/yup";
import { addServiceValidationSchema } from "../../../../constants/validationSchemas";
import Button from "../../../../components/ui/button/button";
import Textarea from "../../../../components/ui/textarea/textarea";
import DecimalStep from "../slider/slider";
import { QuestionCircleOutlined } from "@ant-design/icons";

import Hints from "../tooltip/tooltip";

interface FormData {
  photo: FileList;
  name: string;
  type: string;
  description?: string;
  price: string;
  weekends?: string[];
  workHours: number[];
  timeSlot: number;
}
interface Props {
  onSave: () => void;
}
const AddService: React.FC<Props> = ({ onSave }) => {
  const {
    register,
    formState: { errors },
    handleSubmit,
    setValue,
    reset,
  } = useForm({
    resolver: yupResolver(addServiceValidationSchema),
    mode: "onBlur",
    defaultValues: {
      workHours: [8, 18],
      timeSlot: 1,
    },
  });

  const onSubmit: SubmitHandler<FormData> = (data) => {
    console.log(data);
    //onSave();
  };
  const options = [
    { label: "Понедельник", value: "Monday" },
    { label: "Вторник", value: "Tuesday" },
    { label: "Среда", value: "Wednesday" },
    { label: "Четверг", value: "Thursday" },
    { label: "Пятница", value: "Friday" },
    { label: "Суббота", value: "Saturday" },
    { label: "Воскресенье", value: "Sunday" },
  ];
  const handleWeekendsChange = (checkedValues: string[]) => {
    setValue("weekends", checkedValues);
    console.log(checkedValues);
  };
  const handleSliderChange = (value: number[]) => {
    setValue("workHours", value);
  };
  const handleTimeSlotChange = (value: number) => {
    setValue("timeSlot", value);
  };

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
          <div>Прайс</div>
          <Textarea
            register={register}
            errors={errors as FieldErrors<FormData>}
            name="price"
          />
          <div className={styles.weekends}>
            <span>
              <Hints title="Эти дни будут не активны во всем расписании">
                <QuestionCircleOutlined style={{ marginRight: "5px" }} />
              </Hints>
              Выходные:
            </span>

            <div className={styles.weekends_checkbox}>
              <Checkbox.Group
                options={options}
                onChange={handleWeekendsChange}
              />
            </div>
          </div>
          <div className={styles.slots}>
            <div>Рабочий день:</div>
            <Slider
              range
              defaultValue={[8, 18]}
              min={0}
              max={24}
              step={0.1}
              tooltip={{ open: true }}
              onChange={handleSliderChange}
            />
          </div>
          <div className={styles.slots}>
            <div>
              <Hints title="Выберите длину отрезков в часах, на которые поделить ваш рабочий день">
                <QuestionCircleOutlined style={{ marginRight: "5px" }} />
              </Hints>
              Размер временных слотов:
            </div>
            <DecimalStep onChange={handleTimeSlotChange} />
          </div>
          <div>
            <Button type="submit" variant="form">
              Добавить
            </Button>
            <Button
              type="button"
              onClick={() => {
                onSave();
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
