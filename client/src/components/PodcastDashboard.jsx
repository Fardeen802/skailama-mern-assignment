import React, { useState } from 'react';
import {
  Box,
  Drawer,
  IconButton,
  Typography,
  useMediaQuery,
  useTheme,
  Button,
  Avatar,
} from '@mui/material';
import KeyboardDoubleArrowLeftIcon from '@mui/icons-material/KeyboardDoubleArrowLeft';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import PodcastsIcon from '@mui/icons-material/Podcasts';

const drawerWidthExpanded = '25%';
const drawerWidthCollapsed = '64px';

const PodcastDashboard = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const [collapsed, setCollapsed] = useState(false);
const [indexed,setIndex] =useState(0);
  const toggleSidebar = () => setCollapsed(!collapsed);

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
            overflow: 'visible',   // <-- add this
          },
        }}
        
      >
         
        {/* Logo & Menu Button */}
        <Box
        sx={{
            display: 'flex',
            alignItems: 'center',
            width: '100%',
            justifyContent: collapsed ? 'center' : 'space-between',
        }}
        >
        <Typography variant="h6" noWrap>
            {!collapsed && 'Ques.Ai'}
        </Typography>
        </Box>

{/* Map Button Configs */}
        {[
        { icon: <AddIcon />, label: 'Add your Podcasts' },
        { icon: <EditIcon />, label: 'Create & Repurpose' },
        { icon: <ContentCopyIcon />, label: 'Podcast Widget' },
        {icon:<FavoriteBorderIcon/>,label:'Upgrage'}
        ].map(({ icon, label }, index) => (
        <Button
            key={index}
            startIcon={icon}
            fullWidth={!collapsed}
            sx={{ justifyContent: collapsed ? 'center' : 'flex-start',color:'purple' ,backgroundColor: indexed === index ? '#f3e5f5' : 'transparent',}}
            onClick={()=>{
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
      backgroundColor: 'plum',
      boxShadow: 1,
      borderRadius: '50%',
    ':hover': {
      backgroundColor: 'lightgray',
      cursor: 'pointer',
    },
    }}
  >
    <KeyboardDoubleArrowLeftIcon />
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
        <Typography variant="h4">Main Content Area</Typography>
        <Typography>This is the right-hand side content area (65% width).</Typography>
      </Box>
    </Box>
  );
};

export default PodcastDashboard;
