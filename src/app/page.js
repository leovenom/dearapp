import Image from "next/image";
import styles from "./page.module.css";
import LandingPage from "./LandingPage";

export default function Home() {
  return (
    <main className={styles.main}>
      <LandingPage />
    </main>
  );
}
