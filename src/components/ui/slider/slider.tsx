import React from "react";
import { Carousel } from "antd";
import photo from "../../../assets/8b0fceec83bbceb3c52beb0a6ad1c292.jpg";
import styles from "./slider.module.css";
const contentStyle = (type: string): React.CSSProperties => ({
  width: "100%",
  height: type === "profile" ? "450px" : "250px",
  objectFit: "cover",
  objectPosition: "center",
});

interface Props {
  type?: string;
}

const Slider: React.FC<Props> = ({ type }) => (
  <>
    <Carousel arrows infinite={true}>
      <div>
        <img
          src="https://www.meme-arsenal.com/memes/fbb97d1e03bcb3bb452acdfb26a6bdcc.jpg"
          style={contentStyle(type ? type : "")}
          className={type && styles[type]}
        />
      </div>
      <div>
        <img
          src={photo}
          style={contentStyle(type ? type : "")}
          className={type && styles[type]}
        />
      </div>
    </Carousel>
  </>
);

export default Slider;
