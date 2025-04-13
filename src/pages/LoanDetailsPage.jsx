import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Box, CircularProgress } from '@mui/material';
import LoanDetails from '../components/loan/LoanDetails';
import { getLoanById } from '../api/loanApi';
import { useAlert } from '../context/AlertContext';

const LoanDetailsPage = () => {
  const { id } = useParams();
  const [loan, setLoan] = useState(null);
  const [loading, setLoading] = useState(true);
  const { showAlert } = useAlert();
  
  useEffect(() => {
    const fetchLoan = async () => {
      try {
        const data = await getLoanById(id);
        setLoan(data);
      } catch (error) {
        showAlert(`Error fetching loan details: ${error.message}`, 'error');
      } finally {
        setLoading(false);
      }
    };
    
    fetchLoan();
  }, [id, showAlert]);
  
  if (loading) {
    return <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '80vh' }}>
      <CircularProgress />
    </Box>;
  }
  
  if (!loan) {
    return <Box>Loan not found</Box>;
  }
  
  return (
    <Box>
      <LoanDetails loan={loan} />
    </Box>
  );
};

export default LoanDetailsPage;