import React, { useState } from 'react';
import {
  Box,
  Typography,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Button,
  Paper,
  TableContainer,
} from '@mui/material';

const FileTableBox = () => {
  // Store table rows in state
  const [rows, setRows] = useState([
    { id: 1, name: 'Report 1', uploadDate: '2024-08-20', time: '10:30 AM' },
    { id: 2, name: 'Report 2', uploadDate: '2024-08-21', time: '11:45 AM' },
    { id: 3, name: 'Report 3', uploadDate: '2024-08-22', time: '01:00 PM' },
    { id: 1, name: 'Report 1', uploadDate: '2024-08-20', time: '10:30 AM' },
    { id: 2, name: 'Report 2', uploadDate: '2024-08-21', time: '11:45 AM' },
    { id: 3, name: 'Report 3', uploadDate: '2024-08-22', time: '01:00 PM' },
    { id: 1, name: 'Report 1', uploadDate: '2024-08-20', time: '10:30 AM' },
    { id: 2, name: 'Report 2', uploadDate: '2024-08-21', time: '11:45 AM' },
    { id: 3, name: 'Report 3', uploadDate: '2024-08-22', time: '01:00 PM' },
  ]);

  // Delete row by filtering it out
  const handleDelete = (id) => {
    setRows(prev => prev.filter(row => row.id !== id));
  };

  return (
    <Box
  sx={{
    width: '100%',
    maxWidth: 1000,
    minHeight: 429,
    mx: 'auto',
    px: { xs: 1, sm: 2, md: 3 },
    py: 3,
    backgroundColor: '#fff',
    borderRadius: 4,
    boxShadow: '0px 4px 20px rgba(0,0,0,0.1)',
    overflowX: 'auto',
  }}
>
  <Typography
    variant="h6"
    fontWeight={600}
    sx={{
      mb: 2,
      textAlign: 'left',
      fontSize: { xs: '1rem', sm: '1.2rem', md: '1.5rem' },
    }}
  >
    Your Files
  </Typography>

  <TableContainer component={Paper} sx={{ borderRadius: 2,maxHeight: 400 }}>
    <Table size="small">
      <TableHead>
        <TableRow>
          <TableCell>No</TableCell>
          <TableCell>Name</TableCell>
          <TableCell>Upload Date</TableCell>
          <TableCell>Time</TableCell>
          <TableCell align="center">Action</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {rows.map((row, idx) => (
          <TableRow key={row.id}>
            <TableCell>{idx + 1}</TableCell>
            <TableCell>{row.name}</TableCell>
            <TableCell>{row.uploadDate}</TableCell>
            <TableCell>{row.time}</TableCell>
            <TableCell align="center">
              <Button variant="outlined" size="small" sx={{ mr: 1 }}>
                View
              </Button>
              <Button
                variant="contained"
                color="error"
                size="small"
                onClick={() => handleDelete(row.id)}
              >
                Delete
              </Button>
            </TableCell>
          </TableRow>
        ))}
        {rows.length === 0 && (
          <TableRow>
            <TableCell colSpan={5} align="center">
              No data available.
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  </TableContainer>
</Box>

  );
};

export default FileTableBox;
