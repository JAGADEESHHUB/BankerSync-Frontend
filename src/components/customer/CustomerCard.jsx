import { Box, Card, CardContent, CardActions, Typography, Button, Chip, Avatar } from '@mui/material';
import { Person as PersonIcon, Visibility as ViewIcon } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const CustomerCard = ({ customer }) => {
  const navigate = useNavigate();
  
  return (
    <Card elevation={2} sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <CardContent sx={{ flexGrow: 1 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <Avatar
            src={customer.clientPicture}
            alt={customer.clientName}
            sx={{ width: 56, height: 56, mr: 2 }}
          >
            <PersonIcon />
          </Avatar>
          <Box>
            <Typography variant="h6" component="div">
              {customer.clientName}
            </Typography>
            <Typography variant="caption" color="text.secondary">
              ID: {customer.clientId}
            </Typography>
          </Box>
        </Box>
        
        <Typography variant="body2" color="text.secondary" sx={{ mb: 0.5 }}>
          <strong>Contact:</strong> {customer.clientPrimaryContact}
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 0.5 }}>
          <strong>Address:</strong> {customer.clientAddress}
        </Typography>
        
        <Box sx={{ mt: 2 }}>
          <Chip 
            label={`${customer.loans ? customer.loans.length : 0} Loans`} 
            color={customer.loans && customer.loans.length > 0 ? 'primary' : 'default'} 
            size="small" 
          />
        </Box>
      </CardContent>
      
      <CardActions>
        <Button 
          size="small" 
          color="primary" 
          startIcon={<ViewIcon />}
          onClick={() => navigate(`/customers/${customer.clientId}`)}
          sx={{ ml: 'auto' }}
        >
          View Details
        </Button>
      </CardActions>
    </Card>
  );
};

export default CustomerCard;