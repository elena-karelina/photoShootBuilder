import instance from "../axiosInstanceAN";
const getAllServices = () => instance.get("items");

export default getAllServices;
