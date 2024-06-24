import { FormDataEditService } from "../../../../pages/service/modal/form";
import instance from "../axiosInstanceAN";
const editService = (id: number, data: FormDataEditService) =>
  instance.put(`item/edit/${id}`, {
    itemName: data.name,
    itemDescription: data.description,
    costPerHour: data.cost,
    itemType: Number(data.type),
    schedule: data.schedule,
  });

export default editService;
