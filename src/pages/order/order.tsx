import { useEffect, useState } from "react";
import styles from "./order.module.css";
import Loading from "../../components/ui/loading/loading";
import { useSelector, TypedUseSelectorHook } from "react-redux";
import { RootState } from "../../store/store";
import ServiceInOrder from "./components/section";
import Button from "../../components/ui/button/button";
import Input from "../../components/ui/input/input";
import { FieldErrors, useForm } from "react-hook-form";
import { createOrderValidationSchema } from "../../constants/validationSchemas";
import { yupResolver } from "@hookform/resolvers/yup";
import Textarea from "../../components/ui/textarea/textarea";
import { Checkbox, ConfigProvider, DatePicker, InputNumber } from "antd";
import type { DatePickerProps, InputNumberProps } from "antd";
import ServiceShedule from "./components/serviceShedule";
export interface Item {
  id: number;
  name: string;
  ownerName: string;
  ownerId: number;
  cost: number;
  dateTimeStart?: string;
  dateTimeEnd?: string;
}
interface RequestTimeSlots {
  members: string[] | undefined;
  date: string[] | string | undefined;
  duration: number | undefined;
}
export interface FormData {
  name: string;
  description?: string;
  itemsInApplication: {
    itemId: number;
    ownerId: number;
    dateTimeStart: string;
    dateTimeEnd: string;
  }[];
}
function Order() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isContinueRegistration, setIsContinueRegistration] = useState(false);
  const [serviceList, setServiceList] = useState<Item[]>([]);
  const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
  const { items } = useAppSelector((state) => state.order);
  const [requestsTimeSlots, setRequestTimeSlots] = useState<RequestTimeSlots>({
    members: undefined,
    date: undefined,
    duration: undefined,
  });

  const fetchData = async () => {
    setServiceList(items);
    setIsLoaded(true);
  };
  useEffect(() => {
    fetchData();
  }, []);
  const deleteFromList = (id: number) => {
    setServiceList((prevList) => prevList.filter((item) => item.id !== id));
  };
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({
    resolver: yupResolver(createOrderValidationSchema),
    mode: "onBlur",
  });
  const onSubmit = (data: FormData) => {
    const itemsInApplication = serviceList.map((service) => ({
      itemId: service.id,
      ownerId: service.ownerId,
      dateTimeStart: service.dateTimeStart!,
      dateTimeEnd: service.dateTimeEnd!,
    }));

    const formData: FormData = {
      ...data,
      itemsInApplication:
        itemsInApplication.length > 0 ? itemsInApplication : [],
    };

    console.log(formData);
  };
  const options = serviceList.map((service) => ({
    label: `${service.name} (${service.ownerName})`,
    value: String(service.id),
  }));
  const handleMemberChange = (checkedValues: string[]) => {
    console.log(checkedValues);
    setRequestTimeSlots((prev) => ({
      ...prev,
      members: checkedValues,
    }));
  };
  const onChangeDatePicker: DatePickerProps["onChange"] = (
    date,
    dateString
  ) => {
    console.log(date, dateString);
    setRequestTimeSlots((prev) => ({
      ...prev,
      date: dateString,
    }));
  };
  const onChangeInputNumber: InputNumberProps["onChange"] = (value) => {
    console.log("changed", value);
    setRequestTimeSlots((prev) => ({
      ...prev,
      number: value,
    }));
  };
  const handleRequestsTimeSlots = () => {
    console.log("data for request ", requestsTimeSlots);
  };
  if (!isLoaded) return <Loading />;
  else
    return (
      <ConfigProvider
        theme={{
          token: {
            colorPrimary: "rgb(167, 112, 187)",
          },
        }}
      >
        <div className={styles.order_wrapper}>
          <div className={styles.order}>
            <div className={styles.list}>
              {serviceList &&
                Object.entries(serviceList).map(([key, value]) => (
                  <ServiceInOrder
                    key={key}
                    data={value}
                    delete={deleteFromList}
                  />
                ))}
            </div>
            {!isContinueRegistration && (
              <Button
                variant="small"
                onClick={() => setIsContinueRegistration(true)}
              >
                Оформить
              </Button>
            )}
            {isContinueRegistration && (
              <div className={styles.order_data}>
                <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
                  <Input
                    register={register}
                    name="name"
                    placeholder="Название"
                    variant="addService"
                    errors={errors as FieldErrors<FormData>}
                  />
                  <Textarea
                    placeholder="Пожелания/комментарии"
                    register={register}
                    name="description"
                  />
                  <div className={styles.time_block}>
                    Показать время для:
                    <div className={styles.time_checkbox}>
                      <Checkbox.Group
                        options={options}
                        onChange={handleMemberChange}
                      />
                    </div>
                    <div>
                      <DatePicker
                        onChange={onChangeDatePicker}
                        placeholder="Выберите дату"
                      />
                    </div>
                    <div className={styles.time_block_hours}>
                      Необходимое время в часах:
                      <InputNumber
                        min={1}
                        defaultValue={1}
                        onChange={onChangeInputNumber}
                        size="small"
                      />
                    </div>
                    <Button
                      type="button"
                      variant="small"
                      onClick={handleRequestsTimeSlots}
                    >
                      Показать общие свободные слоты
                    </Button>
                  </div>
                  <div>Назначить время:</div>
                  {serviceList.map((service, index) => (
                    <ServiceShedule
                      register={register}
                      key={service.id}
                      service={service}
                      onDateTimeChange={(dateTimeStart, dateTimeEnd) =>
                        setServiceList((prevList) => {
                          const newList = [...prevList];
                          newList[index] = {
                            ...service,
                            dateTimeStart,
                            dateTimeEnd,
                          };
                          return newList;
                        })
                      }
                    />
                  ))}
                  <Button type="submit" variant="form">
                    Сохранить
                  </Button>
                </form>
              </div>
            )}
          </div>
        </div>
      </ConfigProvider>
    );
}

export default Order;
