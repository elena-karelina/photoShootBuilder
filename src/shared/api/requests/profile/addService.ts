import instance from "../axiosInstanceAN";
import { FormData } from "../../../../pages/profile/components/addService/addService";
const addService = (data: FormData, id: number, name: string) =>
  instance.post("item/create", {
    ownerUserId: id,
    ownerName: name,
    itemName: data.name,
    itemDescription: data.description,
    costPerHour: data.cost,
    itemType: Number(data.type),
    schedule: data.schedule,
  });

export default addService;
