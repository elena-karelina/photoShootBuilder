import { DatePicker, DatePickerProps } from "antd";
import styles from "./components.module.css";
import { Item } from "../order";
import { Dayjs } from "dayjs";
import { useState } from "react";
interface Props {
  service: Item;
  onDateTimeChange: (start: string, end: string) => void;
  register: any;
}
const ServiceShedule: React.FC<Props> = ({
  service,
  onDateTimeChange,
  register,
}) => {
  register(`itemsInApplication[${service.id}].itemId`, { required: true });
  register(`itemsInApplication[${service.id}].ownerId`, { required: true });
  register(`itemsInApplication[${service.id}].dateTimeStart`, {
    required: true,
  });
  register(`itemsInApplication[${service.id}].dateTimeEnd`, { required: true });

  const [startDate, setStartDate] = useState<Dayjs | null>(null);
  const [endDate, setEndDate] = useState<Dayjs | null>(null);

  const handleStartChange: DatePickerProps<Dayjs>["onChange"] = (
    date,
    dateString
  ) => {
    const selectedDate = Array.isArray(dateString) ? dateString[0] : dateString;
    setStartDate(date);
    onDateTimeChange(
      selectedDate,
      endDate ? endDate.format("YYYY-MM-DD HH:mm") : ""
    );
  };

  const handleEndChange: DatePickerProps<Dayjs>["onChange"] = (
    date,
    dateString
  ) => {
    const selectedDate = Array.isArray(dateString) ? dateString[0] : dateString;
    setEndDate(date);
    onDateTimeChange(
      startDate ? startDate.format("YYYY-MM-DD HH:mm") : "",
      selectedDate
    );
  };

  return (
    <div className={styles.day}>
      <span>{service.name}</span>
      <div className={styles.day}></div>
      <DatePicker
        onChange={handleStartChange}
        showTime={{ format: "HH:mm", minuteStep: 1 }}
        format="YYYY-MM-DD HH:mm"
        placeholder="Введите начало"
      />
      <DatePicker
        onChange={handleEndChange}
        showTime={{ format: "HH:mm", minuteStep: 1 }}
        format="YYYY-MM-DD HH:mm"
        placeholder="Введите конец"
      />
    </div>
  );
};

export default ServiceShedule;
