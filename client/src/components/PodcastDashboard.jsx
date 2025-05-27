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
} from '@mui/material';
import KeyboardDoubleArrowLeftIcon from '@mui/icons-material/KeyboardDoubleArrowLeft';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import LogoutIcon from '@mui/icons-material/Logout';
import { logout } from '../controller/registerController';
import HomeIcon from '@mui/icons-material/Home';
import { useLocation,useNavigate } from 'react-router-dom';
import InfoCardList from './InfoCard';
import FileTableBox from './FileTableBox';
const drawerWidthExpanded = '25%';
const drawerWidthCollapsed = '64px';


const PodcastDashboard = ({}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const location = useLocation();
  const navigate = useNavigate();
  const { projectTitle } = location.state || {};
  useEffect(()=>{
    if(!projectTitle){
      navigate("/dashboard");
    }

  },[projectTitle])
  const [collapsed, setCollapsed] = useState(false);
  const [indexed,setIndex] =useState(0);
  const toggleSidebar = () => setCollapsed(!collapsed);
  const handleLogout =async()=>{
    try {
      const result = await logout();
      if (result?.data?.message==="Logged out successfully"){
        alert('Logged out');
      }
      
    } catch (error) {
      console.log("Error",error);
    }
  }

  const sideBarItems = [
    { icon: <AddIcon />, label: 'Add your Podcasts' },
    { icon: <EditIcon />, label: 'Create & Repurpose' },
    { icon: <ContentCopyIcon />, label: 'Podcast Widget' },
    {icon:<FavoriteBorderIcon/>,label:'Upgrage'}
    ]
  

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
        {sideBarItems.map(({ icon, label }, index) => (
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
      backgroundColor: '#7E22CE',
      boxShadow: 1,
      borderRadius: '50%',
    ':hover': {
      backgroundColor: '#7E22CE',
      cursor: 'pointer',
    },
    }}
  >
    <KeyboardDoubleArrowLeftIcon IconColor='white' />
  </IconButton>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 'auto', width: '100%' }}>
        <Avatar sx={{ width: 32, height: 32 }}>U</Avatar>
        {!collapsed && <Typography variant="body2">Username</Typography>}
      </Box>
      </Drawer>

      {/* Main Content */}
      {indexed ===0&& <Box
        sx={{
          flexGrow: 1,
          width: collapsed ? `calc(100% - ${drawerWidthCollapsed})` : `calc(100% - ${drawerWidthExpanded})`,
          p: 4,
          backgroundColor: '#f5f5f5',
          transition: 'width 0.3s ease',
        }}
      >
        
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingX: 2 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  
            <HomeIcon />
            <Typography sx={{fontFamily:'sans-serif'}} variant="sub-title">Home Page / {projectTitle} / {sideBarItems[indexed]?.label}</Typography>
            
          </Box>
                <LogoutIcon onClick={handleLogout} />
        </Box>
        <Typography
      variant="h4"
      sx={{ mt: 3, ml:3,fontWeight: 'bold', fontFamily: 'sans-serif',textAlign: 'left' 

       }}
    >
      Add Podcast
    </Typography>
          <Box sx={{marginTop:'30px',display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',}}>
          <InfoCardList/>

          </Box>
          
          <Box sx={{marginTop:'30px',alignItems:'center'}}>

          <FileTableBox/>
          </Box>
    <Box>

      </Box>
        
      </Box>}
      
      
    </Box>
  );
};

export default PodcastDashboard;
