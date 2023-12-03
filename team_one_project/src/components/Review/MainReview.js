import { Box, Button, Divider, Grid, Modal, Typography } from "@mui/material";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import axios from "axios";
import React, { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";
import { ENDPOINT_URL } from "../../hooks/useConfig";
import TextField from "@mui/material/TextField";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";

// Text field styling for modify record
const textFieldStyle = {
  width: "100%",
  "& .Mui-disabled": {
    fontFamily: "Inter, sans-serif",
    WebkitTextFillColor: "#212529", // Override text color for webkit browsers
  },
  "& .MuiInputBase-input.Mui-disabled": {
    WebkitTextFillColor: "#212529", // change inner text color
    fontSize: 15,
    fontFamily: "Inter, sans-serif",
  },
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      borderColor: "#ADB5BD", // Style for outline
    },
    "&:hover fieldset": {
      borderColor: "#212529", // Style on hover
    },
    "&.Mui-focused fieldset": {
      borderColor: "#212529", // Style when the input is focused
    },
    "& input": {
      color: "#212529", // Style for user input
      fontSize: 15, // Font size for input
      fontFamily: "Inter, sans-serif", // Font family for input
    },
    "& textarea": {
      color: "#212529", // Style for textarea (for multiline)
      fontSize: 15, // Font size for textarea
      fontFamily: "Inter, sans-serif", // Font family for textarea
    },
  },
  "& .MuiInputLabel-root.Mui-focused": {
    color: "#212529",
    fontSize: 15, // Font size for label when input is focused
    fontFamily: "Inter, sans-serif", // Font family for label when input is focused
  },
};

// Text field styling for add record
const addNewRecordTextFieldStyle = {
  width: "100%",
  "& label": {
    color: "#212529", // Style for label
    fontSize: 15, // Font size for label
    fontFamily: "Inter, sans-serif", // Font family for label
  },
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      borderColor: "#ADB5BD", // Style for outline
    },
    "&:hover fieldset": {
      borderColor: "#212529", // Style on hover
    },
    "&.Mui-focused fieldset": {
      borderColor: "#212529", // Style when the input is focused
    },
    "& input": {
      color: "#212529", // Style for user input
      fontSize: 15, // Font size for input
      fontFamily: "Inter, sans-serif", // Font family for input
    },
    "& textarea": {
      color: "#212529", // Style for textarea (for multiline)
      fontSize: 15, // Font size for textarea
      fontFamily: "Inter, sans-serif", // Font family for textarea
    },
  },
  "& .MuiInputLabel-root.Mui-focused": {
    color: "#212529",
    fontSize: 15, // Font size for label when input is focused
    fontFamily: "Inter, sans-serif", // Font family for label when input is focused
  },
};

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
  textAlign: "center",
};

