import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Box, CircularProgress } from '@mui/material';
import CustomerDetails from '../components/customer/CustomerDetails';
import { getCustomerById } from '../api/customerApi';
import { useAlert } from '../context/AlertContext';

const CustomerDetailsPage = () => {
  const { id } = useParams();
  const [customer, setCustomer] = useState(null);
  const [loading, setLoading] = useState(true);
  const { showAlert } = useAlert();
  
  useEffect(() => {
    const fetchCustomer = async () => {
      try {
        const data = await getCustomerById(id);
        setCustomer(data);
      } catch (error) {
        showAlert(`Error fetching customer details: ${error.message}`, 'error');
      } finally {
        setLoading(false);
      }
    };
    
    fetchCustomer();
  }, [id, showAlert]);
  
  if (loading) {
    return <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '80vh' }}>
      <CircularProgress />
    </Box>;
  }
  
  if (!customer) {
    return <Box>Customer not found</Box>;
  }
  
  return (
    <Box>
      <CustomerDetails customer={customer} />
    </Box>
  );
};

export default CustomerDetailsPage;