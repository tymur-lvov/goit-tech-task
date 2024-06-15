import { useDispatch, useSelector } from "react-redux";

import CardItem from "../../components/CardItem/CardItem";

import { useModal } from "../../hooks/useModal";
import { selectFavorites } from "../../redux/auto/autosSelectors";
import { fetchAutosByIdThunk } from "../../redux/auto/autosOperations";
import {
  addToFavorites,
  removeFromFavorites,
} from "../../redux/auto/autosSlice";

import css from "./CardsList.module.css";

const CardsList = ({ catalog, favorites }) => {
  const savedFavorites = useSelector(selectFavorites);
  const dispatch = useDispatch();
  const { openModal } = useModal();

  const autosList = catalog || favorites;

  const handleLearnMoreClick = (id) => {
    openModal();
    dispatch(fetchAutosByIdThunk(id));
  };

  const toggleAddToFavoritesClick = (id) => {
    if (savedFavorites.some((auto) => auto.id === id)) {
      dispatch(removeFromFavorites(id));
      return;
    }
    dispatch(addToFavorites(id));
  };
  return (
    <ul className={css.list}>
      {autosList.map((auto) => {
        return (
          <li className={css.item} key={auto.id}>
            <CardItem
              auto={auto}
              handleClick={{
                handleLearnMoreClick,
                toggleAddToFavoritesClick,
              }}
            />
          </li>
        );
      })}
    </ul>
  );
};

export default CardsList;
