import "../App.css";
import UniTaskLogo from "../images/Logo.PNG";

function Links() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={UniTaskLogo} className="App-logo" alt="logo" />
        <pre></pre>
        <a
          className="App-link"
          href="https://www.figma.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          Figma Link
        </a>
        <pre></pre>
        <a
          className="App-link"
          href="https://www.google.com/slides"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powerpoint Link
        </a>
        <pre></pre>
        <a
          className="App-link"
          href="https://docs.google.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          GoogleDoc Link
        </a>
      </header>
    </div>
  );
}

export default Links;
