import { NavLink } from "react-router-dom";
import styles from "./../styles/DashNav.module.css";
import Logo from "./../components/Logo";

export default function PageNav() {
  return (
    <nav className={styles.nav1}>
      <Logo />
      <ul>
        <li>
          <NavLink to="/dashboard">Dashboard</NavLink>
        </li>
        <li>
          <NavLink to="/products">Add product</NavLink>
        </li>
        <li>
          <NavLink to="/login" className={styles.ctaLink1}>
            logout
          </NavLink>
          {/* <NavLink to="/signup">signup</NavLink> */}
        </li>
      </ul>
    </nav>
  );
}
