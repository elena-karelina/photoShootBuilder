import styles from "./main.module.css";

function Main() {
  return (
    <div className={styles.main_wrapper}>
      <h1 className={styles.name}>
        <span>Photo</span>
        <span>Shoot</span>
        <span>Builder</span>
      </h1>
      <p>Создай свою идеальную фотосессию</p>
    </div>
  );
}

export default Main;
