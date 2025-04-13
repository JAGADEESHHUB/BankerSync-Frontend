import { useState } from 'react';
import { 
  Box, 
  Paper, 
  Typography, 
  Grid, 
  Button, 
  Divider,
  Card,
  CardContent,
  CardActions
} from '@mui/material';
import { ArrowBack as BackIcon, Download as DownloadIcon } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import ImagePreview from '../common/ImagePreview';
import { format } from 'date-fns';
import LoanPayment from './LoanPayment';
import { generateLoanDetailsPDF } from '../../utils/pdfUtils';

const LoanDetails = ({ loan }) => {
  const navigate = useNavigate();
  const [paymentOpen, setPaymentOpen] = useState(false);
  
  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    try {
      return format(new Date(dateString), 'PPP');
    } catch (error) {
      return 'Invalid Date';
    }
  };
  
  const handlePaymentClick = () => {
    setPaymentOpen(true);
  };

  const handlePaymentClose = () => {
    setPaymentOpen(false);
  };
  
  const handleDownloadPDF = () => {
    const doc = generateLoanDetailsPDF(loan);
    doc.save(`loan_${loan.loanId}_details.pdf`);
  };
  
  return (
    <Paper elevation={3} sx={{ p: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Button
          startIcon={<BackIcon />}
          onClick={() => navigate('/loans')}
        >
          Back to Loans
        </Button>
        <Box>
          <Button
            variant="contained"
            color="secondary"
            onClick={handlePaymentClick}
            sx={{ mr: 1 }}
          >
            Record Payment
          </Button>
          <Button
            variant="contained"
            color="info"
            startIcon={<DownloadIcon />}
            onClick={handleDownloadPDF}
          >
            Download PDF
          </Button>
        </Box>
      </Box>
      
      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <Box sx={{ textAlign: 'center', mb: 3 }}>
            <ImagePreview 
              imageUrl={loan.itemPicture} 
              alt={`Item Picture for Loan #${loan.loanId}`}
              height={250}
            />
            <Typography variant="h6" sx={{ mt: 2 }}>
              Loan #{loan.loanId}
            </Typography>
            <Typography variant="body2" color="textSecondary">
              Status: {loan.itemStatus}
            </Typography>
          </Box>
        </Grid>
        
        <Grid item xs={12} md={8}>
          <Box>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <Typography variant="subtitle2" color="textSecondary">Owner Name</Typography>
                <Typography variant="body1">{loan.ownerName}</Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography variant="subtitle2" color="textSecondary">Owner Contact</Typography>
                <Typography variant="body1">{loan.ownerContactNumber}</Typography>
              </Grid>
              <Grid item xs={12}>
                <Divider sx={{ my: 1 }} />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography variant="subtitle2" color="textSecondary">Item Value</Typography>
                <Typography variant="body1">₹{loan.itemValue.toLocaleString()}</Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography variant="subtitle2" color="textSecondary">Loan Amount</Typography>
                <Typography variant="body1">₹{loan.itemLoanValue.toLocaleString()}</Typography>
              </Grid>
              <Grid item xs={12}>
                <Divider sx={{ my: 1 }} />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography variant="subtitle2" color="textSecondary">Interest</Typography>
                <Typography variant="body1">
                  {loan.itemInterestPercentage}% for {loan.itemInterestPeriod} months (₹{loan.itemInterestValue.toLocaleString()})
                </Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography variant="subtitle2" color="textSecondary">Loan Date</Typography>
                <Typography variant="body1">{formatDate(loan.itemLoanDate)}</Typography>
              </Grid>
              <Grid item xs={12}>
                <Divider sx={{ my: 1 }} />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography variant="subtitle2" color="textSecondary">Expected Return Date</Typography>
                <Typography variant="body1">{formatDate(loan.itemReturnDate)}</Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography variant="subtitle2" color="textSecondary">Current Status</Typography>
                <Typography variant="body1">{loan.itemStatus}</Typography>
              </Grid>
              <Grid item xs={12}>
                <Divider sx={{ my: 1 }} />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography variant="subtitle2" color="textSecondary">Pending Principal</Typography>
                <Typography variant="body1" fontWeight="bold">₹{loan.loanPendingPrincipalAmount.toLocaleString()}</Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography variant="subtitle2" color="textSecondary">Pending Interest</Typography>
                <Typography variant="body1" fontWeight="bold">₹{loan.loanPendingInterestAmount.toLocaleString()}</Typography>
              </Grid>
              <Grid item xs={12}>
                <Divider sx={{ my: 1 }} />
              </Grid>
              <Grid item xs={12}>
                <Typography variant="subtitle2" color="textSecondary">Total Pending Amount</Typography>
                <Typography variant="body1" fontWeight="bold" color="secondary">
                  ₹{loan.loanPendingTotalAmount.toLocaleString()}
                </Typography>
              </Grid>
            </Grid>
          </Box>
        </Grid>
      </Grid>
      
      <LoanPayment 
        open={paymentOpen}
        onClose={handlePaymentClose}
        loan={loan}
      />
    </Paper>
  );
};

export default LoanDetails;