import "./App.css";

import quotebook from "./assets/quotebook.png";
import NewQuote from "./components/NewQuote";
import Quotes from "./components/Quotes";

function App() {
  return (
    <div className="App">
      <img
        src={quotebook}
        alt="black leading double quotation mark with a circle drawn around."
      />
      <h1>Hack @ UCI Tech Deliverable</h1>

      <NewQuote />

      <Quotes />
    </div>
  );
}

export default App;
