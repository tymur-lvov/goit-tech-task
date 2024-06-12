import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import Loader from "../../components/Loader/Loader";
import CardItem from "../../components/CardItem/CardItem";

import { selectCatalog } from "../../redux/auto/autosSelectors";
import { fetchCatalogThunk } from "../../redux/auto/autosOperations";

const CatalogPage = () => {
  const catalog = useSelector(selectCatalog);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCatalogThunk());
  }, [dispatch]);

  return (
    <>
      {catalog.length === 0 && <Loader />}
      {catalog.length > 0 && (
        <>
          <ul>
            {catalog.map((auto, idx) => {
              return (
                <li key={idx}>
                  <CardItem />
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
