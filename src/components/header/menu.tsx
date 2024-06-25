import { Link, useNavigate } from "react-router-dom";
import styles from "./header.module.css";
import { useDispatch } from "react-redux";
import { useAuth } from "../../hooks/useAuth";
import logout from "../../shared/api/requests/logout/logout";
import { removeUser } from "../../store/slices/userSlice";
import { useSelector, TypedUseSelectorHook } from "react-redux";
import { RootState } from "../../store/store";
import { removeOrder } from "../../store/slices/orderSlice";
function Menu() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
  const { amount } = useAppSelector((state) => state.order);
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
    dispatch(removeOrder());
    navigate("/");
  };

  return (
    <div className={styles.menu}>
      <div className={styles.reqister}>
        <Link to="/menu">Меню</Link>{" "}
      </div>

      {user.isAuth && (
        <div className={styles.reqister}>
          <Link to="/profile">Профиль</Link>
        </div>
      )}
      {user.isAuth && (
        <div className={styles.order}>
          <Link to="/order">Заявка</Link>
          {amount > 0 && <span>{amount}</span>}
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
  );
}
export default Menu;
