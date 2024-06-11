import React from "react";

import { Avatar, Card as CardAntd } from "antd";
import Slider from "../../../components/ui/slider/slider";

const { Meta } = CardAntd;

const Card: React.FC = () => (
  <CardAntd style={{ width: 250 }} cover={<Slider />}>
    <Meta
      avatar={
        <Avatar src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSCkltroXX2ZBvm8R1BCPD_ZJJZbjd-E1kxZw&s" />
      }
      title="Имя Имя"
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
