import { Link } from "react-router-dom";
import styles from "./../styles/Home.module.css";
import HomeNav from "../components/HomeNav";

export default function Homepage() {
  return (
    <main className={styles.homepage}>
      <HomeNav />
      <section>
        <h1>
          Fabric - The start of anew
          <br />
        </h1>
        <h2>click below to explore the world of greatness</h2>
        <Link to="/login" className={styles.cta}>
          Explore
        </Link>
      </section>
    </main>
  );
}
