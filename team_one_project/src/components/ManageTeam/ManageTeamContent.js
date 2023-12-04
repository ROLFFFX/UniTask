/**
 * @fileoverview This file includes the ManageTeamContent component and renderMemberItem function,
 * which are used for managing and displaying team members within a workspace. It also includes
 * functionality to add / remove users.
 */

import Diversity2Icon from "@mui/icons-material/Diversity2";
import GroupAddIcon from "@mui/icons-material/GroupAdd";
import GroupRemoveIcon from "@mui/icons-material/GroupRemove";
import {
  Box,
  Divider,
  IconButton,
  ListItem,
  ListItemText,
  Typography,
  Modal,
  Grid,
} from "@mui/material";
import Backdrop from "@mui/material/Backdrop";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { FixedSizeList } from "react-window";
import useAuth from "../../hooks/useAuth";
import { ENDPOINT_URL } from "../../hooks/useConfig";
import InviteNewMemberModal from "./InviteNewMemberModal";

const modalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

/**
 * Renders an individual team member item in a list using react-window to virtualize table.
 *
 * @param {object} props - The props passed by react-window, including index and style.
 * @param {Array} teamMembers - An array of team member objects.
 * @param {function} handleRemoveUser - Function to handle removal of a user.
 * @returns {React.ReactElement} A React element representing a single team member in the list.
 */
function renderMemberItem(props, teamMembers, handleRemoveUser) {
  const { index, style } = props;
  const member = teamMembers[index];
  return (
    <Box
      key={member.userEmail}
      style={{
        ...style,
        boxSizing: "border-box",
        width: "100%",
      }}
    >
      <ListItem
        key={member.userEmail}
        disableGutters
        secondaryAction={
          <IconButton
            aria-label="remove"
            onClick={() => handleRemoveUser(member.userEmail)}
            sx={{ padding: 3 }}
          >
            <GroupRemoveIcon />
          </IconButton>
        }
      >
        <ListItemText
          primary={`${member.userName}`}
          secondary={member.userEmail}
          secondaryTypographyProps={{ style: { color: "#6C757D" } }}
          sx={{
            marginLeft: 5,
            "& .MuiListItemText-primary": {
              fontFamily: "Inter, sans-serif",
            },
          }}
        />
      </ListItem>
    </Box>
  );
}

/**
 * ManageTeamContent - A functional component for displaying and managing team members.
 *
 * This component provides an interface for viewing the list of team members and managing them. It allows
 * users to invite new members and remove existing ones. It fetches team member data from server API and displays
 * it using react-window (FixedSizeList).
 *
 * State:
 * @state @type {boolean} openModal - Controls the visibility of the invite modal.
 * @state @type {boolean} backdropOpen - Boolean to control the display of the loading backdrop.
 * @state @type {Array} teamMembers - An array of objects representing the team members.
 *
 * @returns {React.ReactElement} A React element representing the team management interface.
 */
