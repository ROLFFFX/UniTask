import "../../App.css";
import "./MainHyperLink.css";
import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";

export function MainHyperLink() {
  const [action, setAction] = useState("Display"); //actions on add new hyperlink
  const [name, setName] = useState("");
  const [link, setLink] = useState("");
  const [itAction, setitAction] = useState("Static"); //actions on changing/deleting list items

  var userlinks = [];
  const [list, setList] = useState(userlinks);
  function changeName(event) {
    setName(event.target.value);
  }
  function changeLink(event) {
    setLink(event.target.value);
  }
  function addLinks() {
    const newlist = list.concat([
      {
        Lk: (
          <a
            className="App-link"
            href={
              link.startsWith("http://") || link.startsWith("https://")
                ? link
                : `http://${link}`
            }
            target="_blank"
            rel="noopener noreferrer"
          >
            {name}
          </a>
        ),
        id: uuidv4(), //to have a stable key attribute for the item
      },
    ]);
    setList(newlist);
  }
  function removeLinks(id) {
    const newlist = list.filter((userlink) => userlink.id !== id);
    setList(newlist);
  }

  return (
    <div className={"main-hyperlinks hyperlinks"}>
      <button id="addlinkbutton" onClick={() => setAction("Add Item")}>
        Add a New Hyperlink
      </button>
      {action === "Add Item" ? (
        <div className="main-hyperlinks addLink">
          <label
            className={"main-hyperlinks input"}
            style={{ color: "black" }} //temporary for display, delete after creating css file
          >
            Customize a Name for Your Hyperlink
            <input type="name" onChange={changeName} />
          </label>
          <label
            className={"main-hyperlinks input"}
            style={{ color: "black" }} //^
          >
            Copy Link Here
            <input type="link" onChange={changeLink} />
          </label>
          <button
            onClick={() => {
              addLinks();
              setAction("Display");
            }}
          >
            Save
          </button>
        </div>
      ) : null}
      <ul>
        {list.map((userlink) => (
          <li
            key={userlink.id}
            onMouseOver={() => setitAction("Remove or Change?")}
            onMouseOut={() => setitAction("Static")}
          >
            {userlink.Lk}
            {itAction === "Remove or Change?" ? (
              <button onClick={() => removeLinks(userlink.id)}>Remove</button>
            ) : null}
          </li>
        ))}
      </ul>
    </div>
  );
}
