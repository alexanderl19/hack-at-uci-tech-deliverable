import quotebook from "./assets/quotebook.png";
import NewQuote from "./components/NewQuote";
import Quotes from "./components/Quotes";

import styles from "./App.module.css";

function App() {
  return (
    <div className={styles.app}>
      <img
        className={styles.icon}
        src={quotebook}
        alt="black leading double quotation mark with a circle drawn around."
      />
      <h1 className={styles.heading}>Hack @ UCI Tech Deliverable</h1>

      <NewQuote />

      <main>
        <Quotes />
      </main>
    </div>
  );
}

export default App;
