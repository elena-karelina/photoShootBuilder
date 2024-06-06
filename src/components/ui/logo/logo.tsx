import { Link } from "react-router-dom";
import styles from "./logo.module.css";

function Logo() {
  return (
    <Link to="/">
      <div className={styles.logo}>PSB</div>
    </Link>
  );
}

export default Logo;
