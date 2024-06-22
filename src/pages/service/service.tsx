import Slider from "../../components/ui/slider/slider";
import styles from "./service.module.css";

function Service() {
  return (
    <div className={styles.service_wrapper}>
      <div className={styles.service}>
        <div className={styles.slider}>
          <Slider type="profile" />
        </div>
        <h2 className={styles.name}>Индивидуальная фотосессия</h2>
      </div>
    </div>
  );
}

export default Service;
