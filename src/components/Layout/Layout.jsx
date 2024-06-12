import NavBar from "../NavBar/NavBar";

import css from "./Layout.module.css";

const Layout = ({ children }) => {
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
    </>
  );
};

export default Layout;
