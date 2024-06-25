import React from "react";
import style from "./card.module.css";
import { Avatar, Card as CardAntd } from "antd";
import Slider from "../../../components/ui/slider/slider";
import { Link } from "react-router-dom";

const { Meta } = CardAntd;
interface Props {
  type: string;
  data: Item;
}
export interface Item {
  id: number;
  ownerUserId: number;
  ownerName: string;
  itemName: string;
  itemDescription: string;
  costPerHour: number;
  itemType: number;
  pictures: string;
}
const Card: React.FC<Props> = ({ type, data }) => {
  return (
    <CardAntd className={style[type]} cover={<Slider photo={data.pictures} />}>
      <Meta
        avatar={
          type != "profile" && (
            <Avatar src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSCkltroXX2ZBvm8R1BCPD_ZJJZbjd-E1kxZw&s" />
          )
        }
        title={
          <Link to={`/service/${data.id}`} style={{ color: "black" }}>
            {data.itemName}
          </Link>
        }
        description={
          <>
            <span>Цена: {data.costPerHour} ₽</span>
            <br />
            <span>
              {data.itemDescription.length > 25
                ? data.itemDescription.slice(0, 25) + "..."
                : data.itemDescription}
            </span>
          </>
        }
      />
    </CardAntd>
  );
};

export default Card;
