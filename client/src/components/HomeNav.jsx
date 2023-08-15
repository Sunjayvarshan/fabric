import { NavLink } from "react-router-dom";
import styles from "./../styles/Homenav.module.css";
import Logo from "./Logo";

export default function PageNav() {
  return (
    <nav className={styles.nav}>
      <Logo />
      <ul>
        <li>
          <NavLink to="/login">login</NavLink>
        </li>
        <li>
          <NavLink to="/signup" className={styles.ctaLink}>
            Signup
          </NavLink>
          {/* <NavLink to="/signup">signup</NavLink> */}
        </li>
      </ul>
    </nav>
  );
}
