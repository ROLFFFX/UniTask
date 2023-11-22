import React, { useEffect, useState } from "react";
import { Box } from "@mui/material";
import { Typography } from "@mui/material";
import { Divider } from "@mui/material";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import LoginIcon from "@mui/icons-material/Login";
import { ListItem } from "@mui/material";
import { ListItemButton } from "@mui/material";
import { ListItemText } from "@mui/material";
import Diversity3Icon from "@mui/icons-material/Diversity3";
import useAuth from "../../../hooks/useAuth";
import axios from "axios";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import { FixedSizeList, ListChildComponentProps } from "react-window";
import { ENDPOINT_URL } from "../../../hooks/useConfig";

function renderWorkspaceRow(props, workspaces, handleClick) {
  //handles the rendering of each workspace
  const { index, style } = props;
  const workspaceTitle = workspaces[index];
  return (
    <ListItem style={style} key={index} component="div" disablePadding>
      <ListItemButton onClick={() => handleClick(index)}>
        <Diversity3Icon sx={{ marginLeft: 10 }} />
        <ListItemText primary={" " + workspaceTitle} sx={{ marginLeft: 5 }} />
      </ListItemButton>
    </ListItem>
  );
}

export default function LoginWithGroup() {
  const { auth, setAuth } = useAuth();
  const token = auth.user.userJWT;
  const [workspaces, setWorkspaces] = useState([]);
  const [backdropOpen, setBackdropOpen] = useState(false); //loading page

  useEffect(() => {
    const fetchUserWorkspaces = async () => {
      setBackdropOpen(true); //display loading page
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      try {
        const response = await axios.get(
          `${ENDPOINT_URL}projects/getUserWorkspaces`,
          config
        );
        if (response.status === 200) {
          setWorkspaces(response.data.map((project) => project.projectTitle));
        } else if (response.status === 204) {
          console.log("No workspaces found for the user");
        }
      } catch (error) {
        console.error("Error fetching workspaces: ", error);
      } finally {
        setBackdropOpen(false);
      }
    };
    fetchUserWorkspaces();
  }, []);
  const navigate = useNavigate();
  const handleNavigate = () => {
    navigate("/dashboard");
  };
  const handleClick = (index) => {
    //setAuth
    const selectedWorkspaceTitle = workspaces[index];
    setAuth({ ...auth, selectedWorkspace: selectedWorkspaceTitle });
    navigate("/dashboard");
  };
  return (
    <React.Fragment>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={backdropOpen}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      <Box
        sx={{
          marginTop: 15,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          maxWidth: "lg", // Or another desired value, or remove maxWidth
          padding: "40px",
          backgroundColor: "white",
          borderRadius: "16px", // Adjust this value for more or less rounded corners
          boxShadow: "0 3px 5px rgba(0, 0, 0, 0.3)", // Adjust values and color for desired shadow effect
        }}
      >
        <Box style={{ display: "flex", alignItems: "center" }}>
          <LoginIcon style={{ marginRight: 8 }} />
          <Typography sx={{ color: "#343A40", fontSize: 25 }}>
            Login to Your Workspace
          </Typography>
        </Box>

        <Divider sx={{ width: "100%", padding: 1 }}></Divider>
        <Typography
          sx={{
            color: "#343A40",
            padding: 1,
            paddingLeft: 4,
            paddingRight: 4,
            marginTop: 3,
            marginBottom: 3,
          }}
        >
          We detect that you are currently in these workspaces below. Please
          click the one you want to log in with. (*You might scroll this list.)
        </Typography>
        {/* {workspaces.map((workspaceTitle, index) => (
          <ListItem key={index} sx={{ marginLeft: 20 }}>
            {<Diversity3Icon />}
            <ListItemButton
              onClick={() => handleClick(index)}
              sx={{ marginRight: 20 }}
            >
              <ListItemText primary={workspaceTitle} />
            </ListItemButton>
          </ListItem>
        ))} */}

        <FixedSizeList
          height={190}
          width={500}
          itemSize={46}
          itemCount={workspaces.length}
          overscanCount={5}
        >
          {(props) => renderWorkspaceRow(props, workspaces, handleClick)}
        </FixedSizeList>

        {/* <Button
          variant="contained"
          style={{
            backgroundColor: "#343A40",
            color: "#E9ECEF",
            fontSize: "11px",
          }}
          onClick={handleNavigate}
        >
          Tester Login
        </Button> */}
      </Box>
    </React.Fragment>
  );
}
