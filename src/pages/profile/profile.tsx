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
import Card from "../../components/ui/card/card";

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
    };
  }

  const [userData, setUserData] = useState<UserData>();
  const [isLoaded, setIsLoaded] = useState(false);
  const dispatch = useDispatch();
  const user = useAuth();
  const IconComponent = userData?.description ? EditOutlined : PlusOutlined;
  const descComponent = userData?.description ? (
    userData.description
      ?.split("\n")
      .map((line, index) => <p key={index}>{line}</p>)
  ) : (
    <></>
  );
  const [editDescription, setEditDescription] = useState<boolean>(false);
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
  };
  const editDataDescription = () => {
    console.log(textareaValue);
    setEditDescription(false),
      setUserData((prevUserData) => ({
        ...prevUserData,
        description: textareaValue,
      }));
    console.log(userData?.description);
  };

  const fetchData = async () => {
    if (user && user.token) {
      await getData(user.token)
        .then((response: ApiResponse) => {
          console.log(response);
          const userData = response.data;
          setUserData((prevUserData) => ({
            ...prevUserData,
            name: userData.name,
            city: userData.city,
            tg: userData.telegram,
            inst: userData.instagram,
          }));
          setIsLoaded(true);
          dispatch(
            setUser({
              fullName: userData.name,
              city: userData.city,
              tg: userData.telegram,
              inst: userData.instagram,
              id: String(userData.id),
            })
          );
          console.log(user);
        })
        .catch((error: object) => {
          console.log(error);
        });
    }
  };

  useEffect(() => {
    fetchData();
  }, []);
  if (isLoaded)
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
                {userData && (
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
              <span onClick={() => setEditDescription(true)}>
                <IconComponent />
                {userData?.description ? "Изменить " : "Добавить "}
                описание
              </span>
              {editDescription ? (
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
            <div className={styles.addServices}>
              {addService ? (
                <AddService onSave={() => setAddService(false)} />
              ) : (
                <span onClick={() => setAddService(true)}>
                  <PlusOutlined />
                  Добавить услугу
                </span>
              )}
            </div>

            <div className={styles.services}>
              <div>Услуги</div>
              <div className={styles.services_card}>
                <Card type="profile" />
                <Card type="profile" />
                <Card type="profile" />
                <Card type="profile" />
                <Card type="profile" />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
}

export default Profile;
