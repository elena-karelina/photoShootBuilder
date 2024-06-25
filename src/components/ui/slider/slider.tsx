import React from "react";
import { Carousel } from "antd";
import styles from "./slider.module.css";
const contentStyle = (type: string): React.CSSProperties => ({
  width: "100%",
  height: type === "profile" ? "450px" : "250px",
  objectFit: "cover",
  objectPosition: "center",
});

interface Props {
  type?: string;
  photo: string;
}

const Slider: React.FC<Props> = ({ type, photo }) => (
  <>
    <Carousel arrows infinite={true}>
      <div>
        <img
          src={photo}
          style={contentStyle(type ? type : "")}
          className={type && styles[type]}
        />
      </div>
      <div>
        <img
          src="https://www.meme-arsenal.com/memes/fbb97d1e03bcb3bb452acdfb26a6bdcc.jpg"
          style={contentStyle(type ? type : "")}
          className={type && styles[type]}
        />
      </div>
    </Carousel>
  </>
);

export default Slider;
