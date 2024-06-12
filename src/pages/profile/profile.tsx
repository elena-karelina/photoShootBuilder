import styles from "./profile.module.css";
import photo from "../../assets/photo.jpg";
import city from "../../assets/city.png";
import tg from "../../assets/tg.png";
import edit from "../../assets/edit_profile.png";
import inst from "../../assets/inst.png";
import Form, { FormData } from "./components/form/form";
import { useState } from "react";
function Profile() {
  type DataForm = {
    photo?: string;
    name: string;
    city: string;
    tg?: string;
    inst?: string;
  };

  const initialData: DataForm = {
    photo: photo,
    name: "Карелина Елена",
    city: "Томск",
    tg: "kapehaeha",
    inst: "kapehaeha",
  };
  const [userData, setUserData] = useState<DataForm>(initialData);

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
  return (
    <div className={styles.profile_wrapper}>
      <div className={styles.profile}>
        <div>
          <img src={userData.photo} />
        </div>

        <div className={styles.title}>
          <div className={styles.name}>
            {userData.name}
            <Form onSave={handleSave}>
              <img src={edit} />
            </Form>
          </div>
          <div className={styles.contacts}>
            <div>
              <div className={styles.contacts_item}>
                <img src={city} /> {userData.city}
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
    </div>
  );
}

export default Profile;
