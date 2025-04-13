import { useState, useEffect } from 'react';
import { Box, CircularProgress } from '@mui/material';
import CustomerList from '../components/customer/CustomerList';
import { getAllCustomers, deleteCustomer } from '../api/customerApi';
import { useAlert } from '../context/AlertContext';

const CustomerPage = () => {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const { showAlert } = useAlert();
  
  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const data = await getAllCustomers();
        setCustomers(data);
      } catch (error) {
        showAlert(`Error fetching customers: ${error.message}`, 'error');
      } finally {
        setLoading(false);
      }
    };
    
    fetchCustomers();
  }, [showAlert]);
  
  const handleDeleteCustomer = async (id) => {
    try {
      await deleteCustomer(id);
      setCustomers(prevCustomers => prevCustomers.filter(customer => customer.clientId !== id));
      showAlert('Customer deleted successfully!', 'success');
    } catch (error) {
      showAlert(`Error deleting customer: ${error.message}`, 'error');
    }
  };
  
  if (loading) {
    return <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '80vh' }}>
      <CircularProgress />
    </Box>;
  }
  
  return (
    <Box>
      <CustomerList customers={customers} onDeleteCustomer={handleDeleteCustomer} />
    </Box>
  );
};

export default CustomerPage;