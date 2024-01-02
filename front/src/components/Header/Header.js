import styles from "./Header.module.css";

function Header() {
  return (
    <header className={styles.headerContainer}>
      <div>
        <h1>Le tracker fou</h1>
      </div>
      <nav></nav>
    </header>
  );
}

export default Header;
