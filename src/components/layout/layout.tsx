import Header from "../header/header";
import styles from "./layout.module.css";
import { Outlet } from "react-router-dom";

function Layout() {
  return (
    <>
      <div className={styles.header_wrapper}>
        <div className={styles.layout}>
          <Header />
        </div>
      </div>
      <div className={styles.layout}>
        <Outlet />
      </div>
    </>
  );
}

export default Layout;
