import Link from "next/link";
import styles from "./page.module.css";

export default function Login() {
  return (
    <main>
      <div className={styles.description}>
        <Link href={"/pages/dashboard"}>Got to Dashboard</Link>
      </div>
    </main>
  );
}
