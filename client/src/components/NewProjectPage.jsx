import React, { useEffect, useState } from 'react';
import { Box, Typography, Button, IconButton, Avatar } from '@mui/material';
import SettingsIcon from '@mui/icons-material/Settings';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import CreateProjectModal from './createProjectModel'; // Make sure this file exists and exports a component

const NewProjectPage = () => {
  const [openModal, setOpenModal] = useState(false);
  const [projects, setProjects] = useState([]);

  const handleCreate = (title) => {
    setProjects((prev) => [...prev, { title }]);
    console.log("Project Created:", title);
  };

  const getProjects = async () => {
    try {
      const initialProjects = [
        { title: "First" },
        { title: "Second" }
      ];
      setProjects(initialProjects);
    } catch (error) {
      console.error("Error fetching projects", error);
    }
  };

  useEffect(() => {
    getProjects();
  }, []);

  return (
    <Box sx={{ minHeight: '100vh', p: 4, boxSizing: 'border-box' }}>
      {/* Header */}
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={6}>
        <Box display="flex" alignItems="center" gap={1}>
          <img src="/logo.svg" alt="Ques.AI" style={{ height: 40 }} />
          <Typography variant="h6" color="primary" fontWeight="bold">
            Ques.<span style={{ color: '#8B5CF6' }}>AI</span>
          </Typography>
        </Box>

        <Box display="flex" alignItems="center" gap={2}>
          <IconButton><SettingsIcon sx={{ fontSize: 28 }} /></IconButton>
          <IconButton><NotificationsNoneIcon sx={{ fontSize: 28 }} /></IconButton>
        </Box>
      </Box>

      {/* Content */}
      <Box textAlign="center" display="flex" flexDirection="column" alignItems="center" justifyContent="center" mt={8}>
       { !projects?(
        <>
        <Typography variant="h4" fontWeight="bold" color="primary" gutterBottom>
          Create a New Project
        </Typography>

        <img
          src="/illustration.png"
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
    <Typography variant="h4" fontWeight="bold" color='purple'>
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
    >
      {/* Left - Avatar or Image */}
      <Avatar sx={{ width: 64, height: 64, bgcolor: "#1976d2",borderRadius: 2, }}>SP</Avatar>

      {/* Right - Text Content */}
      <Box>
        <Typography variant="subtitle" fontWeight={600} sx={{
          alignItems:'flex-start',display:'flex'
        }}>
          {project.title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Last edited: 2 hours ago
        </Typography>
      </Box>
    </Box>
  ))}
</Box>

    </Box>
  );
};

export default NewProjectPage;
