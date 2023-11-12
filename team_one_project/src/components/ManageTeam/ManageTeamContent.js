import Diversity2Icon from "@mui/icons-material/Diversity2";
import GroupAddIcon from "@mui/icons-material/GroupAdd";
import {
  Box,
  Divider,
  List,
  ListItem,
  ListItemText,
  Typography,
} from "@mui/material";
import Button from "@mui/material/Button";
import React from "react";
import InviteNewMemberModal from "./InviteNewMemberModal";

const dummyTeamMember = [
  { userName: "Yuxuan Shi", userEmail: "yshi373@emory.edu" },
  { userName: "Alec", userEmail: "alec.berger7@emory.edu" },
];

export default function ManageTeamContent() {
  const [openModal, setOpenModal] = React.useState(false);
  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => setOpenModal(false);
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
            {dummyTeamMember.length} Members
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
            sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}
          >
            {dummyTeamMember.map((member) => (
              <ListItem
                key={member.userEmail}
                disableGutters
                secondaryAction={
                  <Diversity2Icon aria-label="comment">
                    <Diversity2Icon />
                  </Diversity2Icon>
                }
              >
                <ListItemText primary={`${member.userName}`} />
              </ListItem>
            ))}
          </List>
        </Box>
      </Box>
    </React.Fragment>
  );
}
