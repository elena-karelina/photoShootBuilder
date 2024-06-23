import { Checkbox, CheckboxProps, TimePicker } from "antd";
import styles from "./addService.module.css";
import dayjs, { Dayjs } from "dayjs";
import { useState } from "react";
interface Props {
  day: string;
  keyName: string;
  onScheduleChange: (key: string, times: [Dayjs, Dayjs] | null) => void;
}
const DayShedule: React.FC<Props> = ({ day, keyName, onScheduleChange }) => {
  const [isWek, setIsWek] = useState(false);
  const [timeRange, setTimeRange] = useState<[Dayjs, Dayjs]>([
    dayjs("08:00", "HH:mm"),
    dayjs("20:00", "HH:mm"),
  ]);

  const onChange: CheckboxProps["onChange"] = (e) => {
    const newIsWek = e.target.checked;
    setIsWek(newIsWek);
    onScheduleChange(keyName, newIsWek ? null : timeRange);
  };

  const onTimeChange = (times: [Dayjs | null, Dayjs | null] | null) => {
    if (times && times[0] && times[1]) {
      const validTimes = [times[0], times[1]] as [Dayjs, Dayjs];
      setTimeRange(validTimes);
      onScheduleChange(keyName, validTimes);
    }
  };
  return (
    <div className={styles.day}>
      <span>{day}</span>
      <TimePicker.RangePicker
        format="HH:mm"
        value={timeRange}
        onChange={onTimeChange}
        disabled={isWek}
      />
      <Checkbox onChange={onChange}>Выходной</Checkbox>
    </div>
  );
};

export default DayShedule;
