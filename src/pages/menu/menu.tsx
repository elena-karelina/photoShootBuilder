import Section from "./components/section";
import styles from "./menu.module.css";

function Menu() {
  return (
    <div className={styles.menu_wrapper}>
      <Section />
      <Section />
      <Section />
    </div>
  );
}

export default Menu;
