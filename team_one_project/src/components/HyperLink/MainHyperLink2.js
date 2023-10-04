import "../../App.css";
// import UniTaskLogo_new from "../images/UniTaskLOGO.PNG";
import UniTaskLogo_old from "../../images/Logo_old.PNG";

import LoginSignup from "../../pages/LoginSignup";
import { Link } from "react-router-dom";
import React from "react";

export function MainHyperLink3() {
    //userinput: an array of user inputs in json
    //Linkswrap: the wrapper of the links section; classname="linkssect"
    //links: the list of the links
    //userlinks: feature of Linkswrap, refer to userinput
    //userlink: each item in the userinput/userlinks array

    function Linkswrap(props){
        const links = (
            <ul>
                {props.userlinks.map((userlink) =>
                    <li key={userlink.name}>
                        {userlink.link}
                    </li>
                )}
            </ul>
        )
        return (
            <div className={props.className}>
                {links}
            </div>
        )
    }


    //fake demo userinput:
    const userinput=[{
        name:"github",
        //the text of the link should be modifiable!(=name)
        link:<Link to="https://github.com/ROLFFFX/CS_370_Team_One/tree/main">
            github
        </Link>
    }];

    return (
        <div>
          <Linkswrap className={"linkssect"}
                     userlinks={userinput}>
          </Linkswrap>

            //allow user to add their links
          <div className={"addbuttonwrap"}>
              <button
                id="addlinkbutton"
                onClick={userinput.push(
                    {
                        name: "xxx",
                        link: <Link to={"xxx"}>

                            <Link/>
                    }
                )}
              >
                Add Link Button
              </button>
          </div>
        </div>
    );
}
