import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Box, CircularProgress } from '@mui/material';
import CustomerForm from '../components/customer/CustomerForm';
import { getCustomerById, updateCustomer } from '../api/customerApi';
import { useAlert } from '../context/AlertContext';

const EditCustomerPage = () => {
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
        showAlert(`Error fetching customer: ${error.message}`, 'error');
      } finally {
        setLoading(false);
      }
    };
    
    fetchCustomer();
  }, [id, showAlert]);
  
  const handleUpdateCustomer = async (customerData) => {
    try {
      await updateCustomer(id, customerData);
    } catch (error) {
      throw error; // Let the form handle the error display
    }
  };
  
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
      <CustomerForm initialData={customer} onSubmit={handleUpdateCustomer} isEdit />
    </Box>
  );
};

export default EditCustomerPage;