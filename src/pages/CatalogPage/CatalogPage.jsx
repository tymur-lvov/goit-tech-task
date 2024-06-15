import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";

import Loader from "../../components/Loader/Loader";
import CardsList from "../../components/CardsList/CardsList";
import SearchForm from "../../components/SearchForm/SearchForm";

import {
  fetchCatalogThunk,
  fetchMoreAutosThunk,
} from "../../redux/auto/autosOperations";
import {
  selectCatalog,
  selectIsLimit,
  selectIsLoading,
} from "../../redux/auto/autosSelectors";

import css from "./CatalogPage.module.css";

const CatalogPage = () => {
  const catalog = useSelector(selectCatalog);
  const isLimit = useSelector(selectIsLimit);
  const isLoading = useSelector(selectIsLoading);
  const currentPage = useRef(1);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCatalogThunk());
  }, [dispatch]);

  const handleLoadMoreClick = () => {
    currentPage.current++;
    dispatch(fetchMoreAutosThunk(currentPage.current));
  };

  return (
    <>
      <SearchForm />
      {isLoading && <Loader />}
      {!isLoading && (
        <>
          <CardsList catalog={catalog} />
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