export default function ManageTeamContent() {
  const [openModal, setOpenModal] = useState(false);
  const [backdropOpen, setBackdropOpen] = useState(false); //loading page
  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => setOpenModal(false);
  const [openDeleteSelfModal, setOpenDeleteSelfModal] = useState(false);
  const [openDeleteOthersModal, setOpenDeleteOthersModal] = useState(false);
  const [userToBeDeleted, setUserToBeDeleted] = useState();
  const handleOpenDeleteSelfModal = () => setOpenDeleteSelfModal(true);
  const handleClosenDeleteSelfModal = () => setOpenDeleteSelfModal(false);
  const handleOpenDeleteOthersModal = () => setOpenDeleteOthersModal(true);
  const handleClosenDeleteOthersModal = () => setOpenDeleteOthersModal(false);
  const { auth } = useAuth();
  const { logout } = useAuth();
  const projectTitle = auth.selectedWorkspace;
  const [teamMembers, setTeamMembers] = useState([]);
  const refreshTeamMembers = () => {
    //refetch team member, specifically used after success invitation
    fetchTeamMembers(); // Re-fetch team members
  };

  // validation step before actually deleting the user
  const handleRemoveUser = async (userEmail) => {
    setUserToBeDeleted(userEmail);
    // add check to see how many users are left in the workspace. if only one, do not delete.
    if (teamMembers.length == 1) {
      alert("Every workspace must have at least one active user.");
      return;
    }
    if (userEmail === auth.user.userEmail) {
      handleOpenDeleteSelfModal();
    } else {
      handleOpenDeleteOthersModal();
    }
  };

  // DELETE Request for deleting the user from workspace
  const deleteUserByEmail = async (userEmail) => {
    setBackdropOpen(true); //display loading page
    try {
      const response = await axios.delete(
        `${ENDPOINT_URL}projects/deleteUserFromWorkspace/${userEmail}/${projectTitle}`,
        {
          headers: {
            Authorization: `Bearer ${auth.user.userJWT}`,
          },
        }
      );
      if (response.status === 204) {
        console.log("User removed successfully.");
        refreshTeamMembers();
      }
    } catch (error) {
      console.error("Error removing user from project: ", error);
    } finally {
      setBackdropOpen(false);
    }
  };

  const fetchTeamMembers = async () => {
    setBackdropOpen(true); //display loading page
    try {
      const response = await axios.get(
        `${ENDPOINT_URL}projects/workspaceMembers/${projectTitle}`,
        {
          headers: {
            Authorization: `Bearer ${auth.user.userJWT}`,
          },
        }
      );
      // Parse the response data and update the team member state
      const parsedTeamMembers = response.data.map((user) => ({
        userName: user.username,
        userEmail: user.email,
      }));
      setTeamMembers(parsedTeamMembers);
    } catch (error) {
      console.error("Error fetching team members:", error);
    } finally {
      setBackdropOpen(false);
    }
  };

  useEffect(() => {
    fetchTeamMembers();
  }, []);

  return (
    <React.Fragment>
      {/* Delete self Modal */}
      <Modal
        open={openDeleteSelfModal}
        onClose={handleClosenDeleteSelfModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={modalStyle}>
          <Typography
            id="modal-modal-title"
            variant="h6"
            component="h2"
            style={{ fontFamily: "Inter, sans-serif" }}
            textAlign={"center"}
          >
            Warning!!
          </Typography>
          <Typography
            id="modal-modal-description"
            sx={{ mt: 2 }}
            style={{ fontFamily: "Inter, sans-serif" }}
          >
            Are you sure you want to exit the workspace? <br />
            Your Progress in the workspace so far will be saved, and you can
            rejoin this workspace with the same account.
          </Typography>
          <Grid
            container
            marginTop={5}
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Grid item xs={6}>
              <Box width={"100%"} display={"flex"} alignItems="end">
                <Button
                  variant="outlined"
                  color="inherit"
                  onClick={() => {
                    handleClosenDeleteSelfModal();
                  }}
                >
                  Cancel
                </Button>
              </Box>
            </Grid>
            <Grid item xs={6}>
              <Box
                width={"100%"}
                display={"flex"}
                justifyContent="end"
                alignItems="end"
              >
                <Button
                  variant="outlined"
                  color="error"
                  onClick={() => {
                    deleteUserByEmail(userToBeDeleted);
                    handleClosenDeleteSelfModal();
                    logout();
                  }}
                >
                  Yes, exit group
                </Button>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Modal>
      {/* End of Delete self Modal */}
      {/* Delete Others Modal */}
      <Modal
        open={openDeleteOthersModal}
        onClose={handleClosenDeleteOthersModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={modalStyle}>
          <Typography
            id="modal-modal-title"
            variant="h6"
            component="h2"
            style={{ fontFamily: "Inter, sans-serif" }}
            textAlign={"center"}
          >
            Warning!!
          </Typography>
          <Typography
            id="modal-modal-description"
            sx={{ mt: 2 }}
            style={{ fontFamily: "Inter, sans-serif" }}
          >
            {`Are you sure you want to delete user with email ${userToBeDeleted} from the workspace?`}
            <br />
            <br />
            {`His/Her progress in the workspace so far will be saved, and you can
            reinvite user into this workspace anytime. `}
          </Typography>
          <Grid
            container
            marginTop={5}
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Grid item xs={6}>
              <Box width={"100%"} display={"flex"} alignItems="end">
                <Button
                  variant="outlined"
                  color="inherit"
                  onClick={() => {
                    handleClosenDeleteOthersModal();
                  }}
                >
                  Cancel
                </Button>
              </Box>
            </Grid>
            <Grid item xs={6}>
              <Box
                width={"100%"}
                display={"flex"}
                justifyContent="end"
                alignItems="end"
              >
                <Button
                  variant="outlined"
                  color="error"
                  onClick={() => {
                    deleteUserByEmail(userToBeDeleted);
                    handleClosenDeleteOthersModal();
                  }}
                >
                  Yes, delete
                </Button>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Modal>
      {/* End of Delete Others Modal */}

      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={backdropOpen}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          maxWidth: "lg",
          padding: "40px",
          backgroundColor: "white",
          borderRadius: "16px",
          boxShadow: "0 3px 5px rgba(0, 0, 0, 0.3)",
        }}
      >
        <Box
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Diversity2Icon style={{ marginRight: 8 }} />
          <Typography
            sx={{
              color: "#343A40",
              fontSize: 20,
              fontFamily: "Inter, sans-serif",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            Manage Team Members:{"  "}
            <span
              style={{
                overflow: "hidden",
                fontWeight: "bold",
                maxWidth: "10ch",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
                display: "inline-block",
              }}
            >
              {`  `}
              {auth.selectedWorkspace}
            </span>
          </Typography>
        </Box>
        <Divider sx={{ width: "100%", padding: 1 }} />
        <Box
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
          padding={3}
        >
          <Button onClick={handleOpenModal} variant="outlined" color="inherit">
            <GroupAddIcon style={{ marginRight: 8 }} />
            Invite New Team Member
          </Button>
          <InviteNewMemberModal
            open={openModal}
            handleClose={handleCloseModal}
            onInviteSuccess={refreshTeamMembers}
          />
        </Box>

        <Box
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
          padding={3}
        >
          <Typography
            sx={{
              color: "#343A40",
              fontSize: 14,
              fontFamily: "Inter, sans-serif",
            }}
          >
            {teamMembers.length} Current Members
          </Typography>
        </Box>
        <Box
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <FixedSizeList
            height={380}
            width="100%"
            itemSize={65}
            itemCount={teamMembers.length}
            overscanCount={5}
          >
            {(props) => renderMemberItem(props, teamMembers, handleRemoveUser)}
          </FixedSizeList>
        </Box>
      </Box>
    </React.Fragment>
  );
}
