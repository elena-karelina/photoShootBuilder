import { useEffect, useRef } from "react";
import { RightOutlined } from "@ant-design/icons";
import styles from "./components.module.css";
import Card from "../../../components/ui/card/card";

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
        <Card type="menu" />
        <Card type="menu" />
        <Card type="menu" />
        <Card type="menu" />
        <Card type="menu" />
        <Card type="menu" />
      </div>
    </div>
  );
}

export default Section;
