import { useSelector, TypedUseSelectorHook } from "react-redux";
import { RootState } from "../store/store"; // Импортируйте RootState из вашего хранилища

// Типизированный хук useSelector
const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export function useAuth() {
  const { token, fullName, city, inst, tg, id } = useAppSelector(
    (state) => state.user
  );
  return {
    isAuth: !!token,
    token,
    id,
    fullName,
    city,
    tg,
    inst,
  };
}
