import React, { useState } from 'react';
import {
  Box,
  Typography,
  Avatar,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  IconButton,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { CreateFilesByProject } from '../controller/registerController';

const InfoCard = ({ _id ,title, subtitle, iconLetter, color = '#1976d2', sourceName = 'Source' }) => {
  const [open, setOpen] = useState(false);
  

  // Modal input states
  const [name, setName] = useState('');
  const [transcript, setTranscript] = useState('');

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleUpload = async() => {
    // Your upload logic here, for example console log or API call
    console.log('Uploading:', { _id,name, transcript });
    const result = await CreateFilesByProject({ projectId: _id, filename: name, transcript });
    if (result?.status===201){
        console.log(result);
    }
    // Close dialog after upload
    setOpen(false);
    // Reset form (optional)
    setName('');
    setTranscript('');
  };

  return (
    <>
      <Box
        onClick={handleOpen}
        sx={{
          cursor: 'pointer',
          width: { xs: '100%', sm: 300 },
          height: { xs: 'auto', sm: 90 },
          borderRadius: 3,
          boxShadow: '0px 3px 10px rgba(0, 0, 0, 0.1)',
          backgroundColor: '#fff',
          px: 2,
          py: 2,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          '&:hover': {
            boxShadow: '0px 6px 15px rgba(0,0,0,0.15)',
          },
        }}
      >
        <Box>
          <Typography variant="subtitle1" fontWeight={600}>
            {title}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {subtitle}
          </Typography>
        </Box>
        <Avatar
          sx={{
            bgcolor: color,
            borderRadius: '10px',
            width: 80,
            height: 80,
          }}
        >
          {iconLetter}
        </Avatar>
      </Box>

      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
        <DialogTitle>
          <Box display="flex" alignItems="center" justifyContent="space-between">
            <Box display="flex" alignItems="center" gap={2}>
              <Avatar sx={{ bgcolor: color }}>{iconLetter}</Avatar>
              <Typography variant="h6">Upload from {sourceName}</Typography>
            </Box>
            <IconButton onClick={handleClose}>
              <CloseIcon />
            </IconButton>
          </Box>
        </DialogTitle>
          
        <DialogContent sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <TextField

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
    </>
  );
};

export default InfoCard;
