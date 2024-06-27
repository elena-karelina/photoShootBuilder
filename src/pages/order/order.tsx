import {ChangeEvent, useEffect, useState} from "react";
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
// import instance from "../../shared/api/requests/axiosInstance.ts";
import instanceAn from "../../shared/api/requests/axiosInstanceAN.ts";
import {useAuth} from "../../hooks/useAuth.ts";
import {parseISO} from "date-fns";
export interface Item {
  id: number;
  name: string;
  ownerName: string;
  ownerId: number;
  cost: number;
  dateTimeStart?: string | undefined | Date;
  dateTimeEnd?: string | undefined | Date;
}
interface RequestTimeSlots {
  members: string[] | undefined;
  date: string[] | string | undefined;
  duration: number | undefined;
  number: number | undefined;
}

interface TimeSlot {
  start: Date;
  end: Date;
}
export interface FormData {
  name: string;
  description?: string;
  itemsInApplication: {
    itemId: number;
    ownerId: number;
    dateTimeStart: string | Date;
    dateTimeEnd: string | Date;
  }[];
}

export interface ItemInApplication {
  itemId: number;
  ownerId: number;
  dateTimeStart: string | undefined | Date;
  dateTimeEnd: string | undefined | Date;
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
  const [timeSlots, setTimeSlots] = useState<TimeSlot[]>([]);
  const user = useAuth();
  const [description, setDescription] = useState("");
  const [name, setName] = useState("");
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

  const handleNameInputChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setName(event.target.value);
  };
  const handleTextareaChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setDescription(event.target.value);
  };

  const handleRequestsTimeSlots = () => {
    console.log("data for request ", requestsTimeSlots);

    instanceAn.post("application/reservationTime", {
      hours: requestsTimeSlots.number,
      applicationDate: requestsTimeSlots.date,
      itemsId: requestsTimeSlots.members,
    })
        .then(response => {
          // Обработка успешного ответа
          if (Array.isArray(response.data)) {
            // Проверка, что данные в правильном формате
            const parsedTimeSlots = response.data.map((slot: any) => ({
              start: new Date(slot.start),
              end: new Date(slot.end),
            }));
            setTimeSlots(parsedTimeSlots);
            console.log(response.data);
          } else {
            console.error("Неверный формат данных от сервера");
          }
        })
        .catch(error => {
          // Обработка ошибок
          console.error("Ошибка при отправке запроса:", error);
        });
  };

  const handleCreate = () => {

   const  itemsInApplication:ItemInApplication[] =[
     {
       itemId: serviceList[0].id,
       ownerId: serviceList[0].ownerId,
       dateTimeStart: parseISO(serviceList[0].dateTimeStart).toISOString(),
       dateTimeEnd: parseISO(serviceList[0].dateTimeEnd).toISOString()
     }
   ];

console.log(itemsInApplication);
    instanceAn.post("application/create", {
      ownerUserId: user.id,
      ownerName: user.fullName,
      applicationName: name,
      applicationDescription: description,
      itemsInApplication: itemsInApplication,
    })
        .then(response => {
          console.log(response.data);
          // Обработка успешного ответа
          if (Array.isArray(response.data)) {
            // Проверка, что данные в правильном формате
            console.log(response.data);
          } else {
            console.error("Неверный формат данных от сервера");
          }
        })
        .catch(error => {
          // Обработка ошибок
          console.error("Ошибка при отправке запроса:", error);
        });
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
                    onChange={handleNameInputChange}
                  />
                  <Textarea
                    placeholder="Пожелания/комментарии"
                    register={register}
                    name="description"
                    onChange={handleTextareaChange}
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

                    {/* Вывод таймслотов */}
                    {timeSlots.map((slot, index) => (
                        <div key={index}>
                          <p>
                            {slot.start.toLocaleDateString('ru-RU', { day: 'numeric', month: 'long' })}
                            {slot.start.toLocaleTimeString('ru-RU', { hour: 'numeric', minute: 'numeric' })}
                            -
                            {slot.end.toLocaleTimeString('ru-RU', { hour: 'numeric', minute: 'numeric' })}
                          </p>
                        </div>
                    ))}

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
                  <Button type="submit" variant="form" onClick={handleCreate}>
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
