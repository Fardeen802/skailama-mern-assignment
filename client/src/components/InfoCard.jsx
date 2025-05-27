import React from 'react';
import { Box, Typography, Avatar, Stack } from '@mui/material';

const InfoCard = ({ title, subtitle, iconLetter }) => (
  <Box
    sx={{
        width: { xs: '100%', sm: 300 }, // full width on small screens, 300px on small+ screens
        height: { xs: 'auto', sm: 90 },
      borderRadius: 3,
      boxShadow: '0px 3px 10px rgba(0, 0, 0, 0.1)',
      backgroundColor: '#fff',
      px: 2,
      py: 2,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
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
    <Avatar sx={{ bgcolor: '#1976d2' ,borderRadius:'10px',width: 80,    // or any size you want
    height: 80,}}>{iconLetter}</Avatar>
  </Box>
);
const InfoCardList = () => {
    return (
        <Stack spacing={2} direction="row" >
        <InfoCard title="RSS Feed" subtitle="Lorem ipsum dolor sit amet." iconLetter="R" />
        <InfoCard title="YouTube" subtitle="Upload to your channel." iconLetter="Y" />
        <InfoCard title="Upload File" subtitle="Drag and drop files here." iconLetter="U" />
      </Stack>
    );
  };
  
export default InfoCardList;
  