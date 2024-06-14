import { useSelector } from "react-redux";
import { Formik, Field, Form, ErrorMessage } from "formik";

import CustomSelect from "../CustomSelect/CustomSelect";

import { selectCatalog } from "../../redux/auto/autosSelectors";
import { initialValues } from "../../data/initialValues";
import { createPriceOptions } from "../../utils/createPriceOptions";
import { createBrandOptions } from "../../utils/createBrandOptions";

import css from "./SearchForm.module.css";

const SearchForm = () => {
  const catalog = useSelector(selectCatalog);
  return (
    <div>
      <Formik
        initialValues={initialValues}
        onSubmit={(values) => {
          console.log(values);
        }}
      >
        {() => (
          <Form className={css.form}>
            <label className={css.label}>
              Car brand
              <Field
                name="brand"
                component={CustomSelect}
                options={createBrandOptions(catalog)}
                placeholder="Enter the text"
              />
            </label>
            <label className={css.label}>
              Price / 1 hour
              <Field
                name="price"
                component={CustomSelect}
                options={createPriceOptions(catalog)}
                placeholder="To $"
              />
            </label>

            <label className={css.label}>
              Car mileage / km
              <div className={css.input_wrapper}>
                <Field
                  className={css.input}
                  type="number"
                  name="from"
                  placeholder="From"
                />
                <Field
                  className={css.input}
                  type="number"
                  name="to"
                  placeholder="To"
                />
              </div>
            </label>
            <ErrorMessage name="from" component="span" />
            <ErrorMessage name="to" component="span" />
            <button className={css.button} type="submit">
              Search
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default SearchForm;
