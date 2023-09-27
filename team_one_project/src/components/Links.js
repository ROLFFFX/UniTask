import "../App.css";
<<<<<<< Updated upstream
import UniTaskLogo from "../images/Logo.PNG";
=======
import UniTaskLogo_new from "../images/UniTaskLOGO.PNG"; 
import UniTaskLogo_old from "../images/Logo_old.PNG";

import LoginSignup from "../pages/LoginSignup";
import { Link } from "react-router-dom";
>>>>>>> Stashed changes

function Links() {
  return (
    <div className="App">
      <header className="App-header">
<<<<<<< Updated upstream
        <img src={UniTaskLogo} className="App-logo" alt="logo" />
=======
        <img src={UniTaskLogo_new} className="App-logo" alt="logo" />
>>>>>>> Stashed changes
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
