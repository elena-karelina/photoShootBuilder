import { useEffect, useState } from "react";
import Slider from "../../components/ui/slider/slider";
import getServiceInfo from "../../shared/api/requests/service/getServiceInfo";
import styles from "./service.module.css";
import { useParams } from "react-router-dom";
import Loading from "../../components/ui/loading/loading";
import { DeleteOutlined, FormOutlined } from "@ant-design/icons";

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
  const [isLoaded, setIsLoaded] = useState(false);
  const [serviceData, setServiceData] = useState<ServiceData>();
  const { id } = useParams();
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
  if (!isLoaded) return <Loading />;
  else
    return (
      <div className={styles.service_wrapper}>
        <div className={styles.service}>
          <div className={styles.info}>
            <div className={styles.slider}>
              <Slider type="profile" />
            </div>
            <div>
              <div>
                <div className={styles.name}>
                  {serviceData?.itemName}{" "}
                  <FormOutlined
                    style={{ fontSize: "24px", marginLeft: "20px" }}
                  />
                  <DeleteOutlined
                    style={{ fontSize: "24px", marginLeft: "20px" }}
                  />
                </div>
                <p className={styles.author}>By: {serviceData?.ownerName}</p>
              </div>

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
