import { useEffect, useRef } from "react";
import Card from "./card";
import { RightOutlined } from "@ant-design/icons";
import styles from "./components.module.css";

function Section() {
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const cardsContainer = cardsRef.current;

    if (cardsContainer) {
      const handleWheel = (event: WheelEvent) => {
        event.preventDefault();
        cardsContainer.scrollLeft += event.deltaY;
      };

      cardsContainer.addEventListener("wheel", handleWheel);

      return () => {
        cardsContainer.removeEventListener("wheel", handleWheel);
      };
    }
  }, []);
  return (
    <div className={styles.section}>
      <h3 className={styles.title}>
        Фотографы <RightOutlined style={{ fontSize: "18px" }} />
      </h3>
      <div className={styles.cards} ref={cardsRef}>
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
      </div>
    </div>
  );
}

export default Section;