export function MainReview() {
  /* Hooks Declrations-------------------------------------------------------------------------------------------------------------------- */
  const { auth } = useAuth();
  const [records, setRecords] = useState([]); // records stores the records as a list of JSON objects
  const [selectedIndex, setSelectedIndex] = React.useState(1); // for clicking the review list on left
  const [selectedRecord, setSelectedRecord] = useState(); // for selected record rendered at view record
  const [backdropOpen, setBackdropOpen] = React.useState(false); //loading page
  const [addNewRecord, setAddNewRecord] = useState({
    reportName: "",
    accomplishment: "",
    feedback: "",
    memberComment: "",
  }); // to store the new record user wants to add
  const [openDeleteConfirm, setOpenDeleteConfirm] = useState(false); // handles the confirmation pop up menu
  const handleOpenDeleteConfirm = () => {
    setOpenDeleteConfirm(true);
  };
  const handleCloseDeleteConfirm = () => {
    setOpenDeleteConfirm(false);
  };
  const [modifyMode, setModifyMode] = useState(false); // controls the mode of view page.
  const [modifiedRecord, setModifiedRecord] = useState({}); // keep track of changes in modify mode
  /* End of Hooks Declrations-------------------------------------------------------------------------------------------------------------------- */

  /* Helper Functions Declrations-------------------------------------------------------------------------------------------------------------------- */
  // handles the clicking of review list on left
  const handleListItemClick = (index, record) => {
    setModifyMode(false);
    setSelectedIndex(index);
    setSelectedRecord(record);
  };

  // handles changes in textfield when adding a new record
  const handleInputChangeWhenAdding = (e) => {
    const { name, value } = e.target;
    setAddNewRecord((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // handles adding a new task
  const handleAddNewRecord = () => {
    addNewRecordToDB();
  };

  // handles deleting a record.
  const handleDeleteRecord = () => {
    // selectedRecord is the record to be deleted. / .reportId
    handleOpenDeleteConfirm();
  };

  // handles the evenet of modifying the textfield in modify change
  const handleModifyInputChange = (e) => {
    const { name, value } = e.target;
    setModifiedRecord((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // handles modify a record. changes the modify mode.
  const handleModifyRecord = () => {
    setModifyMode(true);
    setModifiedRecord({ ...selectedRecord });
  };

  // handles submitting PUT request.
  const handleSubmitModifyRecord = () => {
    updateModifyRecord();
    // console.log("Updated Record:", modifiedRecord); // Log the modified record
    // @todo: when modify mode is true, textfield should be enabled and ready for listening to new change
    setModifyMode(true); // last step: change back to normal mode
  };

  /* End of Helper Functions Declrations-------------------------------------------------------------------------------------------------------------------- */

  /* Requests Declrations-------------------------------------------------------------------------------------------------------------------- */
  // GET Method to retrieve all existing records
  const fetchAllRecords = async () => {
    setBackdropOpen(true); //display loading page

    const projectTitle = auth.selectedWorkspace;
    const url = `${ENDPOINT_URL}reports/getListReports/${projectTitle}`;
    try {
      const response = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${auth.user.userJWT}`,
        },
      });
      setRecords(response.data); // records state now contains a list of reports
    } catch (error) {
      console.error("Error caught on fetching records: ", error);
    } finally {
      setBackdropOpen(false);
    }
  };

  // POST Method to add new record
  const addNewRecordToDB = async () => {
    // console.log(addNewRecord); addNewRecord contains the record for item to be inserted
    setBackdropOpen(true); //display loading page
    const projectTitle = auth.selectedWorkspace;
    const url = `${ENDPOINT_URL}reports/createReport/${projectTitle}`;
    try {
      const response = await axios.post(url, addNewRecord, {
        headers: {
          Authorization: `Bearer ${auth.user.userJWT}`,
        },
      });
      setAddNewRecord({
        // emptied out setAddNewRecord
        reportName: "",
        accomplishment: "",
        feedback: "",
        memberComment: "",
      });
      fetchAllRecords(); // if success, refetch page to reflect newest change
      console.log("Successfully added new record!");
    } catch (error) {
      alert("Input is too long!");
      console.error("Error caught on adding new records: ", error);
    } finally {
      setBackdropOpen(false);
    }
  };

  // DELETE Method to delete a selected record
  const deleteSelectedRecord = async () => {
    setBackdropOpen(true); // Display loading backdrop
    const url = `${ENDPOINT_URL}reports/deleteReport/${selectedRecord.reportId}`;
    try {
      const response = await axios.delete(url, {
        headers: {
          Authorization: `Bearer ${auth.user.userJWT}`,
        },
      });
      console.log("Record deleted successfully:", response.data);
      fetchAllRecords();
    } catch (error) {
      console.error("Error deleting the record:", error);
    } finally {
      setBackdropOpen(false);
    }
  };

  // PUT Method to modify a record
  const updateModifyRecord = async () => {
    setBackdropOpen(true); //display loading page
    const reportId = modifiedRecord.reportId;
    console.log("Tmodified record is: ");
    console.log(modifiedRecord);
    const url = `${ENDPOINT_URL}reports/editReport/${reportId}`;
    const formattedModifiedRecord = {
      reportName: modifiedRecord.reportName,
      accomplishment: modifiedRecord.accomplishment,
      feedback: modifiedRecord.feedback,
      memberComment: modifiedRecord.memberComment,
    };
    try {
      const response = await axios.put(url, formattedModifiedRecord, {
        headers: {
          Authorization: `Bearer ${auth.user.userJWT}`,
        },
      });
      fetchAllRecords(); // if success, refetch page to reflect newest change
      console.log("Successfully updated new record!");
    } catch (error) {
      alert("Input is too long!");
      console.error("Error caught on adding new records: ", error);
    } finally {
      setBackdropOpen(false);
    }
  };

  /* End of Requests Declrations-------------------------------------------------------------------------------------------------------------------- */

  /* useEffect Declrations-------------------------------------------------------------------------------------------------------------------- */
  useEffect(() => {
    fetchAllRecords();
    // console.log(records);
  }, []);
  /* End of useEffect Declrations-------------------------------------------------------------------------------------------------------------------- */

  return (
    <Box sx={{ marginLeft: "200px" }} padding={2}>
      {/* loading state */}
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={backdropOpen}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      {/* delete record confirmation */}
      <Modal
        open={openDeleteConfirm}
        onClose={handleCloseDeleteConfirm}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={modalStyle}>
          <Typography
            id="modal-modal-title"
            variant="h6"
            component="h2"
            style={{ fontFamily: "Inter, sans-serif" }}
          >
            Warning!!
          </Typography>
          <Typography
            id="modal-modal-description"
            sx={{ mt: 2 }}
            style={{ fontFamily: "Inter, sans-serif" }}
          >
            The deletion of a record is an irreversible action. Please confirm
            that you wish to permanently remove this record.
          </Typography>
          <Grid container marginTop={5}>
            <Grid item xs={6}>
              <Button
                variant="outlined"
                color="inherit"
                onClick={() => {
                  handleCloseDeleteConfirm();
                }}
              >
                Cancel
              </Button>
            </Grid>
            <Grid item xs={6}>
              <Button
                variant="outlined"
                color="error"
                onClick={() => {
                  deleteSelectedRecord();
                  handleCloseDeleteConfirm();
                }}
              >
                I want to delete it
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Modal>
      {/* actual page */}
      <Grid container>
        {/* header */}
        <Grid item xs={12}>
          <Typography
            sx={{
              color: "#343A40",
              fontSize: 28,
              fontFamily: "Inter, sans-serif",
              marginLeft: "20px",
              // fontWeight: "bold",
            }}
          >
            Insepct & Adapt
          </Typography>
        </Grid>
        <Divider width="100%" sx={{ marginTop: "10px" }}></Divider>
        {/* main content for reflect */}
        <Box sx={{ width: "100vw", height: "calc(100vh - 155px)" }}>
          <Grid container>
            {/* Weekly Review Records, displaying names as buttons */}
            {/* Review Records ------------------------------------------------------------------------------------------------------------------------------------------*/}
            <Grid
              item
              xs={4}
              style={{ display: "flex", justifyContent: "center" }}
            >
              <Box
                sx={{
                  marginTop: "30px",
                  backgroundColor: "white",
                  borderRadius: "16px",
                  boxShadow: "0 3px 5px rgba(0, 0, 0, 0.3)",
                  height: "calc(100vh - 200px)",
                  width: "calc((100vw - 200px) / 3 - 40px)",
                  maxWidth: "calc((100vw - 200px) / 3 - 40px)",
                }}
              >
                <Box
                  sx={{
                    bgcolor: "#495057",
                    height: "80px",
                    borderRadius: "16px 16px 0 0",
                    boxShadow: "0  rgba(0, 0, 0, 0.3)",
                    textAlign: "center",
                  }}
                >
                  <Typography
                    sx={{
                      color: "#F8F9FA",
                      fontSize: 16,
                      fontFamily: "Inter, sans-serif",
                      padding: "25px",
                    }}
                  >
                    Current Records
                  </Typography>
                </Box>
                <Box
                  sx={{
                    height: "calc(100vh - 340px)",
                    overflowY: "auto",
                    maxHeight: "calc(100vh - 340px)",
                    padding: 3,
                  }}
                >
                  {/* renders the report titles as a clickable list */}
                  <List component="nav" aria-label="secondary mailbox folder">
                    {records.map((record, index) => (
                      <ListItemButton
                        key={record.reportId} // Using reportId as a unique key
                        selected={selectedIndex === index}
                        onClick={() => handleListItemClick(index, record)}
                        sx={{ height: "50px" }}
                      >
                        <ListItemText
                          primary={record.reportName}
                          sx={{
                            "& .MuiListItemText-primary": {
                              fontFamily: "Inter, sans-serif",
                              fontSize: "15px",
                              // when name exceeds 30 characters, hide the rest and substitute with ...
                              overflow: "hidden",
                              textOverflow: "ellipsis",
                              whiteSpace: "nowrap",
                              maxWidth: "30ch",
                            },
                          }}
                        />
                      </ListItemButton>
                    ))}
                  </List>
                </Box>
              </Box>
            </Grid>
            {/* View Record ------------------------------------------------------------------------------------------------------------------------------------------*/}
            <Grid
              item
              xs={4}
              style={{ display: "flex", justifyContent: "center" }}
            >
              <Box
                sx={{
                  marginTop: "30px",
                  backgroundColor: "white",
                  borderRadius: "16px",
                  boxShadow: "0 3px 5px rgba(0, 0, 0, 0.3)",
                  height: "calc(100vh - 200px)",
                  width: "calc((100vw - 200px) / 3 - 40px)",
                  maxWidth: "calc((100vw - 200px) / 3 - 40px)",
                }}
              >
                <Box
                  sx={{
                    bgcolor: "#495057",
                    height: "80px",
                    borderRadius: "16px 16px 0 0",
                    boxShadow: "0  rgba(0, 0, 0, 0.3)",
                    textAlign: "center",
                  }}
                >
                  <Typography
                    sx={{
                      color: "#F8F9FA",
                      fontSize: 16,
                      fontFamily: "Inter, sans-serif",
                      padding: "25px",
                    }}
                  >
                    View Record
                  </Typography>
                </Box>
                <Box
                  sx={{
                    height: "calc(100vh - 340px)",
                    overflowY: "hidden",
                    maxHeight: "calc(100vh - 340px)",
                    padding: 3,
                  }}
                >
                  {/* Actual Textfields */}
                  {selectedRecord ? (
                    <Grid container>
                      {/* Record Title */}
                      <Grid item xs={12}>
                        <TextField
                          id="record-title"
                          label="Record Title"
                          multiline
                          rows={1}
                          name="reportName"
                          onChange={handleModifyInputChange}
                          value={
                            modifyMode
                              ? modifiedRecord.reportName
                              : selectedRecord?.reportName || ""
                          }
                          disabled={!modifyMode}
                          sx={textFieldStyle}
                        />
                      </Grid>
                      {/* Accomplishment This Week */}
                      <Grid item xs={12} marginTop="15px">
                        <TextField
                          id="accomplishment"
                          label="Accomplishment This Week"
                          multiline
                          rows={3}
                          name="accomplishment"
                          onChange={handleModifyInputChange}
                          value={
                            modifyMode
                              ? modifiedRecord.accomplishment
                              : selectedRecord?.accomplishment || ""
                          }
                          disabled={!modifyMode}
                          sx={textFieldStyle}
                        />
                      </Grid>
                      {/* FeedBack from Others */}
                      <Grid item xs={12} marginTop="15px">
                        <TextField
                          id="feedback"
                          label="FeedBack from Others"
                          name="feedback"
                          multiline
                          rows={3}
                          value={
                            modifyMode
                              ? modifiedRecord.feedback
                              : selectedRecord?.feedback || ""
                          }
                          onChange={handleModifyInputChange}
                          disabled={!modifyMode}
                          sx={textFieldStyle}
                        />
                      </Grid>
                      {/* Any comment & memo from team? */}
                      <Grid item xs={12} marginTop="15px">
                        <TextField
                          id="memberComment"
                          label="Any Comment & Memo from Team?"
                          name="memberComment"
                          multiline
                          rows={3}
                          value={
                            modifyMode
                              ? modifiedRecord.memberComment
                              : selectedRecord?.memberComment || ""
                          }
                          onChange={handleModifyInputChange}
                          disabled={!modifyMode}
                          sx={textFieldStyle}
                        />
                      </Grid>
                      <Grid
                        item
                        xs={12}
                        style={{ display: "flex", justifyContent: "center" }}
                      >
                        <div>
                          {modifyMode ? (
                            <>
                              <Button
                                variant="outlined"
                                color="inherit"
                                sx={{ marginTop: "15px", fontSize: "12px" }}
                                onClick={() => {
                                  setModifyMode(false);
                                }}
                              >
                                Cancel
                              </Button>
                              <Button
                                variant="outlined"
                                color="inherit"
                                sx={{
                                  marginTop: "15px",
                                  marginLeft: "15px",
                                  fontSize: "12px",
                                }}
                                onClick={handleSubmitModifyRecord}
                              >
                                submit change
                              </Button>
                            </>
                          ) : (
                            <>
                              {/* Modify Button */}
                              <Button
                                variant="outlined"
                                color="inherit"
                                sx={{ marginTop: "15px", fontSize: "12px" }}
                                onClick={handleModifyRecord}
                              >
                                modify record
                              </Button>
                              {/* Delete Button */}
                              <Button
                                variant="outlined"
                                color="inherit"
                                sx={{
                                  marginTop: "15px",
                                  marginLeft: "15px",
                                  fontSize: "12px",
                                }}
                                onClick={handleDeleteRecord}
                              >
                                Delete record
                              </Button>
                            </>
                          )}
                        </div>
                      </Grid>
                    </Grid>
                  ) : (
                    <Box>
                      <Typography
                        sx={{ fontSize: 15, fontFamily: "Inter, sans-serif" }}
                      >
                        Please select a record under [Current Review Records] to
                        view, modify, and delete.
                      </Typography>
                    </Box>
                  )}
                </Box>
              </Box>
            </Grid>
            {/* Add New Report ------------------------------------------------------------------------------------------------------------------------------------------*/}
            <Grid
              item
              xs={4}
              style={{ display: "flex", justifyContent: "center" }}
            >
              <Box
                sx={{
                  marginTop: "30px",
                  backgroundColor: "white",
                  borderRadius: "16px",
                  boxShadow: "0 3px 5px rgba(0, 0, 0, 0.3)",
                  height: "calc(100vh - 200px)",
                  width: "calc((100vw - 200px) / 3 - 40px)",
                  maxWidth: "calc((100vw - 200px) / 3 - 40px)",
                }}
              >
                <Box
                  sx={{
                    bgcolor: "#495057",
                    height: "80px",
                    borderRadius: "16px 16px 0 0",
                    boxShadow: "0  rgba(0, 0, 0, 0.3)",
                    textAlign: "center",
                  }}
                >
                  <Typography
                    sx={{
                      color: "#F8F9FA",
                      fontSize: 16,
                      fontFamily: "Inter, sans-serif",
                      padding: "25px",
                    }}
                  >
                    Add New Record
                  </Typography>
                </Box>
                <Box
                  sx={{
                    height: "calc(100vh - 340px)",
                    overflowY: "hidden",
                    maxHeight: "calc(100vh - 340px)",
                    padding: 3,
                  }}
                >
                  {/* Content of adding new record */}
                  <Grid container>
                    {/* Record Title */}
                    <Grid item xs={12}>
                      <TextField
                        id="report-title"
                        name="reportName"
                        label="Record Title"
                        multiline
                        rows={1}
                        sx={addNewRecordTextFieldStyle}
                        value={addNewRecord.reportName}
                        onChange={handleInputChangeWhenAdding}
                      />
                    </Grid>
                    {/* Accomplishment This Week */}
                    <Grid item xs={12} marginTop="15px">
                      <TextField
                        id="accomplishment-record"
                        name="accomplishment"
                        label="Accomplishment This Week"
                        multiline
                        rows={3}
                        sx={addNewRecordTextFieldStyle}
                        onChange={handleInputChangeWhenAdding}
                        value={addNewRecord.accomplishment}
                      />
                    </Grid>
                    {/* FeedBack from Others */}
                    <Grid item xs={12} marginTop="15px">
                      <TextField
                        id="feedback-record"
                        name="feedback"
                        label="FeedBack from Others"
                        multiline
                        rows={3}
                        sx={addNewRecordTextFieldStyle}
                        onChange={handleInputChangeWhenAdding}
                        value={addNewRecord.feedback}
                      />
                    </Grid>
                    {/* Any comment & memo from team? */}
                    <Grid item xs={12} marginTop="15px">
                      <TextField
                        id="comment-memo"
                        name="memberComment"
                        label="Any Comment & Memo from Team?"
                        multiline
                        rows={3}
                        sx={addNewRecordTextFieldStyle}
                        onChange={handleInputChangeWhenAdding}
                        value={addNewRecord.memberComment}
                      />
                    </Grid>
                    <Grid
                      item
                      xs={12}
                      style={{ display: "flex", justifyContent: "center" }}
                    >
                      <Button
                        variant="outlined"
                        color="inherit"
                        sx={{ marginTop: "15px", fontSize: "12px" }}
                        onClick={handleAddNewRecord}
                        disabled={
                          !addNewRecord.reportName ||
                          !addNewRecord.accomplishment ||
                          !addNewRecord.feedback ||
                          !addNewRecord.memberComment
                        }
                      >
                        Submit record
                      </Button>
                    </Grid>
                  </Grid>
                  {/* End of Content of adding new record */}
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Grid>
    </Box>
  );
}
