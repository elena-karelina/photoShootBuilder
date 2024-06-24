import instance from "../axiosInstanceAN";
const getServices = (id: number) => instance.get(`user/${id}/items`);

export default getServices;
