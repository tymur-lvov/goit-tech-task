import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";

import Loader from "../../components/Loader/Loader";
import CardItem from "../../components/CardItem/CardItem";

import {
  selectCatalog,
  selectFavorites,
  selectIsLimit,
} from "../../redux/auto/autosSelectors";
import {
  addToFavorites,
  removeFromFavorites,
} from "../../redux/auto/autosSlice";
import {
  fetchCatalogThunk,
  fetchMoreAutosThunk,
} from "../../redux/auto/autosOperations";

import css from "./CatalogPage.module.css";

const CatalogPage = () => {
  const catalog = useSelector(selectCatalog);
  const favorites = useSelector(selectFavorites);
  const isLimit = useSelector(selectIsLimit);
  const currentPage = useRef(1);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCatalogThunk());
  }, [dispatch]);

  const handleLoadMoreClick = () => {
    currentPage.current++;
    dispatch(fetchMoreAutosThunk(currentPage.current));
  };

  const handleLearnMoreClick = (id) => {
    console.log(id);
  };

  const handleAddToFavoritesClick = (id) => {
    if (favorites.some((auto) => auto.id === id)) {
      dispatch(removeFromFavorites(id));
      return;
    }
    dispatch(addToFavorites(id));
  };

  return (
    <>
      {catalog.length === 0 && <Loader />}
      {catalog.length > 0 && (
        <>
          <ul className={css.list}>
            {catalog.map((auto) => {
              return (
                <li className={css.item} key={auto.id}>
                  <CardItem
                    auto={auto}
                    handleClick={{
                      handleLearnMoreClick,
                      handleAddToFavoritesClick,
                    }}
                  />
                </li>
              );
            })}
          </ul>
          {!isLimit && (
            <button className={css.button} onClick={handleLoadMoreClick}>
              Load more
            </button>
          )}
        </>
      )}
    </>
  );
};

export default CatalogPage;

// import { addCars } from "../../utils/addCars";
// addCars();
