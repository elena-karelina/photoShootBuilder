import { useEffect, useState } from "react";
import Slider from "../../components/ui/slider/slider";
import getServiceInfo from "../../shared/api/requests/service/getServiceInfo";
import styles from "./service.module.css";
import { Link, useNavigate, useParams } from "react-router-dom";
import Loading from "../../components/ui/loading/loading";
import { DeleteOutlined, FormOutlined } from "@ant-design/icons";
import Form from "./modal/form";
import { useDispatch } from "react-redux";
import { useAuth } from "../../hooks/useAuth";
import deleteService from "../../shared/api/requests/service/deleteService";
import { addService } from "../../store/slices/orderSlice";

export interface ServiceData {
  id: 0;
  ownerUserId: 0;
  ownerName: string;
  itemName: string;
  itemDescription: string;
  costPerHour: 0;
  itemType: 0;
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
interface apiRes {
  data: ServiceData;
}

function Service() {
  const user = useAuth();
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  const [serviceData, setServiceData] = useState<ServiceData>();
  const { id } = useParams();
  const navigate = useNavigate();
  const fetchData = async () => {
    await getServiceInfo(Number(id))
      .then((response: apiRes) => {
        console.log(response.data);

        setServiceData(response.data);
        setIsLoaded(true);
      })
      .catch((error: object) => {
        console.log(error);
      });
  };
  const deleteThisService = async () => {
    await deleteService(Number(id))
      .then((response: object) => {
        console.log(response);
        navigate("/menu");
      })
      .catch((error: object) => {
        console.log(error);
      });
  };
  useEffect(() => {
    fetchData();
  }, []);
  const descComponent = serviceData?.itemDescription ? (
    serviceData.itemDescription
      ?.split("\n")
      .map((line, index) => <p key={index}>{line}</p>)
  ) : (
    <></>
  );
  const addToOrder = () => {
    if (serviceData?.id) {
      dispatch(
        addService({
          item: {
            id: serviceData.id,
            name: serviceData.itemName,
            ownerName: serviceData.ownerName,
            cost: serviceData.costPerHour,
            ownerId: serviceData.ownerUserId,
          },
        })
      );
    }
  };
  if (!isLoaded) return <Loading />;
  else
    return (
      <div className={styles.service_wrapper}>
        <div className={styles.service}>
          <div className={styles.info}>
            <div className={styles.slider}>
              <Slider type="profile" photo="#" />
            </div>
            <div>
              {user.isAuth && (
                <div>
                  <div style={{ textAlign: "right" }} className={styles.icons}>
                    <span onClick={addToOrder}>Добавить в заявку</span>
                    {Number(user.id) == serviceData?.ownerUserId && (
                      <>
                        <Form
                          data={serviceData}
                          onSave={(data) => setServiceData(data)}
                        >
                          <FormOutlined
                            style={{ fontSize: "24px", marginLeft: "20px" }}
                          />
                        </Form>
                        <DeleteOutlined
                          style={{ fontSize: "24px", marginLeft: "20px" }}
                          onClick={deleteThisService}
                        />
                      </>
                    )}
                  </div>
                  <div>
                    <div className={styles.name}>{serviceData?.itemName} </div>
                    <Link
                      to={`/profile/${serviceData?.ownerUserId}`}
                      className={styles.author}
                    >
                      By: {serviceData?.ownerName}
                    </Link>
                  </div>
                </div>
              )}

              <div className={styles.cost}>
                Цена: <span>{serviceData?.costPerHour}₽</span>
              </div>
              <div className={styles.schedule}>
                <div>Понедельник:</div>
                <div>
                  {serviceData?.schedule.monStart &&
                  serviceData?.schedule.monEnd ? (
                    <>{`${serviceData?.schedule.monStart} -
                    ${serviceData?.schedule.monEnd}`}</>
                  ) : (
                    "Bыходной"
                  )}
                </div>
                <div>Вторник:</div>
                <div>
                  {" "}
                  {serviceData?.schedule.tueStart &&
                  serviceData?.schedule.tueEnd ? (
                    <>{`${serviceData?.schedule.tueStart} -
                    ${serviceData?.schedule.tueEnd}`}</>
                  ) : (
                    "Bыходной"
                  )}
                </div>
                <div>Среда:</div>
                <div>
                  {" "}
                  {serviceData?.schedule.wedStart &&
                  serviceData?.schedule.wedEnd ? (
                    <>{`${serviceData?.schedule.wedStart} -
                    ${serviceData?.schedule.wedEnd}`}</>
                  ) : (
                    "Bыходной"
                  )}
                </div>
                <div>Четверг:</div>
                <div>
                  {" "}
                  {serviceData?.schedule.thuStart &&
                  serviceData?.schedule.thuEnd ? (
                    <>{`${serviceData?.schedule.thuStart} -
                    ${serviceData?.schedule.thuEnd}`}</>
                  ) : (
                    "Bыходной"
                  )}
                </div>
                <div>Пятница:</div>
                <div>
                  {" "}
                  {serviceData?.schedule.friStart &&
                  serviceData?.schedule.friEnd ? (
                    <>{`${serviceData?.schedule.friStart} -
                    ${serviceData?.schedule.friEnd}`}</>
                  ) : (
                    "Bыходной"
                  )}
                </div>
                <div>Суббота:</div>
                <div>
                  {" "}
                  {serviceData?.schedule.satStart &&
                  serviceData?.schedule.satEnd ? (
                    <>{`${serviceData?.schedule.satStart} -
                    ${serviceData?.schedule.satEnd}`}</>
                  ) : (
                    "Bыходной"
                  )}
                </div>
                <div>Воскресенье:</div>
                <div>
                  {" "}
                  {serviceData?.schedule.sunStart &&
                  serviceData?.schedule.sunEnd ? (
                    <>{`${serviceData?.schedule.sunStart} -
                    ${serviceData?.schedule.sunEnd}`}</>
                  ) : (
                    "Bыходной"
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className={styles.description}>{descComponent}</div>
        </div>
      </div>
    );
}

export default Service;
