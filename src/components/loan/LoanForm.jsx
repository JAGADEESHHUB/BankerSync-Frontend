import { useState } from 'react';
import { 
  Box, 
  TextField, 
  Button, 
  Grid, 
  Paper, 
  Typography, 
  Divider,
  FormControlLabel,
  Switch,
  InputAdornment
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useAlert } from '../../context/AlertContext';
import FileUpload from '../common/FileUpload';

const LoanForm = ({ customerId, customerName, onSubmit }) => {
  const navigate = useNavigate();
  const { showAlert } = useAlert();
  const currentDate = new Date().toISOString();
  
  const [formData, setFormData] = useState({
    ownerName: customerName || '',
    ownerContactNumber: '',
    createdDate: currentDate.slice(0, 16),
    itemValue: '',
    itemLoanValue: '',
    itemInterestPercentage: '',
    itemInterestPeriod: '',
    itemLoanDate: currentDate.slice(0, 16),
    itemReturnDate: '',
    itemStatus: 'Pending',
    itemPictureFile: null
  });

  const [useSameDetails, setUseSameDetails] = useState(true);
  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  
  const handleFileChange = (file) => {
    setFormData({
      ...formData,
      itemPictureFile: file,
    });
  };

  const calculateInterestValue = () => {
    const principal = parseFloat(formData.itemLoanValue) || 0;
    const rate = parseFloat(formData.itemInterestPercentage) || 0;
    const period = parseInt(formData.itemInterestPeriod) || 0;
    
    const interestAmount = (principal * rate * period) / (100 * 12);
    return interestAmount.toFixed(2);
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const interestValue = calculateInterestValue();
      const dataToSubmit = {
        ...formData,
        itemInterestValue: interestValue,
        loanPendingInterestAmount: interestValue,
        loanPendingPrincipalAmount: formData.itemLoanValue,
        loanPendingTotalAmount: parseFloat(formData.itemLoanValue) + parseFloat(interestValue)
      };
      
      await onSubmit(customerId, dataToSubmit);
      showAlert('Loan added successfully!', 'success');
      navigate(`/customers/${customerId}`);
    } catch (error) {
      showAlert(`Error: ${error.message}`, 'error');
    }
  };

  const handleUseSameDetailsChange = (event) => {
    setUseSameDetails(event.target.checked);
    if (event.target.checked) {
      setFormData({
        ...formData,
        ownerName: customerName || ''
      });
    } else {
      setFormData({
        ...formData,
        ownerName: ''
      });
    }
  };
  
  return (
    <Paper elevation={3} sx={{ p: 3 }}>
      <Typography variant="h5" gutterBottom>
        Add New Loan for Customer: {customerName}
      </Typography>
      <Divider sx={{ mb: 3 }} />
      
      <Box component="form" onSubmit={handleSubmit}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <FormControlLabel
              control={
                <Switch
                  checked={useSameDetails}
                  onChange={handleUseSameDetailsChange}
                  color="primary"
                />
              }
              label="Use customer name as owner"
            />
          </Grid>
          
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              required
              label="Owner Name"
              name="ownerName"
              value={formData.ownerName}
              onChange={handleInputChange}
              disabled={useSameDetails}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              required
              label="Owner Contact Number"
              name="ownerContactNumber"
              value={formData.ownerContactNumber}
              onChange={handleInputChange}
              type="number"
            />
          </Grid>
          
          <Grid item xs={12}>
            <Divider sx={{ my: 1 }}>
              <Typography variant="subtitle2" color="text.secondary">
                Item & Loan Details
              </Typography>
            </Divider>
          </Grid>
          
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              required
              label="Item Value"
              name="itemValue"
              value={formData.itemValue}
              onChange={handleInputChange}
              type="number"
              InputProps={{
                startAdornment: <InputAdornment position="start">₹</InputAdornment>,
              }}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              required
              label="Loan Amount"
              name="itemLoanValue"
              value={formData.itemLoanValue}
              onChange={handleInputChange}
              type="number"
              InputProps={{
                startAdornment: <InputAdornment position="start">₹</InputAdornment>,
              }}
              helperText="Amount given to customer"
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              required
              label="Interest Rate (%)"
              name="itemInterestPercentage"
              value={formData.itemInterestPercentage}
              onChange={handleInputChange}
              type="number"
              InputProps={{
                endAdornment: <InputAdornment position="end">%</InputAdornment>,
              }}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              required
              label="Interest Period (months)"
              name="itemInterestPeriod"
              value={formData.itemInterestPeriod}
              onChange={handleInputChange}
              type="number"
              InputProps={{
                endAdornment: <InputAdornment position="end">Months</InputAdornment>,
              }}
            />
          </Grid>
          
          {formData.itemLoanValue && formData.itemInterestPercentage && formData.itemInterestPeriod && (
            <Grid item xs={12}>
              <Box sx={{ p: 2, bgcolor: 'background.paper', borderRadius: 1, border: '1px solid #e0e0e0' }}>
                <Typography variant="subtitle1" fontWeight="bold">
                  Calculated Interest: ₹{calculateInterestValue()}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Total amount to be repaid: ₹{(parseFloat(formData.itemLoanValue) + parseFloat(calculateInterestValue())).toFixed(2)}
                </Typography>
              </Box>
            </Grid>
          )}
          
          <Grid item xs={12}>
            <Divider sx={{ my: 1 }}>
              <Typography variant="subtitle2" color="text.secondary">
                Dates & Status
              </Typography>
            </Divider>
          </Grid>
          
          <Grid item xs={12} md={4}>
            <TextField
              fullWidth
              required
              label="Created Date"
              name="createdDate"
              type="datetime-local"
              value={formData.createdDate}
              onChange={handleInputChange}
              InputLabelProps={{ shrink: true }}
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <TextField
              fullWidth
              required
              label="Loan Date"
              name="itemLoanDate"
              type="datetime-local"
              value={formData.itemLoanDate}
              onChange={handleInputChange}
              InputLabelProps={{ shrink: true }}
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <TextField
              fullWidth
              required
              label="Expected Return Date"
              name="itemReturnDate"
              type="datetime-local"
              value={formData.itemReturnDate}
              onChange={handleInputChange}
              InputLabelProps={{ shrink: true }}
            />
          </Grid>
          
          <Grid item xs={12}>
            <FileUpload
              onFileSelect={handleFileChange}
              label="Item Picture"
              name="itemPictureFile"
            />
          </Grid>
          
          <Grid item xs={12}>
            <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2, mt: 2 }}>
              <Button 
                variant="outlined" 
                onClick={() => navigate(`/customers/${customerId}`)}
              >
                Cancel
              </Button>
              <Button 
                type="submit" 
                variant="contained" 
                color="primary"
              >
                Create Loan
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Paper>
  );
};

export default LoanForm;