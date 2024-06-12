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

  const str = "123 Example Street, Kiev, Ukraine";
  const idx = str.indexOf(",");
  console.log(idx);
  console.log(str.slice(idx + 2, str.length));

  return (
    <>
      {catalog.length === 0 && <Loader />}
      {catalog.length > 0 && (
        <>
          <ul className={css.list}>
            {catalog.map((auto) => {
              return (
                <li className={css.item} key={auto.id}>
                  <CardItem auto={auto} />
                </li>
              );
            })}
          </ul>
        </>
      )}
    </>
  );
};

export default CatalogPage;
