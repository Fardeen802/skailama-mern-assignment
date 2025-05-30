import React, { useEffect, useState } from 'react';
import {
  Box,
  Drawer,
  IconButton,
  Typography,
  useMediaQuery,
  useTheme,
  Button,
  Avatar,
  Stack,
} from '@mui/material';
import KeyboardDoubleArrowLeftIcon from '@mui/icons-material/KeyboardDoubleArrowLeft';
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';
import NotificationsOutlinedIcon from '@mui/icons-material/NotificationsOutlined';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import LogoutIcon from '@mui/icons-material/Logout';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import { logout } from '../controller/registerController';
import { useLocation, useNavigate } from 'react-router-dom';
import InfoCard from './InfoCard';
import FileTableBox from './FileTableBox';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import EditableTranscript from './EditableTranscript';
import purpleLogo from '../assets/purpleLogo.png';
import youTube from "../assets/youTube.png"
import rss from "../assets/rss.png"
import upload from "../assets/upload.png"
const drawerWidthExpanded = '25%';
const drawerWidthCollapsed = '64px';

const PodcastDashboard = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const location = useLocation();
  const navigate = useNavigate();
  const { projectTitle, _id } = location.state || {};

  useEffect(() => {
    if (!projectTitle) {
      navigate("/dashboard");
    }
  }, [projectTitle]);

  const [collapsed, setCollapsed] = useState(false);
  const [indexed, setIndex] = useState(0);
  const [see, setSee] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editableText, setEditableText] = useState("Click to Edit Title");

  const toggleSidebar = () => setCollapsed(!collapsed);

  const handleLogout = async () => {
    try {
      const result = await logout();
      if (result?.data?.message === "Logged out successfully") {
        alert('Logged out');
      }
    } catch (error) {
      console.log("Error", error);
    }
  };

  const sideBarItems = [
    { icon: <AddIcon />, label: 'Add your Podcasts' },
    { icon: <EditIcon />, label: 'Create & Repurpose' },
    { icon: <ContentCopyIcon />, label: 'Podcast Widget' },
    { icon: <FavoriteBorderIcon />, label: 'Upgrade' },
  ];
  const [rows, setRows] = useState([
  ]);
  return (
    <Box sx={{ display: 'flex', height: '100vh', overflow: 'hidden' }}>
      {/* Sidebar */}
      <Drawer
        variant={isMobile ? 'temporary' : 'permanent'}
        open={!collapsed}
        onClose={toggleSidebar}
        sx={{
          width: collapsed ? drawerWidthCollapsed : drawerWidthExpanded,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: collapsed ? drawerWidthCollapsed : drawerWidthExpanded,
            boxSizing: 'border-box',
            p: 2,
            display: 'flex',
            flexDirection: 'column',
            gap: 2,
            alignItems: collapsed ? 'center' : 'flex-start',
            transition: 'width 0.3s ease',
            overflow: 'visible',
          },
        }}
      >
        {/* Logo & Collapse */}
        <Box sx={{ display: 'flex', alignItems: 'center', width: '100%', justifyContent: collapsed ? 'center' : 'space-between' }}>
          <Typography variant="h6" noWrap>
            {!collapsed && <img
        src={purpleLogo}
        alt="Ques.ai"
        style={{ width: '150px', marginBottom: '1rem' ,marginTop:'1rem'}}
      />
      } 
          </Typography>
        </Box>

        {/* Sidebar Buttons */}
        {sideBarItems.map(({ icon, label }, index) => (
          <Button
            key={index}
            startIcon={icon}
            fullWidth={!collapsed}
            sx={{
              justifyContent: collapsed ? 'center' : 'flex-start',
              color: 'purple',
              backgroundColor: indexed === index ? '#f3e5f5' : 'transparent',
            }}
            onClick={() => {
              setIndex(index);
            }}
          >
            {!collapsed && label}
          </Button>
        ))}

        <IconButton
          onClick={toggleSidebar}
          sx={{
            position: 'absolute',
            bottom: 100,
            right: collapsed ? -20 : -24,
            zIndex: 1300,
            backgroundColor: '#7E22CE',
            boxShadow: 1,
            borderRadius: '50%',
            ':hover': {
              backgroundColor: '#7E22CE',
              cursor: 'pointer',
            },
          }}
        >
           {!collapsed?<KeyboardDoubleArrowLeftIcon sx={{ color: 'white' }} />:<KeyboardDoubleArrowRightIcon sx={{ color: 'white' }}/>}
        </IconButton>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 'auto', width: '100%' }}>
          <Avatar sx={{ width: 32, height: 32 }}>U</Avatar>
          {!collapsed && <Typography variant="body2">Username</Typography>}
        </Box>
      </Drawer>

      {/* Main Content */}
      <Box
        sx={{
          flexGrow: 1,
          width: collapsed ? `calc(100% - ${drawerWidthCollapsed})` : `calc(100% - ${drawerWidthExpanded})`,
          p: 4,
          backgroundColor: '#f5f5f5',
          transition: 'width 0.3s ease',
        }}
      >
        {/* Header */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingX: 2 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <HomeOutlinedIcon sx={{height:'30px',width:'30px'}}/>
            <Typography  sx={{ fontFamily: 'sans-serif' ,fontWeight:'700'}} variant="h6">
              Home Page / {projectTitle}  /
            </Typography>
            <Typography sx={{ fontFamily: 'sans-serif',color:'#7E22CE',fontWeight:'700' }} variant="h6">
              {sideBarItems[indexed]?.label}
            </Typography>
          </Box>
          <Box sx={{display:'flex'}}>
          <IconButton
  
          sx={{
            color: 'black',           
            border: '1px solid black', 
            borderRadius: "100%",        
            backgroundColor: 'transparent',
            marginRight:'10px',
            '&:hover': {
              backgroundColor: 'None', 
            },
          }}
        >
          <NotificationsOutlinedIcon />
        </IconButton>
          <IconButton
          onClick={handleLogout}
          sx={{
            color: 'red',           // Icon color
            border: '1px solid red', // Optional: add a red border
            borderRadius: "100%",        // Make it less round (optional)
            backgroundColor: 'transparent',
            '&:hover': {
              backgroundColor: '#ffe6e6', // Optional: light red hover background
            },
          }}
        >
          <LogoutIcon />
        </IconButton>
        </Box>
        </Box>

        {/* Content */}
        {!see ? (
          <>
            <Typography
              variant="h4"
              sx={{ mt: 3, ml: 3, fontWeight: 'bold', fontFamily: 'sans-serif', textAlign: 'left' }}
            >
              Add Podcast
            </Typography>

            <Box sx={{ marginTop: '30px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              <Stack spacing={2} direction="row">
                <InfoCard title="RSS Feed" subtitle="Lorem ipsum dolor sit amet." iconLetter={rss} sourceName="RSS" _id={_id} setRows={setRows} rows={rows} />
                <InfoCard title="YouTube" subtitle="Upload to your channel." iconLetter={youTube} sourceName="YouTube" _id={_id} setRows={setRows} rows={rows}/>
                <InfoCard title="Upload File" subtitle="Drag and drop files here." iconLetter={upload} sourceName="Computer" _id={_id} setRows={setRows} rows={rows}/>
              </Stack>
            </Box>

            <Box sx={{ marginTop: '30px',
    maxHeight: '500px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',}}>
              <FileTableBox _id={_id} setSee={setSee} rows={rows} setRows={setRows} />
            </Box>
          </>
        ) : (
          // Editable View
          <EditableTranscript
          initialText="Your initial transcript text goes here."
          onBack={() => setSee(false)}
          />


        )}
      </Box>
    </Box>
  );
};

export default PodcastDashboard;
