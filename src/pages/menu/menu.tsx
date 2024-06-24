import { useEffect, useState } from "react";
import Section from "./components/section";
import styles from "./menu.module.css";
import getAllServices from "../../shared/api/requests/menu/getAllServices";
import Loading from "../../components/ui/loading/loading";

function Menu() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [sectionList, setSectionList] = useState<Sections>();
  interface Item {
    id: number;
    ownerUserId: number;
    ownerName: string;
    itemName: string;
    itemDescription: string;
    costPerHour: number;
    itemType: number;
  }
  interface Sections {
    clothesAndShoes: { items: Item[] };
    requisite: { items: Item[] };
    equipment: { items: Item[] };
    place: { items: Item[] };
    photo: { items: Item[] };
    video: { items: Item[] };
    makeup: { items: Item[] };
    other: { items: Item[] };
  }

  interface ServerResponse {
    data: Sections;
  }
  const obj = {
    clothesAndShoes: "Одежда и обувь",
    requisite: "Реквизит",
    equipment: "Техника",
    place: "Помещения и места",
    photo: "Услуги фотографа",
    video: "Услуги фидеографа",
    makeup: "Услуги визажиста",
    other: "Другое",
  };
  const fetchData = async () => {
    await getAllServices()
      .then((response: ServerResponse) => {
        console.log(response.data);
        setSectionList(response.data);
      })
      .catch((error: object) => {
        console.log(error);
      });
    setIsLoaded(true);
  };
  useEffect(() => {
    fetchData();
  }, []);
  if (!isLoaded) return <Loading />;
  else
    return (
      <div className={styles.menu_wrapper}>
        {sectionList &&
          Object.entries(sectionList).map(([key, value]) => (
            <Section
              key={key}
              items={value.items}
              name={obj[key as keyof typeof obj]}
            />
          ))}
      </div>
    );
}

export default Menu;
