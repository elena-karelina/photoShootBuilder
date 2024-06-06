import { Link } from "react-router-dom";
import Logo from "../ui/logo/logo";
import styles from "./header.module.css";

function Header() {
  return (
    <div className={styles.header}>
      <Logo />
      <div className={styles.right}>
        <div className={styles.reqister}>
          <Link to="/register">Регистрация</Link>{" "}
        </div>
        <div className={styles.signin}>
          <Link to="/logIn">Вход</Link>
        </div>
      </div>
    </div>
  );
}

export default Header;
