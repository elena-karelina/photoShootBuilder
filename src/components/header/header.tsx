import { Link } from "react-router-dom";
import Logo from "../ui/logo/logo";
import { MenuOutlined } from "@ant-design/icons";
import styles from "./header.module.css";
import { useState } from "react";
import Menu from "./menu";

function Header() {
  const [isOpenMenu, setIsOpenMenu] = useState(false);
  function HandleMenu() {
    isOpenMenu ? setIsOpenMenu(false) : setIsOpenMenu(true);
  }
  return (
    <div className={styles.header}>
      <div className={styles.left}>
        <Logo />
        <MenuOutlined
          style={{ fontSize: "32px" }}
          className={styles.menu_button}
          onClick={HandleMenu}
        />
        <Menu />
      </div>

      <div className={`${styles.right} ${isOpenMenu ? styles.open : ""}`}>
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
