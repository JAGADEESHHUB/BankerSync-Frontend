import { useState } from 'react';
import { 
  Box, 
  Paper, 
  Typography, 
  Grid, 
  Button, 
  Divider, 
  Tabs,
  Tab,
  Card,
  CardContent,
  CardActions
} from '@mui/material';
import { Edit as EditIcon, AccountBalance as LoanIcon, ArrowBack as BackIcon, Download as DownloadIcon } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import ImagePreview from '../common/ImagePreview';
import { format } from 'date-fns';
import { generateCustomerDetailsPDF } from '../../utils/pdfUtils';

const CustomerDetails = ({ customer }) => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState(0);
  
  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };
  
  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    try {
      return format(new Date(dateString), 'PPP');
    } catch (error) {
      return 'Invalid Date';
    }
  };

  const handleDownloadPDF = () => {
    const doc = generateCustomerDetailsPDF(customer);
    doc.save(`customer_${customer.clientId}_details.pdf`);
  };
  
  return (
    <Paper elevation={3} sx={{ p: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Button
          startIcon={<BackIcon />}
          onClick={() => navigate('/customers')}
        >
          Back to Customers
        </Button>
        <Box>
          <Button
            variant="contained"
            color="primary"
            startIcon={<EditIcon />}
            onClick={() => navigate(`/customers/edit/${customer.clientId}`)}
            sx={{ mr: 1 }}
          >
            Edit Customer
          </Button>
          <Button
            variant="contained"
            color="secondary"
            startIcon={<LoanIcon />}
            onClick={() => navigate(`/loans/add/${customer.clientId}`)}
            sx={{ mr: 1 }}
          >
            Add Loan
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
              imageUrl={customer.clientPicture} 
              alt={`${customer.clientName}'s Picture`}
              height={250}
            />
            <Typography variant="h6" sx={{ mt: 2 }}>
              {customer.clientName}
            </Typography>
            <Typography variant="body2" color="textSecondary">
              Customer ID: {customer.clientId}
            </Typography>
          </Box>
          
          <Box sx={{ border: '1px solid #e0e0e0', borderRadius: 1, p: 2 }}>
            <Typography variant="subtitle1" fontWeight="bold">Identity Proof</Typography>
            <ImagePreview 
              imageUrl={customer.clientProof} 
              alt="Identity Proof"
              height={150}
            />
          </Box>
        </Grid>
        
        <Grid item xs={12} md={8}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 2 }}>
            <Tabs value={activeTab} onChange={handleTabChange} aria-label="customer tabs">
              <Tab label="Details" />
              <Tab label="Loans" />
            </Tabs>
          </Box>
          
          {activeTab === 0 && (
            <Box>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <Typography variant="subtitle2" color="textSecondary">Full Name</Typography>
                  <Typography variant="body1">{customer.clientName}</Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography variant="subtitle2" color="textSecondary">Father's Name</Typography>
                  <Typography variant="body1">{customer.clientFatherName}</Typography>
                </Grid>
                <Grid item xs={12}>
                  <Divider sx={{ my: 1 }} />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography variant="subtitle2" color="textSecondary">Primary Contact</Typography>
                  <Typography variant="body1">{customer.clientPrimaryContact}</Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography variant="subtitle2" color="textSecondary">Secondary Contact</Typography>
                  <Typography variant="body1">
                    {customer.clientSecondaryContact || 'Not Provided'}
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <Divider sx={{ my: 1 }} />
                </Grid>
                <Grid item xs={12}>
                  <Typography variant="subtitle2" color="textSecondary">Address</Typography>
                  <Typography variant="body1">{customer.clientAddress}</Typography>
                </Grid>
                <Grid item xs={12}>
                  <Divider sx={{ my: 1 }} />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography variant="subtitle2" color="textSecondary">Created At</Typography>
                  <Typography variant="body1">{formatDate(customer.clientCreatedAt)}</Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography variant="subtitle2" color="textSecondary">Last Updated</Typography>
                  <Typography variant="body1">{formatDate(customer.clientUpdatedAt)}</Typography>
                </Grid>
                <Grid item xs={12}>
                  <Divider sx={{ my: 1 }} />
                </Grid>
                <Grid item xs={12}>
                  <Typography variant="subtitle2" color="textSecondary">Records/Notes</Typography>
                  <Typography variant="body1">
                    {customer.clientRecords || 'No records available'}
                  </Typography>
                </Grid>
              </Grid>
            </Box>
          )}
          
          {activeTab === 1 && (
            <Box>
              {(!customer.loans || customer.loans.length === 0) ? (
                <Box sx={{ textAlign: 'center', py: 4 }}>
                  <Typography variant="subtitle1" color="textSecondary">
                    No loans found for this customer
                  </Typography>
                  <Button
                    variant="contained"
                    color="primary"
                    startIcon={<LoanIcon />}
                    onClick={() => navigate(`/loans/add/${customer.clientId}`)}
                    sx={{ mt: 2 }}
                  >
                    Add New Loan
                  </Button>
                </Box>
              ) : (
                <Grid container spacing={2}>
                  {customer.loans.map((loan) => (
                    <Grid item xs={12} sm={6} key={loan.loanId}>
                      <Card>
                        <CardContent>
                          <Typography variant="h6" gutterBottom>
                            Loan #{loan.loanId}
                          </Typography>
                          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                            <Typography variant="body2" color="textSecondary">
                              Status
                            </Typography>
                            <Typography 
                              variant="body2" 
                              color={loan.itemStatus === 'Active' ? 'primary' : 'text.secondary'}
                              fontWeight="bold"
                            >
                              {loan.itemStatus}
                            </Typography>
                          </Box>
                          <Divider sx={{ my: 1 }} />
                          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                            <Typography variant="body2" color="textSecondary">
                              Loan Amount
                            </Typography>
                            <Typography variant="body2">
                              ₹{loan.itemLoanValue.toLocaleString()}
                            </Typography>
                          </Box>
                          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                            <Typography variant="body2" color="textSecondary">
                              Interest
                            </Typography>
                            <Typography variant="body2">
                              {loan.itemInterestPercentage}% for {loan.itemInterestPeriod} months
                            </Typography>
                          </Box>
                          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                            <Typography variant="body2" color="textSecondary">
                              Interest Amount
                            </Typography>
                            <Typography variant="body2">
                              ₹{loan.itemInterestValue.toLocaleString()}
                            </Typography>
                          </Box>
                          <Divider sx={{ my: 1 }} />
                          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                            <Typography variant="body2" color="textSecondary">
                              Pending Principal
                            </Typography>
                            <Typography variant="body2" fontWeight="bold">
                              ₹{loan.loanPendingPrincipalAmount.toLocaleString()}
                            </Typography>
                          </Box>
                          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                            <Typography variant="body2" color="textSecondary">
                              Pending Interest
                            </Typography>
                            <Typography variant="body2" fontWeight="bold">
                              ₹{loan.loanPendingInterestAmount.toLocaleString()}
                            </Typography>
                          </Box>
                          <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 1 }}>
                            <Typography variant="body1" color="textSecondary" fontWeight="bold">
                              Total Due
                            </Typography>
                            <Typography variant="body1" fontWeight="bold" color="secondary">
                              ₹{loan.loanPendingTotalAmount.toLocaleString()}
                            </Typography>
                          </Box>
                        </CardContent>
                        <CardActions>
                          <Button 
                            size="small" 
                            onClick={() => navigate(`/loans/${loan.loanId}`)}
                            sx={{ ml: 'auto' }}
                          >
                            View Details
                          </Button>
                        </CardActions>
                      </Card>
                    </Grid>
                  ))}
                </Grid>
              )}
            </Box>
          )}
        </Grid>
      </Grid>
    </Paper>
  );
};

export default CustomerDetails;