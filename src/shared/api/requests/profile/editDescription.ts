import instance from "../axiosInstance";
const editDescription = (description: string | null) =>
  instance.post("editDescription", {
    description,
  });

export default editDescription;
