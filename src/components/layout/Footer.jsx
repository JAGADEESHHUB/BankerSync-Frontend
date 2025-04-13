import { Box, Typography, Container } from '@mui/material';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <Box component="footer" sx={{ py: 2, mt: 'auto', backgroundColor: 'rgba(0, 0, 0, 0.3)', color: 'white' }}>
      <Container maxWidth="lg">
        <Typography variant="body2" align="center">
          © {currentYear} BankerSync. All rights reserved.
        </Typography>
      </Container>
    </Box>
  );
};

export default Footer;