import styles from "./Homepage.module.css";
import RegisterForm from "./components/RegisterForm";

function Homepage() {
  return (
    <div className={styles.homepageContainer}>
      <h2 className={styles.homepageTitle}>Homepage (pas connecté)</h2>
      <div className={styles.homepageMainContent}>
        <div className={`${styles.homepageMainItems}`}>
          <h3>Le tracker Fou</h3>
          <p>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Eos minus
            veniam culpa soluta reiciendis assumenda neque, corrupti laudantium,
            nobis fugiat porro fugit maxime facere quis ipsum ea obcaecati
            accusantium quos.
          </p>
        </div>
        <div className={`${styles.homepageMainItems}`}>
          <h3>Créer un compte</h3>
          <RegisterForm />
        </div>
        <div className={`${styles.homepageMainItems}`}>
          <h3>Se connecter</h3>
        </div>
      </div>
    </div>
  );
}

export default Homepage;
