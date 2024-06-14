import styles from "./profile.module.css";
import photo from "../../assets/photo.jpg";
import city from "../../assets/city.png";
import tg from "../../assets/tg.png";
import inst from "../../assets/inst.png";
import Form, { FormData } from "./components/form/form";
import { PlusOutlined, EditOutlined, FormOutlined } from "@ant-design/icons";
import { ChangeEvent, useState } from "react";
import Button from "../../components/ui/button/button";
function Profile() {
  type DataForm = {
    photo?: string;
    name: string;
    city: string;
    tg?: string;
    inst?: string;
    description?: string;
  };

  const initialData: DataForm = {
    photo: photo,
    name: "Карелина Елена",
    city: "Томск",
    tg: "kapehaeha",
    inst: "kapehaeha",
    description: `
      djdjdjd djdhjdhf fjghgj fi fikf  if f if f if ir r ri  iri ri r  Lorem ipsum dolor sit, amet consectetur adipisicing elit. Nemo cum labore, facilis, ea harum delectus voluptas porro at beatae reiciendis consequatur quam, quae voluptates deserunt eveniet. Culpa vitae consequatur et. \n
      Lorem ipsum dolor sit, amet consectetur adipisicing elit. Nemo cum labore, facilis, ea harum delectus voluptas porro at beatae reiciendis consequatur quam, quae voluptates deserunt eveniet. Culpa vitae consequatur et.
    `,
  };

  const [userData, setUserData] = useState<DataForm>(initialData);
  const IconComponent = userData.description ? EditOutlined : PlusOutlined;
  const descComponent = userData.description ? (
    userData.description
      ?.split("\n")
      .map((line, index) => <p key={index}>{line}</p>)
  ) : (
    <></>
  );
  const [editDescription, setEditDescription] = useState<boolean>(false);
  const [textareaValue, setTextareaValue] = useState(userData.description);
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
  };
  const editDataDescription = () => {
    console.log(textareaValue);
    setEditDescription(false),
      setUserData((prevUserData) => ({
        ...prevUserData,
        description: textareaValue,
      }));
  };
  return (
    <div className={styles.profile_wrapper}>
      <div className={styles.profile}>
        <div className={styles.header_profile}>
          <div>
            <img src={userData.photo} />
          </div>

          <div className={styles.title}>
            <div className={styles.name}>
              {userData.name}
              <Form onSave={handleSave}>
                <FormOutlined style={{ fontSize: "25px" }} />
              </Form>
            </div>
            <div className={styles.contacts}>
              <div>
                <div className={styles.contacts_item}>
                  <img src={city} /> {userData.city ? userData.city : "-"}
                </div>
              </div>

              <div>
                <div className={styles.contacts_item}>
                  <img src={tg} /> {userData.tg ? userData.tg : "-"}
                </div>
                <div className={styles.contacts_item}>
                  <img src={inst} /> {userData.inst ? userData.inst : "-"}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className={styles.info}>
          <div className={styles.description}>
            <span onClick={() => setEditDescription(true)}>
              <IconComponent />
              {userData.description ? "Изменить " : "Добавить "}
              описание
            </span>
            {editDescription ? (
              <>
                <textarea
                  className={styles.textarea}
                  onChange={handleTextareaChange}
                >
                  {userData.description}
                </textarea>
                <Button variant="small" onClick={editDataDescription}>
                  Сохранить
                </Button>
              </>
            ) : (
              descComponent
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
