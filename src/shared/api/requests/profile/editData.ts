import instance from "../axiosInstance";
import { FormData } from "../../../../pages/profile/components/modal/form";

const editData = (data: FormData) => {
  if (data.photo && data.photo[0]) {
    const reader = new FileReader();

    reader.onload = function (event) {
      if (event.target) {
        const photoString = event.target.result;
        console.log(photoString);
        return instance.post("profile", {
          name: data.name,
          city: data.city,
          avatar: photoString,
          telegram: data.tg,
          instagram: data.inst,
        });
      }
    };

    reader.readAsDataURL(data.photo[0]);
  }

  return instance.post("profile", {
    name: data.name,
    city: data.city,
    telegram: data.tg,
    instagram: data.inst,
  });
};

export default editData;
