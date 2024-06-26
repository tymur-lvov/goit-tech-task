import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";

import Loader from "../../components/Loader/Loader";
import CardsList from "../../components/CardsList/CardsList";
import SearchForm from "../../components/SearchForm/SearchForm";

import { increaseCatalogCount } from "../../redux/auto/autosSlice";
import {
  selectCatalog,
  selectIsLimit,
  selectIsLoading,
} from "../../redux/auto/autosSelectors";
import {
  fetchCatalogThunk,
  fetchMoreAutosThunk,
  fetchRefCatalogThunk,
} from "../../redux/auto/autosOperations";

import css from "./CatalogPage.module.css";

const CatalogPage = () => {
  const catalog = useSelector(selectCatalog);
  const isLimit = useSelector(selectIsLimit);
  const isLoading = useSelector(selectIsLoading);
  const currentPage = useRef(1);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(increaseCatalogCount(12));
    dispatch(fetchRefCatalogThunk());
    dispatch(fetchCatalogThunk());
  }, [dispatch]);

  const handleLoadMoreClick = () => {
    currentPage.current++;
    dispatch(increaseCatalogCount(12));
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
