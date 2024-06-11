import { Link } from "react-router-dom";
import styles from "./header.module.css";
function Menu() {
  return (
    <div className={styles.menu}>
      <div>
        <Link to="/profile">Профиль</Link>{" "}
      </div>
      <div>
        <Link to="/register">Регистрация</Link>{" "}
      </div>
      <div>
        <Link to="/logIn">Вход</Link>
      </div>
      <div>
        <Link to="/menu">Меню</Link>
      </div>
    </div>
  );
}
export default Menu;
