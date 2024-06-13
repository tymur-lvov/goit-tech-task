import { FaCar } from "react-icons/fa";
import { useSelector } from "react-redux";

import CardsList from "../../components/CardsList/CardsList";

import { selectFavorites } from "../../redux/auto/autosSelectors";

import css from "./FavoritesPage.module.css";

const FavoritesPage = () => {
  const favorites = useSelector(selectFavorites);

  return (
    <>
      <CardsList favorites={favorites} />
      {favorites.length === 0 && (
        <>
          <div className={css.wrapper}>
            <FaCar size={100} color="#3470ff" />
            <p className={css.title}>You don&#x27;t have any favorite cars.</p>
            <p className={css.description}>
              Add something so it will be displayed here.
            </p>
          </div>
        </>
      )}
    </>
  );
};

export default FavoritesPage;
