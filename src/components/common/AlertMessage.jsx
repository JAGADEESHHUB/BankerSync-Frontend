import { Alert, Box } from '@mui/material';

const AlertMessage = ({ message, severity = 'info', onClose = null }) => {
  if (!message) return null;
  
  return (
    <Box sx={{ mb: 2 }}>
      <Alert severity={severity} onClose={onClose}>
        {message}
      </Alert>
    </Box>
  );
};

export default AlertMessage;