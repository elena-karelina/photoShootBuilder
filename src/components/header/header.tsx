import { Link } from "react-router-dom";
import Logo from "../ui/logo/logo";
import { MenuOutlined } from "@ant-design/icons";
import styles from "./header.module.css";
import Menu from "./menu";

function Header() {
  return (
    <div className={styles.header}>
      <div className={styles.left}>
        <Logo />
        <MenuOutlined
          style={{ fontSize: "32px" }}
          className={styles.menu_button}
        />
        <Menu />
      </div>

      <div className={styles.right}>
        <div className={styles.reqister}>
          <Link to="/profile">Профиль</Link>{" "}
        </div>
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
