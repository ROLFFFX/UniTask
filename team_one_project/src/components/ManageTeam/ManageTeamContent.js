import Diversity2Icon from "@mui/icons-material/Diversity2";
import GroupAddIcon from "@mui/icons-material/GroupAdd";
import GroupRemoveIcon from "@mui/icons-material/GroupRemove";
import {
  Box,
  Divider,
  List,
  ListItem,
  ListItemText,
  Typography,
  Paper,
  IconButton,
} from "@mui/material";
import Button from "@mui/material/Button";
import React from "react";
import InviteNewMemberModal from "./InviteNewMemberModal";

const dummyTeamMember = [
  { userName: "Yuxuan Shi", userEmail: "yshi373@emory.edu" },
  { userName: "Alec Bergers", userEmail: "alec.berger7@emory.edu" },
];

export default function ManageTeamContent() {
  const [openModal, setOpenModal] = React.useState(false);
  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => setOpenModal(false);
  const handleRemoveUser = (tobeRemoved) => {
    alert("Removing " + tobeRemoved);
  };
  return (
    <React.Fragment>
      <Box
        sx={{
          marginTop: 15,
          display: "flex",
          flexDirection: "column",
          //   alignItems: "center",
          maxWidth: "lg", // Or another desired value, or remove maxWidth
          padding: "40px",
          backgroundColor: "white",
          borderRadius: "16px", // Adjust this value for more or less rounded corners
          boxShadow: "0 3px 5px rgba(0, 0, 0, 0.3)", // Adjust values and color for desired shadow effect
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
          <Typography sx={{ color: "#343A40", fontSize: 20 }}>
            Manage Team Members
          </Typography>
        </Box>
        <Divider sx={{ width: "100%", padding: 1 }}></Divider>
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
          <Typography sx={{ color: "#343A40", fontSize: 14 }}>
            {dummyTeamMember.length} Current Members
          </Typography>
        </Box>
        <Box
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <List
            sx={{ width: "100%", maxWidth: 600, bgcolor: "background.paper" }}
          >
            {dummyTeamMember.map((member) => (
              <Box
                key={member.userEmail}
                style={{
                  border: "1px solid black",
                  borderRadius: 5,

                  marginTop: "5px",
                }}
                paddingLeft="15px"
                paddingRight="15px"
              >
                <ListItem
                  key={member.userEmail}
                  disableGutters
                  secondaryAction={
                    <IconButton
                      aria-label="remove"
                      onClick={() => handleRemoveUser(member.userName)}
                    >
                      <GroupRemoveIcon />
                    </IconButton>
                  }
                >
                  <ListItemText
                    primary={`${member.userName}`}
                    secondary={member.userEmail}
                    secondaryTypographyProps={{ style: { color: "#6C757D" } }}
                  />
                </ListItem>
              </Box>
            ))}
          </List>
        </Box>
      </Box>
    </React.Fragment>
  );
}
