import icons from "../../assets/icons/icons.svg";
import { sliceCity, sliceCountry } from "../../utils/sliceAddress";

import css from "./CardItem.module.css";

const CardItem = ({ auto }) => {
  const {
    img,
    id,
    make,
    model,
    year,
    rentalPrice,
    address,
    rentalCompany,
    type,
    accessories,
  } = auto;

  return (
    <>
      <div className={css.thumb}>
        <img src={img} alt={`${make} ${model}`} />
        <svg className={css.icon} height={18} width={18}>
          <use href={`${icons}#icon-heart`}></use>
        </svg>
      </div>
      <div className={css.content_wrapper}>
        <div className={css.title_wrapper}>
          <h3 className={css.title}>
            {make} <span className={css.accent}>{model}</span>, {year}
          </h3>
          <span className={css.price}>{rentalPrice}</span>
        </div>
        <ul className={css.list}>
          <li className={css.item}>{sliceCity(address)}</li>
          <li className={css.item}>{sliceCountry(address)}</li>
          <li className={css.item}>{rentalCompany}</li>
          <li className={css.item}>{type}</li>
          <li className={css.item}>{model}</li>
          <li className={css.item}>{id}</li>
          <li className={css.item}>{accessories[0]}</li>
        </ul>
        <button className={css.button} type="button">
          Learn more
        </button>
      </div>
    </>
  );
};

export default CardItem;
