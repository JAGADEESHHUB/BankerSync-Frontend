import { useState, useEffect } from 'react';
import { Box, CircularProgress } from '@mui/material';
import LoanList from '../components/loan/LoanList';
import { getAllLoans, deleteLoan } from '../api/loanApi';
import { useAlert } from '../context/AlertContext';

const LoanPage = () => {
  const [loans, setLoans] = useState([]);
  const [loading, setLoading] = useState(true);
  const { showAlert } = useAlert();
  
  useEffect(() => {
    const fetchLoans = async () => {
      try {
        const data = await getAllLoans();
        setLoans(data);
      } catch (error) {
        showAlert(`Error fetching loans: ${error.message}`, 'error');
      } finally {
        setLoading(false);
      }
    };
    
    fetchLoans();
  }, [showAlert]);
  
  const handleDeleteLoan = async (id) => {
    try {
      await deleteLoan(id);
      setLoans(prevLoans => prevLoans.filter(loan => loan.loanId !== id));
      showAlert('Loan deleted successfully!', 'success');
    } catch (error) {
      showAlert(`Error deleting loan: ${error.message}`, 'error');
    }
  };
  
  if (loading) {
    return <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '80vh' }}>
      <CircularProgress />
    </Box>;
  }
  
  return (
    <Box>
      <LoanList loans={loans} onDeleteLoan={handleDeleteLoan} />
    </Box>
  );
};

export default LoanPage;