import Slider from "../../components/ui/slider/slider";
import styles from "./service.module.css";

function Service() {
  return (
    <div className={styles.service_wrapper}>
      <div className={styles.service}>
        <div className={styles.info}>
          <div className={styles.slider}>
            <Slider type="profile" />
          </div>
          <div>
            <div>
              <div className={styles.name}>Индивидуальная фотосессия</div>
              <p className={styles.author}>By: Ирина Ковалева</p>
            </div>

            <div className={styles.cost}>
              Цена: <span>3000</span>
            </div>
            <div className={styles.schedule}>
              <div>Понедельник:</div>
              <div>9:00-18:00</div>
              <div>Вторник:</div>
              <div>9:00-18:00</div>
              <div>Среда:</div>
              <div>9:00-18:00</div>
              <div>Четверг:</div>
              <div>9:00-18:00</div>
              <div>Пятница:</div>
              <div>9:00-18:00</div>
              <div>Суббота:</div>
              <div>Выходной</div>
              <div>Воскресенье:</div>
              <div>Выходной</div>
            </div>
          </div>
        </div>

        <div className={styles.description}>
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Incidunt
          autem voluptate odit. At, deserunt quasi omnis voluptate totam quas
          unde accusamus, libero culpa quo illo natus sapiente ea modi dolore.
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Nesciunt
          nostrum iure, deserunt eius molestiae temporibus quidem ipsum eligendi
          natus et rerum voluptate consectetur veritatis. Sapiente quam
          reprehenderit soluta amet ad. Lorem ipsum dolor sit amet consectetur
          adipisicing elit. Excepturi ea quaerat corporis quas quam mollitia
          nihil sunt alias soluta repellendus accusamus, magnam, sint pariatur
          dolor consequuntur sed quidem qui deserunt? Lorem ipsum dolor sit amet
          consectetur adipisicing elit. Culpa assumenda corporis nemo aut iste
          ad iure quam unde, eaque libero quos fugit at veniam facilis
          reiciendis? Est temporibus quis odio! Lorem, ipsum dolor sit amet
          consectetur adipisicing elit. Fugit cupiditate eos mollitia aliquam,
          itaque magnam ex accusamus labore voluptatibus voluptate laboriosam,
          perferendis, perspiciatis architecto maiores omnis! Laborum tempore
          nam unde!
        </div>
      </div>
    </div>
  );
}

export default Service;
