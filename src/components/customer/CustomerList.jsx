import { useState } from 'react';
import { 
  Box, 
  Table, 
  TableBody, 
  TableCell, 
  TableContainer, 
  TableHead, 
  TableRow, 
  Paper, 
  Button, 
  IconButton, 
  Typography,
  TablePagination,
  Chip,
  TextField,
  InputAdornment
} from '@mui/material';
import {
  Edit as EditIcon,
  Delete as DeleteIcon,
  Visibility as ViewIcon,
  Search as SearchIcon,
  Add as AddIcon,
  Download as DownloadIcon
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import ConfirmDialog from '../common/ConfirmDialog';
import { generateCustomerListPDF } from '../../utils/pdfUtils';

const CustomerList = ({ customers, onDeleteCustomer }) => {
  const navigate = useNavigate();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [searchTerm, setSearchTerm] = useState('');
  const [deleteDialog, setDeleteDialog] = useState({ open: false, customerId: null });
  
  // Filter customers based on search term
  const filteredCustomers = customers.filter(customer => 
    customer.clientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    customer.clientPrimaryContact.toString().includes(searchTerm) ||
    customer.clientAddress.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  // Handle pagination
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  
  // Handle delete confirmation
  const openDeleteDialog = (customerId) => {
    setDeleteDialog({ open: true, customerId });
  };
  
  const closeDeleteDialog = () => {
    setDeleteDialog({ open: false, customerId: null });
  };
  
  const confirmDelete = async () => {
    try {
      await onDeleteCustomer(deleteDialog.customerId);
      closeDeleteDialog();
    } catch (error) {
      console.error('Error deleting customer:', error);
    }
  };
  
  const handleDownloadPDF = () => {
    const doc = generateCustomerListPDF(customers);
    doc.save('customer_list.pdf');
  };
  
  return (
    <>
      <Box sx={{ mb: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="h5" sx={{ color: 'white' }}>Customers</Typography>
        <Box>
          <Button 
            variant="contained" 
            color="primary" 
            startIcon={<AddIcon />}
            onClick={() => navigate('/customers/add')}
            sx={{ mr: 1 }}
          >
            Add Customer
          </Button>
          <Button
            variant="contained"
            color="info"
            startIcon={<DownloadIcon />}
            onClick={handleDownloadPDF}
          >
            Download List
          </Button>
        </Box>
      </Box>
      
      <Box sx={{ mb: 3 }}>
        <TextField
          fullWidth
          variant="outlined"
          placeholder="Search customers by name, contact, or address..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon sx={{ color: 'white' }} />
              </InputAdornment>
            ),
            sx: {
              '& input': {
                color: 'white'
              },
              '& input::placeholder': {
                color: 'white'
              },
              '& .MuiOutlinedInput-notchedOutline': {
                borderColor: 'white'
              },
              '&:hover .MuiOutlinedInput-notchedOutline': {
                borderColor: 'white'
              },
              '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                borderColor: 'white'
              }
            }
          }}
        />
      </Box>
      
      <TableContainer component={Paper} elevation={3}>
        <Table>
          <TableHead>
            <TableRow sx={{ backgroundColor: 'primary.light' }}>
              <TableCell><Typography fontWeight="bold">ID</Typography></TableCell>
              <TableCell><Typography fontWeight="bold">Name</Typography></TableCell>
              <TableCell><Typography fontWeight="bold">Contact</Typography></TableCell>
              <TableCell><Typography fontWeight="bold">Address</Typography></TableCell>
              <TableCell><Typography fontWeight="bold">Loans</Typography></TableCell>
              <TableCell align="center"><Typography fontWeight="bold">Actions</Typography></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredCustomers.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} align="center">
                  <Typography variant="subtitle1" sx={{ py: 2 }}>
                    No customers found
                  </Typography>
                </TableCell>
              </TableRow>
            ) : (
              filteredCustomers
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((customer) => (
                  <TableRow key={customer.clientId} hover>
                    <TableCell>{customer.clientId}</TableCell>
                    <TableCell>{customer.clientName}</TableCell>
                    <TableCell>{customer.clientPrimaryContact}</TableCell>
                    <TableCell>{customer.clientAddress}</TableCell>
                    <TableCell>
                      {customer.loans && customer.loans.length > 0 ? (
                        <Chip 
                          label={`${customer.loans.length} Loans`} 
                          color="primary" 
                          size="small" 
                          onClick={() => navigate(`/customers/${customer.clientId}`)}
                        />
                      ) : (
                        <Chip label="No Loans" color="default" size="small" />
                      )}
                    </TableCell>
                    <TableCell align="center">
                      <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                        <IconButton color="info" onClick={() => navigate(`/customers/${customer.clientId}`)}>
                          <ViewIcon />
                        </IconButton>
                        <IconButton color="primary" onClick={() => navigate(`/customers/edit/${customer.clientId}`)}>
                          <EditIcon />
                        </IconButton>
                        <IconButton color="error" onClick={() => openDeleteDialog(customer.clientId)}>
                          <DeleteIcon />
                        </IconButton>
                      </Box>
                    </TableCell>
                  </TableRow>
                ))
            )}
          </TableBody>
        </Table>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={filteredCustomers.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </TableContainer>
      
      <ConfirmDialog 
        open={deleteDialog.open}
        title="Delete Customer"
        message="Are you sure you want to delete this customer? This action cannot be undone."
        onConfirm={confirmDelete}
        onCancel={closeDeleteDialog}
      />
    </>
  );
};

export default CustomerList;
