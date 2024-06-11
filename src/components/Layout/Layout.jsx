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
        <div className="container">{children}</div>
      </main>
    </>
  );
};

export default Layout;
