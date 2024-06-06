import styles from "./profile.module.css";
import photo from "../../assets/photo.jpg";
import city from "../../assets/city.png";
import tg from "../../assets/tg.png";
import inst from "../../assets/inst.png";
function Profile() {
  return (
    <div className={styles.profile_wrapper}>
      <div className={styles.profile}>
        <div>
          <img src={photo} />
        </div>

        <div className={styles.title}>
          <div className={styles.name}>Карелина Елена</div>
          <div className={styles.contacts}>
            <div>
              <div className={styles.contacts_item}>
                <img src={city} /> Томск
              </div>
            </div>

            <div>
              <div className={styles.contacts_item}>
                <img src={tg} /> kapehaeha
              </div>
              <div className={styles.contacts_item}>
                <img src={inst} /> kapehaeha
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
