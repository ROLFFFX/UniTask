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

import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import TextField from "@mui/material/TextField";
import AddLinkIcon from "@mui/icons-material/AddLink";
import LinkIcon from "@mui/icons-material/Link";
import { ENDPOINT_URL } from "../../hooks/useConfig";

import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";

import UniTaskLogo_new from "../../images/UniTaskLOGO.PNG";
import { ButtonGroup, ThemeProvider } from "@mui/material";

import axios from "axios";
import { useCookies } from "react-cookie";
import useAuth from "../../hooks/useAuth";

export function TopAppBar() {
  const { auth } = useAuth();
  const projectTitle = auth.selectedWorkspace;

  const [linksList, setLinksList] = useState([]);

  const getLinksList = async () => {
    try {
      const response = await axios.get(
        `${ENDPOINT_URL}hyperlinks/getAllHyperlinks/${projectTitle}`,
        //const response = await axios.get(`http://localhost:8080/getAllHyperlinks/${projectTitle}`,
        {
          headers: {
            Authorization: `Bearer ${auth.user.userJWT}`,
          },
        }
      );
      // console.log("got links list", response.data);
      setLinksList(response.data);
    } catch (error) {
      console.error("Error getting list", error);
    }
  };

  useEffect(() => {
    getLinksList();
  }, []);

  async function updateLinksList(editedlink, thisid) {
    //e.preventDefault();
    // console.log("edited link", editedlink);
    try {
      const response = await axios.put(
        `${ENDPOINT_URL}hyperlinks/editHyperlink/${thisid}`,
        //const response = await axios.put(`http://localhost:8080/editHyperlink/${editedlink.id}`,
        editedlink,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${auth.user.userJWT}`,
          },
        }
      );
    } catch (error) {
      console.error("Error updating list:", error);
    }
  }

  async function deleteLinksList(thisid) {
    try {
      const response = await axios.delete(
        `${ENDPOINT_URL}hyperlinks/deleteHyperlink/${thisid}`,
        //const response = await axios.delete(`http://localhost:8080/editHyperlink/${deletedlink.id}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${auth.user.userJWT}`,
          },
        }
      );
    } catch (error) {
      console.error("Error deleting link", error);
    }
  }

  async function submitLinksList(newlink) {
    // e.preventDefault();
    try {
      const response = await axios.post(
        `${ENDPOINT_URL}hyperlinks/createHyperlink/${projectTitle}`,
        //const response = await axios.post(`http://localhost:8080/createHyperlink/${projectTitle}`,
        newlink,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${auth.user.userJWT}`,
          },
        }
      );
      newlink.hyperlinkId = response.data.hyperlinkId;
      // console.log("submitted link", newlink);
    } catch (error) {
      console.error("Error submitting list", error);
    }
  }

  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const pages = [];
  const settings = ["Option to be determined"];

  const [state, setState] = useState(false); //drawer state

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

  function changeName(event) {
    setLinkName(event.target.value);
  }
  function changeLink(event) {
    setLink(event.target.value);
  }

  function addLinks() {
    //console.log("!linkName", !linkName, !link);

    if (!linkName || !link) {
      return;
    }
    const newlink = {
      url:
        link.startsWith("http://") || link.startsWith("https://")
          ? link
          : `http://${link}`,
      title: linkName,
    };
    setLinksList([...linksList, newlink]);
    // console.log("current usestate list:", linksList);
    submitLinksList(newlink);
  }

  function editLinks(thisid) {
    if (!linkName || !link) {
      return;
    }
    const editedItem = {
      url:
        link.startsWith("http://") || link.startsWith("https://")
          ? link
          : `http://${link}`,
      title: linkName,
    };
    const index = linksList.findIndex((item) => item.hyperlinkId === thisid);
    const newlist = linksList.with(index, editedItem);
    setLinksList(newlist);
    // console.log("current usestate list:", linksList);
    updateLinksList(editedItem, thisid);
  }

  //TODO: newlink
  function removeLinks(thisid) {
    const newlist = linksList.filter(
      (userlink) => userlink.hyperlinkId !== thisid
    );
    setLinksList(newlist);
    // console.log("current usestate list:", linksList);
    deleteLinksList(thisid);
  }

  const toggleDrawer = (event) => {
    setState(event);
  };

  function cancelAction() {
    setAction("Static");
    setitAction("Static");
    setLink("");
    setLinkName("");
  }

  const list = () => (
    <Box sx={{ width: "auto", marginTop: "70px" }} role="presentation">
      <ListItemButton
        id="addlinkbutton"
        onClick={() => setAction("Add Item")}
        disabled={itAction !== "Static"}
      >
        <ListItemIcon>
          <AddLinkIcon />
        </ListItemIcon>
        <ListItemText primary={"Add a New Hyperlink"} />
      </ListItemButton>
      <form noValidate autoComplete={"off"}>
        {linksList.map((userlink) =>
          itAction === userlink.hyperlinkId ? (
            <ListItem>
              <TextField
                label="Edit Name"
                variant="outlined"
                defaultValue={userlink.title}
                onChange={(event) => changeName(event)}
                error={!linkName}
                helperText={!linkName ? "Name Cannot Be Empty" : null}
              />
              <TextField
                label="Edit Link"
                variant="outlined"
                defaultValue={userlink.url}
                onChange={(event) => changeLink(event)}
                error={!link}
                helperText={!link ? "Link Cannot Be Empty" : null}
              />
              <ButtonGroup>
                <Button
                  onClick={() => {
                    if (link && linkName) {
                      editLinks(userlink.hyperlinkId);
                      setitAction("Static");
                      setLink("");
                      setLinkName("");
                    }
                  }}
                >
                  Save Edit
                </Button>
                <Button onClick={() => cancelAction()}>Cancel</Button>
              </ButtonGroup>
            </ListItem>
          ) : (
            <ListItem
              key={userlink.hyperlinkId}
              onMouseOver={() =>
                itAction !== "Static" && itAction !== "Remove or Change?"
                  ? null
                  : setitAction("Remove or Change?")
              }
              onMouseOut={() =>
                itAction !== "Static" && itAction !== "Remove or Change?"
                  ? null
                  : setitAction("Static")
              }
              disablePadding
            >
              <ListItemButton
                href={userlink.url}
                target="_blank"
                rel="noopener noreferrer"
              >
                <ListItemText primary={userlink.title} />
              </ListItemButton>

              {itAction === "Remove or Change?" ? (
                <ButtonGroup>
                  <Button
                    onClick={() => {
                      removeLinks(userlink.hyperlinkId);
                      setitAction("Static");
                    }}
                  >
                    Remove
                  </Button>
                  <Button
                    onClick={() => {
                      setAction("Display");
                      setitAction(userlink.hyperlinkId);
                      setLinkName(userlink.title);
                      setLink(userlink.url);
                    }}
                  >
                    Edit
                  </Button>
                </ButtonGroup>
              ) : null}
            </ListItem>
          )
        )}
        {action === "Add Item" ? (
          <ListItem>
            <TextField
              label="Customize a Name"
              variant="outlined"
              onChange={(event) => changeName(event)}
              error={!linkName}
              helperText={!linkName ? "Name Cannot Be Empty" : null}
            />
            <TextField
              label="Copy Link Here"
              variant="outlined"
              onChange={(event) => changeLink(event)}
              error={!link}
              helperText={!link ? "Link Cannot Be Empty" : null}
            />
            <ButtonGroup>
              <Button
                onClick={() => {
                  if (link && linkName) {
                    addLinks();
                    setAction("Display");
                    setLink("");
                    setLinkName("");
                  }
                }}
              >
                Save
              </Button>
              <Button onClick={() => cancelAction()}>Cancel</Button>
            </ButtonGroup>
          </ListItem>
        ) : null}
      </form>
    </Box>
  );

  return (
    <ThemeProvider theme={barTheme}>
      <AppBar
        position="relative"
        sx={{ backgroundColor: "#343A40", zIndex: 1201, height: "64px" }}
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
                onClick={handleOpenNavMenu}
                color="inherit"
              >
                <MenuIcon />
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
              <Tooltip title="See Your Hyperlinks">
                <IconButton
                  style={{ color: "white" }}
                  onClick={() => {
                    state === false ? toggleDrawer(true) : toggleDrawer(false);
                    cancelAction();
                  }}
                  sx={{ p: 0 }}
                >
                  <LinkIcon />
                  {/* For Top Right Button / User */}
                  {/*<Avatar src={UniTaskLogo_new} alt="Remy Sharp" />*/}
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
        anchor="top"
        open={state}
        onClose={() => {
          toggleDrawer(false);
          cancelAction();
        }}
      >
        {list()}
      </Drawer>
    </ThemeProvider>
  );
}
