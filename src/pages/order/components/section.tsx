import { useDispatch } from "react-redux";
import styles from "./components.module.css";
import { DeleteOutlined } from "@ant-design/icons";
import { removeService } from "../../../store/slices/orderSlice";
import { Link } from "react-router-dom";
interface Item {
  id: number;
  name: string;
  ownerName: string;
  cost: number;
}
interface ServiceProps {
  data: Item;
  delete: (id: number) => void;
}
const ServiceInOrder: React.FC<ServiceProps> = ({
  data,
  delete: deleteService,
}) => {
  const dispatch = useDispatch();
  const deleteFromOrder = () => {
    dispatch(
      removeService({
        id: data.id,
      })
    );
    deleteService(data.id);
  };
  return (
    <div className={styles.section}>
      <div className={styles.title}>
        <Link to={`/service/${data.id}`}>{data.name}</Link>
        <DeleteOutlined
          style={{ fontSize: "20px", marginLeft: "20px" }}
          onClick={deleteFromOrder}
        />
      </div>

      <p className={styles.author}>by: {data.ownerName}</p>
      <p className={styles.cost}>Стоимость: {data.cost} ₽</p>
    </div>
  );
};

export default ServiceInOrder;
