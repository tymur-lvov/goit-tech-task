import { useSelector } from "react-redux";

import NavBar from "../NavBar/NavBar";
import CardModal from "../CardModal/CardModal";

import { selectAuto } from "../../redux/auto/autosSelectors";

import css from "./Layout.module.css";

const Layout = ({ children }) => {
  const auto = useSelector(selectAuto);

  return (
    <>
      <header className={css.header}>
        <div className="container">
          <NavBar />
        </div>
      </header>
      <main>
        <section className={css.section}>
          <div className="container">{children}</div>
        </section>
      </main>
      {auto && <CardModal />}
    </>
  );
};

export default Layout;
