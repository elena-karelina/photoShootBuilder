import instance from "../axiosInstance";
const getData = (id: string) => instance.get(`profile?id=${Number(id)}`);

export default getData;
