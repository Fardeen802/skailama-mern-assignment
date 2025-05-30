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
  IconButton,
} from '@mui/material';
import { DeleteFilesOfProject, fetchFilesByProject } from '../controller/registerController';
import cloud_upload from "../assets/cloud_upload.png"

const FileTableBox = ({_id,setSee,rows,setRows}) => {
  

  function formatReports(data) {
    return data.map((item, index) => {
      const date = new Date(item.uploadedAt);
      const uploadDate = date.toISOString().split('T')[0];
      console.log(data);
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
        _id:item?._id
      };
    });
  }
  // Delete row by filtering it out
  const handleDelete = async(id) => {
    console.log("delete row",rows,id);
    const result = await DeleteFilesOfProject(id);
    if (result?.message==="SUCCESS"){
      console.log("result from hadnle,",result);
      setRows(prev => prev.filter(row => row._id !== id));
    }
    
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
    {rows.length!=0 &&(<Typography
      variant="h6"
      fontWeight={600}
      sx={{
        mb: 2,
        textAlign: 'left',
        fontSize: { xs: '1rem', sm: '1.2rem', md: '1.5rem' },
      }}
    >
      Your Files
    </Typography>)}
  
    <TableContainer
      // component={Paper}
      sx={{
        flex: 1, // Makes it take up remaining space in the box
        overflowY: 'auto',
        
      }}
    >
      <Table size="small">
        <TableHead sx={{backgroundColor:'#EDEDED'}}>
          {rows.length!=0 &&(<TableRow >
            <TableCell>No</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Upload Date</TableCell>
            <TableCell>Time</TableCell>
            <TableCell align="center">Action</TableCell>
          </TableRow>)}
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
                  onClick={() => handleDelete(row._id)}
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
            <>
            <IconButton>
            <img src={cloud_upload}/>
            </IconButton>
            <Box>
              <Typography fontWeight={400} fontSize="25px">
              Select a file or drag and drop here (Podcast Media or Transcription Text)
              </Typography>
              <Typography fontWeight={400} variant='subtitle2' sx={{marginTop:'20px',fontSize:'16px'}}>
              MP4, MOV, MP3, WAV, PDF, DOCX or TXT file
              </Typography>
              <Button
  variant="outlined"
  sx={{
    marginTop:'40px',
    color: '#7E22CE',
    height:'40px',
    width:'140px',
    borderRadius:'192px',
    borderColor: '#7E22CE',
    '&:hover': {
      borderColor: '#7E22CE',
      backgroundColor: 'rgba(126, 34, 206, 0.08)', // subtle hover effect
    },
  }}
>
  Select File
</Button>
            </Box>
            </>
          )
          }
        </TableBody>
      </Table>
    </TableContainer>
  </Box>
  

  );
};

export default FileTableBox;
