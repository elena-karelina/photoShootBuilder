import React from "react";
import style from "./card.module.css";
import { Avatar, Card as CardAntd } from "antd";
import Slider from "../../../components/ui/slider/slider";

const { Meta } = CardAntd;
interface Props {
  type: string;
}
const Card: React.FC<Props> = ({ type }) => (
  <CardAntd className={style[type]} cover={<Slider />}>
    <Meta
      avatar={
        <Avatar src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSCkltroXX2ZBvm8R1BCPD_ZJJZbjd-E1kxZw&s" />
      }
      title="Название"
      description={
        <>
          <span>цена</span>
          <br />
          <span>может еще что-то</span>
        </>
      }
    />
  </CardAntd>
);

export default Card;
