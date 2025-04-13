import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Box, CircularProgress } from '@mui/material';
import LoanForm from '../components/loan/LoanForm';
import { getCustomerById } from '../api/customerApi';
import { addLoan } from '../api/loanApi';
import { useAlert } from '../context/AlertContext';

const AddLoanPage = () => {
  const { customerId } = useParams();
  const [customerName, setCustomerName] = useState('');
  const [loading, setLoading] = useState(true);
  const { showAlert } = useAlert();
  
  useEffect(() => {
    const fetchCustomerName = async () => {
      try {
        const customer = await getCustomerById(customerId);
        setCustomerName(customer.clientName);
      } catch (error) {
        showAlert(`Error fetching customer name: ${error.message}`, 'error');
      } finally {
        setLoading(false);
      }
    };
    
    fetchCustomerName();
  }, [customerId, showAlert]);
  
  const handleAddLoan = async (customerId, loanData) => {
    try {
      await addLoan(customerId, loanData);
    } catch (error) {
      throw error; // Let the form handle the error display
    }
  };
  
  if (loading) {
    return <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '80vh' }}>
      <CircularProgress />
    </Box>;
  }
  
  return (
    <Box>
      <LoanForm customerId={customerId} customerName={customerName} onSubmit={handleAddLoan} />
    </Box>
  );
};

export default AddLoanPage;