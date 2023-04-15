import "./App.css";

import quotebook from "./assets/quotebook.png";
import Quotes from "./components/Quotes";

function App() {
  return (
    <div className="App">
      <img
        src={quotebook}
        alt="black leading double quotation mark with a circle drawn around."
      />
      <h1>Hack @ UCI Tech Deliverable</h1>

      <h2>Submit a quote</h2>
      {/* TODO: implement custom form submission logic to not refresh the page */}
      <form action="/api/quote" method="post">
        <label htmlFor="input-name">Name</label>
        <input type="text" name="name" id="input-name" required />
        <label htmlFor="input-message">Quote</label>
        <input type="text" name="message" id="input-message" required />
        <button type="submit">Submit</button>
      </form>

      <Quotes />
    </div>
  );
}

export default App;
