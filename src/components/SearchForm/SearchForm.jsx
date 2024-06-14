import Select from "react-select";
import { useSelector } from "react-redux";
import { Formik, Field, Form, ErrorMessage } from "formik";

import { selectCatalog } from "../../redux/auto/autosSelectors";

import css from "./SearchForm.module.css";

const SearchForm = () => {
  const catalog = useSelector(selectCatalog);

  const createBrandOptions = (catalog) => {
    const brandOptions = catalog.map((auto) => {
      return {
        value: auto.make.toLowerCase(),
        label: auto.make,
      };
    });
    return brandOptions;
  };
  createBrandOptions(catalog);

  const createPriceOptions = (catalog) => {
    const priceOptions = catalog.map((auto) => {
      return {
        value: auto.rentalPrice,
        label: auto.rentalPrice,
      };
    });
    return priceOptions;
  };
  createPriceOptions(catalog);

  const initialValues = {
    brand: "",
    price: "",
    from: "",
    to: "",
  };

  const CustomSelect = ({ field, form, options, placeholder }) => {
    const handleChange = (selectedOption) => {
      form.setFieldValue(field.name, selectedOption);
    };

    return (
      <Select
        name={field.name}
        placeholder={placeholder}
        value={options.find((option) => option.value === field.value)}
        onChange={handleChange}
        options={options}
        styles={{
          control: (baseStyles) => ({
            ...baseStyles,
            width: 224,
            height: 48,
            borderRadius: 14,
            border: "none",
            padding: "14px 18px",
            backgroundColor: "#f7f7fb",
          }),
          container: (baseStyles) => ({
            ...baseStyles,
            color: "#121417",
            fontWeight: 500,
            fontSize: 18,
            lineHeight: 1.11,
          }),
          valueContainer: () => ({
            width: 186,
            height: 18,
            padding: 0,
          }),
          singleValue: (baseStyles) => ({
            ...baseStyles,
            color: "#121417",
          }),

          placeholder: (baseStyles) => ({
            ...baseStyles,
            color: "#121417",
          }),
          input: () => ({
            width: 186,
            height: 18,
            padding: 0,
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
          }),
          indicatorSeparator: () => ({
            display: "none",
          }),
          dropdownIndicator: () => ({
            height: 20,
            width: 20,
            position: "absolute",
            top: 14,
            right: 14,
          }),
          menu: (baseStyles) => ({
            ...baseStyles,
            border: "1px solid rgba(18, 20, 23, 0.05)",
            borderRadius: 14,
            padding: "14px 18px",
            margin: 0,
          }),
          menuList: (baseStyles) => ({
            ...baseStyles,
            color: "rgba(18, 20, 23, 0.2)",
            fontSize: 16,
            lineHeight: 1.25,
            display: "flex",
            flexDirection: "column",
            gap: 8,
          }),
          option: (baseStyles, state) => ({
            padding: 0,
            color: state.isSelected ? "#121417" : "rgba(18, 20, 23, 0.2)",
          }),
        }}
      />
    );
  };

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

            <label>
              Car mileage / km
              <Field type="number" name="from" id="from" placeholder="From" />
            </label>
            <label className="visually-hidden">
              Car mileage / km
              <Field type="number" name="to" id="to" placeholder="To" />
            </label>
            <ErrorMessage name="from" component="span" />
            <ErrorMessage name="to" component="span" />
            <button type="submit">Search</button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default SearchForm;
