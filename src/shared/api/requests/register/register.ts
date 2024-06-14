import instance from "../axiosInstance";
import { FormData } from "../../../../pages/register/register";
const reg = (data: FormData) =>
  instance.post("register", {
    email: data.email,
    name: data.firstname + " " + data.lastname,
    password: data.password,
  });

export default reg;
