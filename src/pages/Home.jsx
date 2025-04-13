import { Box, Typography, Container } from '@mui/material';
import DashboardStats from '../components/dashboard/DashboardStats';

const Home = () => {
  return (
    <Container maxWidth="lg">
      <Box sx={{ mb: 4 }}>
          <Typography variant="h5" sx={{ color: 'white' }}>
            Dashboard
          </Typography>
        <DashboardStats />
      </Box>
    </Container>
  );
};

export default Home;