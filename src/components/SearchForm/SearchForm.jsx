import Select from "react-select";
import { useSelector } from "react-redux";
import { Formik, Field, Form, ErrorMessage } from "formik";

import { selectCatalog } from "../../redux/auto/autosSelectors";

import css from "./SearchForm.module.css";

const SearchForm = () => {
  const catalog = useSelector(selectCatalog);

  const createBrandOptions = (catalog) => {
    const autoModels = catalog.map((auto) => auto.model);

    const rawBrandOptions = catalog.map((auto) => auto.make);

    const brandDublicates = rawBrandOptions.filter((option, index, self) =>
      self.indexOf(option) !== index ? option : null
    );

    const uniqueBrandOptions = rawBrandOptions.map((option, index) =>
      brandDublicates.includes(option)
        ? (option = `${option} ${autoModels[index]}`)
        : option
    );

    const brandOptions = uniqueBrandOptions.map((option) => {
      return {
        value: option.toLowerCase(),
        label: option,
      };
    });
    return brandOptions;
  };

  const createPriceOptions = (catalog) => {
    const rawPriceOptions = catalog.map((auto) =>
      auto.rentalPrice.slice(1, auto.rentalPrice.length)
    );

    const filteredPriceOptions = rawPriceOptions.filter(
      (item, index, self) => self.indexOf(item) === index
    );
    const sortedPriceOptions = filteredPriceOptions.toSorted((a, b) => a - b);

    const priceOptions = sortedPriceOptions.map((option) => {
      return {
        value: option,
        label: option,
      };
    });
    return priceOptions;
  };

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
            paddingRight: 8,
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
            maxHeight: 272,
            overflowY: "auto",
            "&::-webkit-scrollbar": {
              width: 8,
            },
            "&::-webkit-scrollbar-thumb": {
              height: 130,
              borderRadius: 10,
              backgroundColor: "rgba(18, 20, 23, 0.05)",
            },
            "&::-webkit-scrollbar-thumb:hover": {
              background: "rgba(18, 20, 23, 0.07)",
            },
          }),
          option: (baseStyles, state) => ({
            padding: 0,
            color: state.isSelected ? "#121417" : "rgba(18, 20, 23, 0.2)",
            "&:hover": {
              color: state.isSelected ? "#121417" : "rgba(18, 20, 23, 0.4)",
            },
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
