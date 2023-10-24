import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
//import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import TextField from '@mui/material/TextField';
//import InboxIcon from '@mui/icons-material/MoveToInbox';
//import MailIcon from '@mui/icons-material/Mail';

import "../../App.css";
import {useState} from "react";
import {v4 as uuidv4} from "uuid";

export function HyperlinkDrawer() {
  const [state, setState] = useState(false);//drawer state

  const [action, setAction] = useState("Static"); //actions on add new hyperlink
  const [itAction, setitAction] = useState("Static"); //actions on change/remove list items
  const [linkName, setLinkName] = useState("");
  const [link, setLink] = useState("");

  var userlinks = [];
  const [linksList, setLinksList] = useState(userlinks); //json file
  function changeName(event) {
    setLinkName(event.target.value);
  }
  function changeLink(event) {
    setLink(event.target.value);
  }

  function addLinks() {
    const newlist = linksList.concat([
      {
        Lk: (link.startsWith("http://") || link.startsWith("https://")
                ? link
                : `http://${link}`
        ),
        name: linkName,
        id: uuidv4(), //to have a stable key attribute for the item
        icon: null,
      },
    ]);
    setLinksList(newlist);
  }
  function removeLinks(id) {
    const newlist = linksList.filter((userlink) => userlink.id !== id);
    setLinksList(newlist);
  }

  const toggleDrawer = (event) =>  {
    setState(event);
  };

  const list = () => (
    <Box
      sx={{ width: 'auto',
            marginTop: "70px",
      }}
      role="presentation"
      onClick={()=>toggleDrawer(true)}
      // onKeyDown={toggleDrawer(anchor, false)}
    >
      <ListItemButton id="addlinkbutton" onClick={() => setAction("Add Item")}>
              <ListItemIcon>
              </ListItemIcon>
              <ListItemText primary={"Add a New Hyperlink"} />
      </ListItemButton>
      <form noValidate autoComplete={"off"}>
        {linksList.map((userlink) => (
          <ListItem key={userlink.id}
                      onMouseOver={() => setitAction("Remove or Change?")}
                      onMouseOut={() => setitAction("Static")}
                    disablePadding>
            <ListItemButton
                href={userlink.Lk}
                target="_blank"
                rel="noopener noreferrer"
            >
              <ListItemIcon>
                {userlink.icon}
              </ListItemIcon>
              <ListItemText primary={userlink.name} />
            </ListItemButton>
            {itAction === "Remove or Change?" ? (
                <Button onClick={() => removeLinks(userlink.id)}>Remove</Button>
              ) : null}
          </ListItem>
        ))}
      {action==="Add Item"?
          <ListItem>
              <TextField label="Customize a Name" variant="outlined"
                         onChange={(event) => changeName(event)}
              />
              <TextField label="Copy Link Here" variant="outlined"
                         onChange={(event) => changeLink(event)}
              />
              <Button
                  onClick={() => {
                    addLinks();
                    setAction("Display");
                  }}
              >
                  Save
              </Button>
          </ListItem>
      :null}
      </form>
    </Box>
  );

  return (
    <Box>
        <div>
            <Button onClick={()=>toggleDrawer(true)}
                    sx={{marginLeft: "240px"
                    }}
            >Hyperlinks</Button>
            <Drawer
                anchor='top'
                open={state}
                onClose={()=>toggleDrawer(false)}
            >
              {list()}
            </Drawer>
        </div>
    </Box>
  );
}
