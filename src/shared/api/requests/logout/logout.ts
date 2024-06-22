import instance from "../axiosInstance";
const logout = (token: string) =>
  instance.post("logout", {
    token: token,
  });

export default logout;
