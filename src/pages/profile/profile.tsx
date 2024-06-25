import styles from "./profile.module.css";
import photo from "../../assets/photo.jpg";
import city from "../../assets/city.png";
import tg from "../../assets/tg.png";
import inst from "../../assets/inst.png";
import Form, { FormData } from "./components/modal/form";
import { PlusOutlined, EditOutlined, FormOutlined } from "@ant-design/icons";
import { ChangeEvent, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import Button from "../../components/ui/button/button";
import AddService from "./components/addService/addService";
import getData from "../../shared/api/requests/profile/getData";
import Textarea from "../../components/ui/textarea/textarea";
import { useAuth } from "../../hooks/useAuth";
import { setUser } from "../../store/slices/userSlice";
import Card, { Item } from "../../components/ui/card/card";
import editDescription from "../../shared/api/requests/profile/editDescription";
import editData from "../../shared/api/requests/profile/editData";
import { useParams } from "react-router-dom";
import getServices from "../../shared/api/requests/profile/getServices";
import Loading from "../../components/ui/loading/loading";

export type UserData = {
  photo?: string;
  name: string;
  city?: string;
  tg?: string;
  inst?: string;
  description?: string;
};

function Profile() {
  interface ApiResponse {
    data: {
      id: number;
      name: string;
      avatar: File;
      city: string;
      instagram: string;
      telegram: string;
      description: string;
    };
  }

  interface GetServicesResponse {
    data: { items: Item[] };
  }
  const { id } = useParams();
  const [userData, setUserData] = useState<UserData>();
  const [isLoaded, setIsLoaded] = useState(false);
  const [isLoadedServices, setIsLoadedServices] = useState(false);
  const [serviceList, setServiceList] = useState<Item[]>([]);
  const dispatch = useDispatch();
  const user = useAuth();
  if (user.token) localStorage.setItem("token", user.token);
  const IconComponent = userData?.description ? EditOutlined : PlusOutlined;
  const descComponent = userData?.description ? (
    userData.description
      ?.split("\n")
      .map((line, index) => <p key={index}>{line}</p>)
  ) : (
    <></>
  );
  const [isEditDescription, setEditDescription] = useState<boolean>(false);
  const [addService, setAddService] = useState<boolean>(false);
  const [textareaValue, setTextareaValue] = useState(userData?.description);
  const handleTextareaChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setTextareaValue(event.target.value);
  };

  const handleSave = (data: FormData) => {
    console.log("Saved data:", data);
    setUserData((prevUserData) => ({
      ...prevUserData,
      name: data.name,
      city: data.city,
      tg: data.tg,
      inst: data.inst,
    }));
    if (data.photo && data.photo[0]) {
      const file = data.photo[0];
      const reader = new FileReader();

      reader.onloadend = () => {
        const photoDataUrl = reader.result as string;
        setUserData((prevUserData) => ({
          ...prevUserData,
          photo: photoDataUrl,
        }));
      };

      reader.readAsDataURL(file);
    }
    dispatch(
      setUser({
        fullName: data.name,
        city: data.city,
        tg: data.tg ? data.tg : "",
        inst: data.inst ? data.inst : "",
      })
    );
    editData(data)
      .then((response: object) => {
        console.log(response);
      })
      .catch((error: object) => {
        console.log(error);
      });
  };
  const editDataDescription = () => {
    console.log(textareaValue);
    setEditDescription(false),
      setUserData((prevUserData) => ({
        ...prevUserData,
        description: textareaValue,
      }));
    editDescription(textareaValue ? textareaValue : null)
      .then((response: ApiResponse) => {
        console.log(response);
      })
      .catch((error: object) => {
        console.log(error);
      });
    console.log(userData?.description);
  };

  const fetchData = async () => {
    if (user && user.token) {
      console.log(1);
      user.id &&
        (await getData(id as string)
          .then((response: ApiResponse) => {
            console.log(response);
            const userData = response.data;
            setUserData((prevUserData) => ({
              ...prevUserData,
              name: userData.name,
              city: userData.city,
              tg: userData.telegram,
              inst: userData.instagram,
              description: userData.description,
              photo: userData.avatar,
            }));
            setIsLoaded(true);
            dispatch(
              setUser({
                fullName: userData.name,
                city: userData.city,
                tg: userData.telegram,
                inst: userData.instagram,
              })
            );
            console.log(user);
          })
          .catch((error: object) => {
            console.log(error, user);
          }));
    }
    await getServices(Number(id))
      .then((response: GetServicesResponse) => {
        console.log("Услуги профиля", response.data.items);
        setServiceList(response.data.items);
        setIsLoadedServices(true);
      })
      .catch((error: object) => {
        console.log(error);
      });
  };

  useEffect(() => {
    fetchData();
  }, []);
  if (!isLoaded) return <Loading />;
  else
    return (
      <div className={styles.profile_wrapper}>
        <div className={styles.profile}>
          <div className={styles.header_profile}>
            <div>
              <img src={userData?.photo ? userData.photo : photo} />
            </div>

            <div className={styles.title}>
              <div className={styles.name}>
                {userData?.name}
                {userData && id == user.id && (
                  <Form onSave={handleSave}>
                    <FormOutlined style={{ fontSize: "25px" }} />
                  </Form>
                )}
              </div>
              <div className={styles.contacts}>
                <div>
                  <div className={styles.contacts_item}>
                    <img src={city} /> {user.city ? user.city : "-"}
                  </div>
                </div>

                <div>
                  <div className={styles.contacts_item}>
                    <img src={tg} /> {userData?.tg ? userData.tg : "-"}
                  </div>
                  <div className={styles.contacts_item}>
                    <img src={inst} /> {userData?.inst ? userData.inst : "-"}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className={styles.info}>
            <div className={styles.description}>
              {id == user.id && (
                <span onClick={() => setEditDescription(true)}>
                  <IconComponent />
                  {userData?.description ? "Изменить " : "Добавить "}
                  описание
                </span>
              )}

              {isEditDescription ? (
                <>
                  <Textarea
                    onChange={handleTextareaChange}
                    placeholder="Описание"
                    name="description"
                  >
                    {userData?.description}
                  </Textarea>
                  <Button onClick={editDataDescription} variant="form">
                    Сохранить
                  </Button>
                  <Button
                    onClick={() => setEditDescription(false)}
                    variant="form_close"
                  >
                    Закрыть
                  </Button>
                </>
              ) : (
                descComponent
              )}
            </div>
            {id == user.id && (
              <div className={styles.addServices}>
                {addService ? (
                  <AddService
                    Cansel={() => setAddService(false)}
                    onSave={(data: Item) =>
                      setServiceList((prevServiceList) => [
                        ...prevServiceList,
                        data,
                      ])
                    }
                  />
                ) : (
                  <span onClick={() => setAddService(true)}>
                    <PlusOutlined />
                    Добавить услугу
                  </span>
                )}
              </div>
            )}
            {!isLoadedServices && <Loading />}
            {serviceList.length > 0 && (
              <div className={styles.services}>
                <div>Услуги</div>
                <div className={styles.services_card}>
                  {serviceList.map((item, key) => (
                    <Card key={key} type="profile" data={item} />
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    );
}

export default Profile;
