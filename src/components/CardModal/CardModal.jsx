import Modal from "react-modal";
import { useSelector } from "react-redux";

import Loader from "../Loader/Loader";

import { useModal } from "../../hooks/useModal";
import { selectAuto, selectIsLoading } from "../../redux/auto/autosSelectors";
import { sliceCity, sliceCountry } from "../../utils/sliceAddress";

import css from "./CardModal.module.css";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
  overlay: {
    backgroundColor: "rgba(18, 20, 23, 0.5)",
  },
};

Modal.setAppElement("#root");

const CardModal = () => {
  const auto = useSelector(selectAuto);
  const isLoading = useSelector(selectIsLoading);
  const { modalIsOpen, closeModal } = useModal();
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
    photoLink,
    description,
    functionalities,
    mileage,
    rentalConditions,
  } = auto;

  const getRentalConditions = (data) => {
    const rentalConditions = data.split("\n");
    rentalConditions[0] = rentalConditions[0].slice(
      rentalConditions[0].length - 2,
      rentalConditions[0].length
    );
    return rentalConditions;
  };

  return (
    <>
      {isLoading && <Loader />}
      {!isLoading && (
        <Modal
          isOpen={modalIsOpen}
          onRequestClose={closeModal}
          style={customStyles}
        >
          <div className={css.thumb}>
            <img src={photoLink || img} alt={`${make} ${model}`} />
          </div>
          <div className={css.content_wrapper}>
            <div className={css.title_wrapper}>
              <h3 className={css.title}>
                {make} <span className={css.accent}>{model}</span>, {year}
              </h3>
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
            <p className={css.description}>{description}</p>
            <strong>
              <p className={css.sub_heading}>
                Accessories and functionalities:
              </p>
            </strong>
            <ul className={css.list}>
              <li className={css.item}>{accessories[0]}</li>
              <li className={css.item}>{accessories[1]}</li>
              <li className={css.item}>{functionalities[0]}</li>
              <li className={css.item}>{accessories[2]}</li>
              <li className={css.item}>{functionalities[1]}</li>
              <li className={css.item}>{functionalities[2]}</li>
            </ul>
            <strong>
              <p className={css.sub_heading}>Rental Conditions:</p>
            </strong>
            <ul>
              <li className={css.tag}>
                Minimum age :{" "}
                <span className={css.tag_accent}>
                  {getRentalConditions(rentalConditions)[0]}
                </span>
              </li>
              <li className={css.tag}>
                {getRentalConditions(rentalConditions)[1]}
              </li>
              <li className={css.tag}>
                {getRentalConditions(rentalConditions)[2]}
              </li>
              <li className={css.tag}>
                Mileage:{" "}
                <span className={css.tag_accent}>
                  {mileage.toLocaleString()}
                </span>
              </li>
              <li className={css.tag}>
                Price:{" "}
                <span className={css.tag_accent}>
                  {`${rentalPrice.slice(1, rentalPrice.length)}$`}
                </span>
              </li>
            </ul>
            <button className={css.button} onClick={() => null} type="button">
              Rental car
            </button>
          </div>
        </Modal>
      )}
    </>
  );
};

export default CardModal;
