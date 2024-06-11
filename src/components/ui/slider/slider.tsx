import React from "react";
import { Carousel } from "antd";
import photo from "../../../assets/8b0fceec83bbceb3c52beb0a6ad1c292.jpg";

const contentStyle: React.CSSProperties = {
  width: "100%",
};

const Slider: React.FC = () => (
  <>
    <Carousel arrows infinite={true}>
      <div>
        <img
          src="https://www.meme-arsenal.com/memes/fbb97d1e03bcb3bb452acdfb26a6bdcc.jpg"
          style={contentStyle}
        />
      </div>
      <div>
        <img src={photo} style={contentStyle} />
      </div>
    </Carousel>
  </>
);

export default Slider;
