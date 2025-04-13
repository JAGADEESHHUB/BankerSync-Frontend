import { useState } from 'react';
import { Box, Toolbar } from '@mui/material';
import Header from './Header';
import Sidebar from './Sidebar';
import Footer from './Footer';
import AnimatedBackground from '../background/AnimatedBackground';

const Layout = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  
  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };
  
  const closeSidebar = () => {
    setSidebarOpen(false);
  };
  
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', position: 'relative' }}>
      <AnimatedBackground />
      <Header toggleSidebar={toggleSidebar} />
      <Sidebar open={sidebarOpen} closeSidebar={closeSidebar} />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: '100%',
          ml: sidebarOpen ? '240px' : 0,
          transition: 'margin-left 0.2s',
        }}
      >
        <Toolbar />
        <Box sx={{ mb: 4 }}>
          {children}
        </Box>
      </Box>
      <Footer />
    </Box>
  );
};

export default Layout;