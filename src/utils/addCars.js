import axios from "axios";

import cars from "../assets/adsCars.json";

export const addCars = () => {
  cars.forEach((car) =>
    axios.post("https://666853fff53957909ff78e78.mockapi.io/advert", car)
  );
};
