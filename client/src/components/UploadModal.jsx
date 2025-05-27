import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Avatar,
  IconButton,
  Typography,
  Box
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

const UploadModal = ({
  open,
  onClose,
  sourceName,
  avatarText,
  color = '#FF0000',
  userId,
  onUpload,
}) => {
  const [name, setName] = useState('');
  const [transcript, setTranscript] = useState('');

  const handleUpload = () => {
    onUpload({ name, transcript, userId });
    setName('');
    setTranscript('');
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>
        <Box display="flex" alignItems="center" justifyContent="space-between">
          <Box display="flex" alignItems="center" gap={2}>
            <Avatar sx={{ bgcolor: color }}>{avatarText}</Avatar>
            <Typography variant="h6">Upload from {sourceName}</Typography>
          </Box>
          <IconButton onClick={onClose}>
            <CloseIcon />
          </IconButton>
        </Box>
      </DialogTitle>
      <DialogContent sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <TextField
          label="Name"
          fullWidth
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <TextField
          label="Transcript"
          fullWidth
          multiline
          minRows={4}
          value={transcript}
          onChange={(e) => setTranscript(e.target.value)}
        />
      </DialogContent>
      <DialogActions>
        <Button
          onClick={handleUpload}
          variant="contained"
          sx={{ bgcolor: '#1c132b', '&:hover': { bgcolor: '#2a1c40' } }}
        >
          Upload
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default UploadModal;
