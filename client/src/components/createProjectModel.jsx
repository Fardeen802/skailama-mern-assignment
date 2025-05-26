import React, { useState } from "react";
import {
  Modal,
  Box,
  Typography,
  TextField,
  Button,
} from "@mui/material";

const CreateProjectModal = ({ open, handleClose, handleCreate }) => {
  const [title, setTitle] = useState("");
  const [error, setError] = useState("");

  const onSubmit = () => {
    if (title.trim() === "") {
      setError("Project Name can't be empty");
      return;
    }
    setError("");
    handleCreate(title); // Pass the title to parent handler
    setTitle("");
    handleClose(); // Close the modal
  };

  const modalStyle = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "#fff",
    boxShadow: 24,
    p: 4,
    borderRadius: 3,
  };

  return (
    <Modal open={open} onClose={handleClose}>
      <Box sx={modalStyle}>
        <Typography variant="h6" fontWeight="bold" gutterBottom>
          Create Project
        </Typography>
        <Typography variant="subtitle1" gutterBottom>
          Enter Project Name:
        </Typography>
        <TextField
          fullWidth
          placeholder="Type here"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          error={Boolean(error)}
          helperText={error}
          sx={{ mb: 2 }}
        />
        <Box sx={{ display: "flex", justifyContent: "space-between", mt: 2 }}>
          <Button onClick={handleClose} color="error">
            Cancel
          </Button>
          <Button
            onClick={onSubmit}
            variant="contained"
            sx={{ bgcolor: "#7B2CBF", "&:hover": { bgcolor: "#5A189A" } }}
          >
            Create
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default CreateProjectModal;
