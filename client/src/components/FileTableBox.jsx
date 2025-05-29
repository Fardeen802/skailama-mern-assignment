import React, { useEffect, useState } from 'react';
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
import { fetchFilesByProject } from '../controller/registerController';

const FileTableBox = ({_id,setSee,rows,setRows}) => {
  // Store table rows in state
  

  function formatReports(data) {
    return data.map((item, index) => {
      const date = new Date(item.uploadedAt);
      const uploadDate = date.toISOString().split('T')[0];
  
      const time = date.toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
        hour12: true,
      });
  
      return {
        id: data.length - index, // reverse order
        name: item.filename,
        uploadDate,
        time,
        _id:data?._id
      };
    });
  }
  // Delete row by filtering it out
  const handleDelete = (id) => {
    setRows(prev => prev.filter(row => row.id !== id));
  };
  const fetchFiles=async()=>{
    try {
      const result = await fetchFilesByProject(_id);
      const formattedData = formatReports(result);
      
      return formattedData;
      
    } catch (error) {
      console.log("error",error);
    }
    
  }
  useEffect(() => {
    const getFiles = async () => {
      const result = await fetchFiles();
      if (Array.isArray(result)) {
        setRows(result);
      } else {
        setRows([]);            
      }
    };
  
    getFiles();
  }, []);

  return (
    <Box
    sx={{
      width: '100%',
      maxWidth: 1000,
      height: 400, // Fixed height
      mx: 'auto',
      px: { xs: 1, sm: 2, md: 3 },
      py: 3,
      backgroundColor: '#fff',
      borderRadius: 4,
      boxShadow: '0px 4px 20px rgba(0,0,0,0.1)',
      display: 'flex',
      flexDirection: 'column',
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
  
    <TableContainer
      // component={Paper}
      sx={{
        flex: 1, // Makes it take up remaining space in the box
        overflowY: 'auto',
        
      }}
    >
      <Table size="small">
        <TableHead sx={{backgroundColor:'#EDEDED'}}>
          <TableRow >
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
              <TableCell>{row.id}</TableCell>
              <TableCell>{row.name}</TableCell>
              <TableCell>{row.uploadDate}</TableCell>
              <TableCell>{row.time}</TableCell>
              <TableCell align="center">
                <Button
                  variant="outlined"
                  size="small"
                  sx={{ mr: 1 }}
                  onClick={() => setSee(true)}
                >
                  View
                </Button>
                <Button
                  variant="contained"
                  size="small"
                  onClick={() => handleDelete(row.id)}
                  sx={{
                    backgroundColor: 'white',
                    color: 'red',
                    border: '1px solid red',
                    '&:hover': {
                      backgroundColor: '#ffe6e6',
                    },
                  }}
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
