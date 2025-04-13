import { useState } from 'react';
import { Box, TextField, Button, Grid, Paper, Typography, Divider } from '@mui/material';
import FileUpload from '../common/FileUpload';
import { useNavigate } from 'react-router-dom';
import { useAlert } from '../../context/AlertContext';

const CustomerForm = ({ initialData = {}, onSubmit, isEdit = false }) => {
  const navigate = useNavigate();
  const { showAlert } = useAlert();
  const currentDate = new Date().toISOString().slice(0, 16);
  
  const [formData, setFormData] = useState({
    clientName: initialData.clientName || '',
    clientFatherName: initialData.clientFatherName || '',
    clientAddress: initialData.clientAddress || '',
    clientPrimaryContact: initialData.clientPrimaryContact || '',
    clientSecondaryContact: initialData.clientSecondaryContact || '',
    clientCreatedAt: initialData.clientCreatedAt || currentDate,
    clientUpdatedAt: initialData.clientUpdatedAt || currentDate,
    clientRecords: initialData.clientRecords || '',
    proofFile: null,
    pictureFile: null,
  });

  const [proofPreview] = useState(initialData.clientProof || '');
  const [picturePreview] = useState(initialData.clientPicture || '');
  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  
  const handleFileChange = (file, name) => {
    setFormData({
      ...formData,
      [name]: file,
    });
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      // Validate required fields
      if (!formData.clientName || !formData.clientFatherName || !formData.clientAddress || !formData.clientPrimaryContact) {
        showAlert('Please fill in all required fields', 'error');
        return;
      }

      // Validate contact numbers
      const primaryContact = formData.clientPrimaryContact.toString();
      const secondaryContact = formData.clientSecondaryContact?.toString() || '';

      if (primaryContact && (primaryContact.length !== 10 || !/^\d+$/.test(primaryContact))) {
        showAlert('Primary contact must be a 10-digit number', 'error');
        return;
      }

      if (secondaryContact && (secondaryContact.length !== 10 || !/^\d+$/.test(secondaryContact))) {
        showAlert('Secondary contact must be a 10-digit number', 'error');
        return;
      }

      // Validate file uploads for new customers
      if (!isEdit && (!formData.proofFile || !formData.pictureFile)) {
        showAlert('Please upload both proof document and customer picture', 'error');
        return;
      }

      const dataToSubmit = {
        ...formData,
        clientCreatedAt: isEdit ? initialData.clientCreatedAt : formData.clientCreatedAt,
        clientUpdatedAt: currentDate,
        clientPrimaryContact: parseInt(formData.clientPrimaryContact, 10),
        clientSecondaryContact: formData.clientSecondaryContact ? parseInt(formData.clientSecondaryContact, 10) : null
      };
      
      await onSubmit(dataToSubmit);
      showAlert(isEdit ? 'Customer updated successfully!' : 'Customer added successfully!', 'success');
      navigate('/customers');
    } catch (error) {
      showAlert(`Error: ${error.message}`, 'error');
    }
  };
  
  return (
    <Paper elevation={3} sx={{ p: 3 }}>
      <Typography variant="h5" gutterBottom>
        {isEdit ? 'Edit Customer' : 'Add New Customer'}
      </Typography>
      <Divider sx={{ mb: 3 }} />
      
      <Box component="form" onSubmit={handleSubmit}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              required
              label="Customer Name"
              name="clientName"
              value={formData.clientName}
              onChange={handleInputChange}
              error={!formData.clientName}
              helperText={!formData.clientName && 'Customer name is required'}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              required
              label="Father's Name"
              name="clientFatherName"
              value={formData.clientFatherName}
              onChange={handleInputChange}
              error={!formData.clientFatherName}
              helperText={!formData.clientFatherName && 'Father\'s name is required'}
            />
          </Grid>
          
          <Grid item xs={12}>
            <TextField
              fullWidth
              required
              label="Address"
              name="clientAddress"
              value={formData.clientAddress}
              onChange={handleInputChange}
              multiline
              rows={2}
              error={!formData.clientAddress}
              helperText={!formData.clientAddress && 'Address is required'}
            />
          </Grid>
          
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              required
              label="Primary Contact"
              name="clientPrimaryContact"
              value={formData.clientPrimaryContact}
              onChange={handleInputChange}
              type="number"
              error={!formData.clientPrimaryContact || formData.clientPrimaryContact.toString().length !== 10}
              helperText={(!formData.clientPrimaryContact && 'Primary contact is required') || 
                (formData.clientPrimaryContact && formData.clientPrimaryContact.toString().length !== 10 && 'Must be 10 digits')}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Secondary Contact"
              name="clientSecondaryContact"
              value={formData.clientSecondaryContact}
              onChange={handleInputChange}
              type="number"
              error={formData.clientSecondaryContact && formData.clientSecondaryContact.toString().length !== 10}
              helperText={formData.clientSecondaryContact && formData.clientSecondaryContact.toString().length !== 10 && 'Must be 10 digits'}
            />
          </Grid>
          
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              required
              label="Created Date"
              name="clientCreatedAt"
              type="datetime-local"
              value={formData.clientCreatedAt}
              onChange={handleInputChange}
              disabled={isEdit}
              InputLabelProps={{ shrink: true }}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              required
              label="Updated Date"
              name="clientUpdatedAt"
              type="datetime-local"
              value={formData.clientUpdatedAt}
              onChange={handleInputChange}
              InputLabelProps={{ shrink: true }}
            />
          </Grid>
          
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Records/Notes"
              name="clientRecords"
              value={formData.clientRecords}
              onChange={handleInputChange}
              multiline
              rows={3}
              placeholder="Enter any additional notes or records about the customer"
            />
          </Grid>
          
          <Grid item xs={12} md={6}>
            <FileUpload
              onFileSelect={(file) => handleFileChange(file, 'proofFile')}
              label="Identity Proof Document"
              name="proofFile"
              required={!isEdit}
              accept="image/*,.pdf"
            />
            {isEdit && proofPreview && (
              <Box mt={2}>
                <Typography variant="subtitle2">Current Proof Document:</Typography>
                <img 
                  src={proofPreview} 
                  alt="Current proof" 
                  style={{ maxWidth: '100%', maxHeight: '100px', marginTop: '8px' }} 
                />
              </Box>
            )}
          </Grid>
          
          <Grid item xs={12} md={6}>
            <FileUpload
              onFileSelect={(file) => handleFileChange(file, 'pictureFile')}
              label="Customer Picture"
              name="pictureFile"
              required={!isEdit}
              accept="image/*"
            />
            {isEdit && picturePreview && (
              <Box mt={2}>
                <Typography variant="subtitle2">Current Picture:</Typography>
                <img 
                  src={picturePreview} 
                  alt="Current picture" 
                  style={{ maxWidth: '100%', maxHeight: '100px', marginTop: '8px' }} 
                />
              </Box>
            )}
          </Grid>
          
          <Grid item xs={12}>
            <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2, mt: 2 }}>
              <Button 
                variant="outlined" 
                onClick={() => navigate('/customers')}
              >
                Cancel
              </Button>
              <Button 
                type="submit" 
                variant="contained" 
                color="primary"
              >
                {isEdit ? 'Update Customer' : 'Add Customer'}
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Paper>
  );
};

export default CustomerForm;
 