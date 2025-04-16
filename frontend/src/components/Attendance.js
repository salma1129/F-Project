import React from 'react';
import { Box, Container, Typography } from '@mui/material';
import HRSidebar from './HRsidebar';
const Attendance = () => {
  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h4" gutterBottom>
        Attendance Management
      </Typography>
      <Typography variant="body1">
        Here you can manage attendance records.
      </Typography>
    </Container>
  );
};

export default Attendance;