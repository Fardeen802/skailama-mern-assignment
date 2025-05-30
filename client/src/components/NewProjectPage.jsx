import React, { useEffect, useState } from 'react';
import { Box, Typography, Button, IconButton, Avatar } from '@mui/material';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import CreateProjectModal from './createProjectModel'; // Make sure this file exists and exports a component
import { useNavigate } from 'react-router-dom';
import { createProject, fetchUserProjects } from '../controller/registerController';
import purpleLogo from '../assets/purpleLogo.png'
import sittingPeople from '../assets/sittingPeople.svg'

const NewProjectPage = () => {
  const [openModal, setOpenModal] = useState(false);
  const [projects, setProjects] = useState([]);
  const navigate = useNavigate();
  const handleCreate = async(title) => {
    try {
      const result = await createProject(title);
      console.log("result from new projects page",result);
      if (result?.data?.message==="Project created"){
        setProjects((prev)=>[result?.data?.project,...prev]);
      }

    } catch (error) {
      console.log("error",error);
    }
   
   
  };

  const getProjects = async () => {
    try {
      const initialProjects = await fetchUserProjects();
      if(initialProjects?.data?.message==="SUCCESS"){
        setProjects(initialProjects?.data?.projectsNames);
      }
      console.log("intial",initialProjects?.data?.projectsNames
      );
      
    } catch (error) {
      console.error("Error fetching projects", error);
    }
  };

  useEffect(() => {
    getProjects();
  }, []);
  const formatLastEdited = (timestamp) => {
    const date = new Date(timestamp);
    const now = new Date();
  
    const isToday = date.toDateString() === now.toDateString();
  
    const yesterday = new Date();
    yesterday.setDate(now.getDate() - 1);
    const isYesterday = date.toDateString() === yesterday.toDateString();
  
    if (isToday) {
      return `${date.toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
        hour12: true
      })}`;
    } else if (isYesterday) {
      return `Yesterday`;
    } else {
      return `${date.toLocaleDateString(undefined, {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
      })}`;
    }
  };
  
  return (
    <Box sx={{ minHeight: '100vh', p: 4, boxSizing: 'border-box' }}>
      {/* Header */}
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={6}>
        <Box display="flex" alignItems="center" gap={1}>
          <img src={purpleLogo} alt="Ques.AI" style={{ height: 40 }} />
          
        </Box>

        <Box display="flex" alignItems="center" gap={2}>
          <IconButton><SettingsOutlinedIcon sx={{ fontSize: 28,color:'black' }} /></IconButton>
          <IconButton><NotificationsNoneIcon sx={{ fontSize: 28,color:'black',ml:"-3px" }} /></IconButton>
        </Box>
      </Box>

      {/* Content */}
      <Box textAlign="center" display="flex" flexDirection="column" alignItems="center" justifyContent="center" mt={8}>
       { projects.length === 0?(
        <>
        <Typography variant="h4" fontWeight="bold" color="#7E22CE" gutterBottom>
          Create a New Project
        </Typography>

        <img
          src={sittingPeople}
          alt="Create project"
          style={{ width: '100%', maxWidth: 400, margin: '24px 0' }}
        />

        <Typography variant="body1" sx={{ color: '#777', maxWidth: 600, mb: 4 }}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit...
        </Typography>
        </>):null}
        
        {projects.length === 0 ? (
  // Centered when no projects
  <Box display="flex" justifyContent="center" mt={4}>
    <Button
      variant="contained"
      sx={{
        backgroundColor: '#1E0E3F',
        color: '#fff',
        borderRadius: 2,
        px: 4,
        py: 1.5,
        height: '50px',
        width: '300px',
        fontWeight: 600,
        '&:hover': {
          backgroundColor: '#3A2559',
        },
      }}
      onClick={() => setOpenModal(true)}
      startIcon={<span style={{ fontSize: 24 }}>＋</span>}
    >
      Create New Project
    </Button>
  </Box>
) : (
  // Right-aligned when there are projects
  <Box display="flex" justifyContent="space-between" alignItems="center" width="100%" mt={4}>
  <Box>
    <Typography variant="h4" fontWeight="bold" color='#7E22CE'>
      Projects
    </Typography>
  </Box>
  
  <Button
    variant="contained"
    sx={{
      backgroundColor: '#1E0E3F',
      color: '#fff',
      borderRadius: 2,
      px: 4,
      py: 1.5,
      height: '50px',
      width: '300px',
      fontWeight: 600,
      '&:hover': {
        backgroundColor: '#3A2559',
      },
    }}
    onClick={() => setOpenModal(true)}
    startIcon={<span style={{ fontSize: 24 }}>＋</span>}
  >
    Create New Project
  </Button>
</Box>

)}

        <CreateProjectModal
          open={openModal}
          handleClose={() => setOpenModal(false)}
          handleCreate={handleCreate}
        />

        {/* List existing projects */}
      
      </Box>
      
     

<Box mt={3} 
sx={{
  display: "flex",
    flexWrap: "wrap",
    gap: 1, 
    justifyContent: "flex-start", 
}}
>
  {projects.map((project, i) => (
    <Box
      key={i}
      sx={{
        width: 250,
        height: 60,
        display: "flex",
        alignItems: "center",
        gap: 2,
        p: 1.25,
        mb: 1.5,
        borderRadius: "16px",
        backdropFilter: "blur(6px)",
        backgroundColor: "rgba(255, 255, 255, 0.7)",
        border: "1px solid #90caf9",
        boxShadow: 3,
      }}
      onClick={() => navigate('/podcast', { state: { projectTitle: project?.name,_id:project?._id } })}
    >
      {/* Left - Avatar or Image */}
      <Avatar sx={{ width: 64, height: 64, bgcolor: "#1976d2",borderRadius: 2, }}>SP</Avatar>

      {/* Right - Text Content */}
      <Box>
        <Typography variant="subtitle" fontWeight={600} sx={{
          alignItems:'flex-start',display:'flex'
        }}>
          {project?.name}
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{textAlign:'left'}}>
        {project?.fileCount} Files 
        </Typography>
        <Typography variant="body2" color="text.secondary">
        {project?.fileCount !== 0 
  ? `Last Edited:${formatLastEdited(project?.lastEdited)} `
  : `Created on: ${formatLastEdited(project?.created) }`}
        </Typography>
      </Box>
    </Box>
  ))}
</Box>

    </Box>
  );
};

export default NewProjectPage;
