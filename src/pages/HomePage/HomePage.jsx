import { Link } from "react-router-dom";

import css from "./HomePage.module.css";

const HomePage = () => {
  return (
    <>
      <div className={css.wrapper}>
        <div className={css.container}>
          <h1 className={css.title}>
            Welcome to CarRentUA, the best Ukrainian car rental company!
          </h1>
          <Link className={css.link} to="/catalog">
            Browse catalog
          </Link>
        </div>
      </div>
    </>
  );
};

export default HomePage;
