import dayjs from "dayjs";
import { openingHours } from "./opening-hours";

const names = [
  "Ruan Barros",
  "Ramon Barros",
  "Otávio",
  "Josué Leite",
];

const selectedDate = document.getElementById('date')

export function generateSchedulesEntry() {
  const fakeData = [];
  let initialDate = dayjs(selectedDate.value);
  initialDate = initialDate.set("hour", 0);
  initialDate = initialDate.set("minute", 0);


  for (let i = 0; i < 13; i++) {
    const randomName = names[Math.floor(Math.random() * names.length)];
    fakeData.push({
      name: randomName,
      id: new Date().getTime().toString(),
      when: dayjs(initialDate).set("hour", openingHours[i].split(":")[0]),
    });
  }

  return fakeData;
}
