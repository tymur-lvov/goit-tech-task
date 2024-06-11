import { Link, useLocation } from "react-router-dom";
import clsx from "clsx";

import { isActiveLink } from "../../utils/isActiveLink";

import css from "./NavBar.module.css";

const NavBar = () => {
  const { pathname } = useLocation();

  return (
    <nav className={css.navigation}>
      <Link
        className={clsx(css.link, {
          [css.active]: isActiveLink("/", pathname),
        })}
        to="/"
      >
        Home
      </Link>
      <Link
        className={clsx(css.link, {
          [css.active]: isActiveLink("/catalog", pathname),
        })}
        to="/catalog"
      >
        Catalog
      </Link>
      <Link
        className={clsx(css.link, {
          [css.active]: isActiveLink("/favorites", pathname),
        })}
        to="/favorites"
      >
        Favorites
      </Link>
    </nav>
  );
};

export default NavBar;
