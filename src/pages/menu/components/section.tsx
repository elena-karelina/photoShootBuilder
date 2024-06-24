import { useEffect, useRef } from "react";
import styles from "./components.module.css";
import Card from "../../../components/ui/card/card";

interface Item {
  id: number;
  ownerUserId: number;
  ownerName: string;
  itemName: string;
  itemDescription: string;
  costPerHour: number;
  itemType: number;
}
interface Props {
  items: Item[];
  name: string;
}
const Section: React.FC<Props> = ({ items, name }) => {
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
  if (items.length > 0)
    return (
      <div className={styles.section}>
        <h3 className={styles.title}>{name}:</h3>
        <div className={styles.cards} ref={cardsRef}>
          {items.map((item, key) => (
            <Card key={key} type="menu" data={item} />
          ))}
        </div>
      </div>
    );
};

export default Section;
