import MenuIcon from "@mui/icons-material/Menu";
import AppBar from "@mui/material/AppBar";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Toolbar from "@mui/material/Toolbar";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";
import * as React from "react";
import barTheme from "./barTheme";

import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import TextField from '@mui/material/TextField';
import AddLinkIcon from '@mui/icons-material/AddLink';
import LinkIcon from '@mui/icons-material/Link';

import {useState} from "react";
import {v4 as uuidv4} from "uuid";

import UniTaskLogo_new from "../../images/UniTaskLOGO.PNG";
import { ThemeProvider } from "@mui/material";

export function TopAppBar() {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const pages = [];
  const settings = ["Option to be determined"];

  const [state, setState] = useState(false);//drawer state

  const [action, setAction] = useState("Static"); //actions on add new hyperlink
  const [itAction, setitAction] = useState("Static"); //actions on change/remove list items
  const [linkName, setLinkName] = useState("");
  const [link, setLink] = useState("");

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

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
                  <AddLinkIcon />
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
    <ThemeProvider theme={barTheme}>
      <AppBar
        position="relative"
        sx={{ backgroundColor: "#5A67BA", zIndex: 1201, height: "64px" }}
      >
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <Avatar
              src={UniTaskLogo_new}
              sx={{ display: { xs: "none", md: "flex" }, mr: 2 }}
            />
            {/* <Typography
              variant="h6"
              noWrap
              component="a"
              // sx={{
              //   mr: 2,
              //   display: { xs: "none", md: "flex" },
              //   fontFamily: "monospace",
              //   fontWeight: 700,
              //   letterSpacing: ".3rem",
              //   color: "inherit",
              //   textDecoration: "none",
              // }}
            >
              UniTask
            </Typography> */}

            <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={()=>toggleDrawer(true)}
                color="inherit"
              >
                <LinkIcon fontsize={"large"}/>
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorElNav}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "left",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "left",
                }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={{
                  display: { xs: "block", md: "none" },
                }}
              >
                {pages.map((page) => (
                  <MenuItem key={page} onClick={handleCloseNavMenu}>
                    <Typography textAlign="center">{page}</Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
            <Typography
              variant="h5"
              noWrap
              component="a"
              sx={{
                mr: 2,
                display: { xs: "flex", md: "none" },
                flexGrow: 1,
                fontFamily: "monospace",
                fontWeight: 700,
                letterSpacing: ".3rem",
                color: "inherit",
                textDecoration: "none",
              }}
            >
              UniTask
            </Typography>
            <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
              {pages.map((page) => (
                <Button
                  key={page}
                  onClick={handleCloseNavMenu}
                  sx={{ my: 2, color: "white", display: "block" }}
                >
                  {page}
                </Button>
              ))}
            </Box>

            <Box sx={{ flexGrow: 0 }}>
              <Tooltip title="Open settings">
                <IconButton
                  style={{ color: "black" }}
                  onClick={handleOpenUserMenu}
                  sx={{ p: 0 }}
                >
                  {/* For Top Right Button / User */}
                  <Avatar src={UniTaskLogo_new} alt="Remy Sharp" />
                </IconButton>
              </Tooltip>
              <Menu
                sx={{ mt: "45px" }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                {settings.map((setting) => (
                  <MenuItem key={setting} onClick={handleCloseUserMenu}>
                    <Typography textAlign="center">{setting}</Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
      <Drawer
          anchor='top'
          open={state}
          onClose={()=>toggleDrawer(false)}
      >
        {list()}
      </Drawer>
    </ThemeProvider>
  );
}
