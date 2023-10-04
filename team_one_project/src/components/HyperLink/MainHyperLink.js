import "../../App.css";
// import UniTaskLogo_new from "../images/UniTaskLOGO.PNG";
import UniTaskLogo_old from "../../images/Logo_old.PNG";

import LoginSignup from "../../pages/LoginSignup";
import { Link } from "react-router-dom";
import React, {useState} from "react";
import {v4 as uuidv4} from 'uuid';

export function MainHyperLink() {
    //const [list, setList] = useState(userlinks);
    const [action, setAction] = useState("Display");
    const [name, setName] = useState('');
    const [link, setLink] = useState('');


    var userlinks = [{Lk:"xxx", id:"xxx"}];
    const [list, setList] = useState(userlinks);
    function changeName(event) {
        setName(event.target.value);
    }
    //modify to make it a link!!!!!!!!!!!!!!!!!!!!!!!!!!!
    function changeLink(event) {
        setLink(event.target.value);
    }
    function addLinks(){
        const newlist = list.concat([{
            Lk: <Link to={link}
                      title={name}
            />,
            id: uuidv4() //to have a stable key attribute for the item
        }]);

        setList(newlist);

        setName('new item');//modify----------------
    }

    return (
        <div className={"hyperlinks"}>
            <button
                id="addlinkbutton"
                onClick={() => setAction("Add Item")}
            ></button>
            {action === "Add Item" ? (
                <div className="addLink">
                  <input type="name"
                         onChange={changeName}
                         defaultValue="Customize a Name for Your Link"
                  />
                  <input type="link"
                         onChange={changeLink}
                         defaultValue="Copy Link Here"
                  />
                  <button onClick={() => {
                      addLinks();
                      setAction("Display");
                    }
                  }>
                      Save
                  </button>
                </div>
              ) : null}
            <ul>
                {list.map((userlink) =>(
                    <li key={userlink.id}>{userlink.Lk}</li>
                ))}
            </ul>
        </div>
    )
}
