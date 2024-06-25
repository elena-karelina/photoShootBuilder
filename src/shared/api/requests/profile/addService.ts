import instance from "../axiosInstanceAN";
import { FormData } from "../../../../pages/profile/components/addService/addService";
const addService = async (data: FormData, id: number, name: string) => {
  {
    const base64Promise = new Promise<string | null>((resolve, reject) => {
      if (data.photo.length > 0) {
        const file = data.photo[0];
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = (error) => reject(error);
      } else {
        resolve(null);
      }
    });

    const base64Image = await base64Promise;
    console.log("Sending the following data:");
    console.log({
      ownerUserId: id,
      ownerName: name,
      itemName: data.name,
      itemDescription: data.description,
      costPerHour: data.cost,
      itemType: Number(data.type),
      schedule: data.schedule,
      pictures: base64Image,
    });
    return instance.post("item/create", {
      ownerUserId: id,
      ownerName: name,
      itemName: data.name,
      itemDescription: data.description,
      costPerHour: data.cost,
      itemType: Number(data.type),
      schedule: data.schedule,
      pictures: base64Image,
    });
  }
};

export default addService;
