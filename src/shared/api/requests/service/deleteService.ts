import instance from "../axiosInstanceAN";
const deleteService = (id: number) => instance.delete(`item/delete/${id}`);

export default deleteService;
