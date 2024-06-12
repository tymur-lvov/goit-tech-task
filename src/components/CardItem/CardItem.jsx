import icons from "../../assets/icons/icons.svg";

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
          <li>{address}</li>
          <li>{address}</li>
          <li>{rentalCompany}</li>
          <li>{type}</li>
          <li>{model}</li>
          <li>{id}</li>
          <li>{accessories[0]}</li>
        </ul>
        <button className={css.button} type="button">
          Learn more
        </button>
      </div>
    </>
  );
};

export default CardItem;
