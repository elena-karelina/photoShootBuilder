import instance from "../axiosInstance";
const getData = (token: string) =>
  instance.get("profile", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

export default getData;
