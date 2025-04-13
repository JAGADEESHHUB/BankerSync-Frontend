import { useState } from 'react';
import { 
  Dialog, 
  DialogTitle, 
  DialogContent, 
  DialogActions,
  Button,
  TextField,
  Grid,
  Typography
} from '@mui/material';
import { useAlert } from '../../context/AlertContext';
import { updateLoanPayment } from '../../api/loanApi';

const LoanPayment = ({ open, onClose, loan }) => {
  const { showAlert } = useAlert();
  const [paymentData, setPaymentData] = useState({
    interestAmount: '',
    principalAmount: ''
  });
  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPaymentData({
      ...paymentData,
      [name]: value
    });
  };
  
  const handlePaymentSubmit = async () => {
    try {
      await updateLoanPayment(
        loan.loanId, 
        parseFloat(paymentData.interestAmount) || 0, 
        parseFloat(paymentData.principalAmount) || 0
      );
      showAlert('Payment recorded successfully!', 'success');
      onClose();
      // Optionally refresh loan details or context here
    } catch (error) {
      showAlert(`Error recording payment: ${error.message}`, 'error');
    }
  };
  
  const calculateRemainingAmount = () => {
    const remainingInterest = loan.loanPendingInterestAmount - (parseFloat(paymentData.interestAmount) || 0);
    const remainingPrincipal = loan.loanPendingPrincipalAmount - (parseFloat(paymentData.principalAmount) || 0);
    return {
      interest: remainingInterest,
      principal: remainingPrincipal,
      total: remainingInterest + remainingPrincipal
    };
  };

  const remainingAmounts = calculateRemainingAmount();
  
  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>Record Payment for Loan #{loan.loanId}</DialogTitle>
      <DialogContent>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Interest Amount Paid"
              name="interestAmount"
              value={paymentData.interestAmount}
              onChange={handleInputChange}
              type="number"
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Principal Amount Paid"
              name="principalAmount"
              value={paymentData.principalAmount}
              onChange={handleInputChange}
              type="number"
            />
          </Grid>
          <Grid item xs={12}>
            <Typography variant="subtitle1">
              Remaining Amount: 
              Interest - ₹{remainingAmounts.interest.toLocaleString()}, 
              Principal - ₹{remainingAmounts.principal.toLocaleString()}, 
              Total - ₹{remainingAmounts.total.toLocaleString()}
            </Typography>
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Cancel
        </Button>
        <Button onClick={handlePaymentSubmit} color="primary" variant="contained">
          Record Payment
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default LoanPayment;