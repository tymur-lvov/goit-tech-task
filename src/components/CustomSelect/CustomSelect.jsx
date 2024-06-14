import Select from "react-select";

import { selectStyles } from "../../data/selectStyles";

const CustomSelect = ({ field, form, options, placeholder }) => {
  const handleChange = (selectedOption) => {
    form.setFieldValue(field.name, selectedOption);
  };

  return (
    <>
      <Select
        name={field.name}
        placeholder={placeholder}
        value={options.find((option) => option.value === field.value)}
        onChange={handleChange}
        options={options}
        styles={selectStyles}
      />
    </>
  );
};

export default CustomSelect;
