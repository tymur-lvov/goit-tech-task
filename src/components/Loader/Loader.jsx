import { ProgressBar } from "react-loader-spinner";

import css from "./Loader.module.css";

const Loader = () => {
  return <ProgressBar wrapperClass={css.loader} />;
};

export default Loader;
