import instance from "../axiosInstanceAN";
const getServiceInfo = (id: number) => instance.get(`item/info/${id}`);

export default getServiceInfo;
