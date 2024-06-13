import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import Loader from "../../components/Loader/Loader";
import CardItem from "../../components/CardItem/CardItem";

import { selectCatalog } from "../../redux/auto/autosSelectors";
import { fetchCatalogThunk } from "../../redux/auto/autosOperations";

import css from "./CatalogPage.module.css";

const CatalogPage = () => {
  const catalog = useSelector(selectCatalog);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCatalogThunk());
  }, [dispatch]);

  const handleLearnMoreClick = (id) => {
    console.log(id);
  };

  const handleLoadMoreClick = () => {
    console.log("Loading more...");
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
                  <CardItem auto={auto} handleClick={handleLearnMoreClick} />
                </li>
              );
            })}
          </ul>
          <button className={css.button} onClick={handleLoadMoreClick}>
            Load more
          </button>
        </>
      )}
    </>
  );
};

export default CatalogPage;

// import { addCars } from "../../utils/addCars";
// addCars();
