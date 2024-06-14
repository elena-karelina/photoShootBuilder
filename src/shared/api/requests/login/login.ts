import instance from "../axiosInstance";
import { FormData } from "../../../../pages/login/login";
const login = (data: FormData) =>
  instance.post("login", {
    email: data.login,
    password: data.password,
  });

export default login;
