import { Link } from "react-router-dom";
import Logo from "../ui/logo/logo";
import { MenuOutlined } from "@ant-design/icons";
import styles from "./header.module.css";
import Menu from "./menu";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import logout from "../../shared/api/requests/logout/logout";
import { removeUser } from "../../store/slices/userSlice";

function Header() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useAuth();
  const heandleLogout = () => {
    user.token &&
      logout(user.token)
        .then((response: object) => {
          console.log(response);
        })
        .catch((error: object) => {
          console.log(error);
        });
    dispatch(removeUser());
    navigate("/");
  };

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
          <Link to="/menu">Меню</Link>{" "}
        </div>

        {user.isAuth && (
          <div className={styles.reqister}>
            <Link to={`/profile/${user.id}`}>Профиль</Link>
          </div>
        )}
        {user.isAuth && (
          <div className={styles.reqister}>
            <Link to="/service">Заявка</Link>
          </div>
        )}
        {user.isAuth && (
          <div className={styles.reqister}>
            <Link to="/" onClick={heandleLogout}>
              Выйти
            </Link>
          </div>
        )}
        {!user.isAuth && (
          <div className={styles.reqister}>
            <Link to="/register">Регистрация</Link>{" "}
          </div>
        )}

        {!user.isAuth && (
          <div className={styles.signin}>
            <Link to="/logIn">Вход</Link>
          </div>
        )}
      </div>
    </div>
  );
}

export default Header;
