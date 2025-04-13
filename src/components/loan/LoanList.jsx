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
  IconButton, 
  Typography,
  TablePagination,
  Chip,
  TextField,
  InputAdornment,
  Button
} from '@mui/material';
import {
  Delete as DeleteIcon,
  Visibility as ViewIcon,
  Search as SearchIcon,
  Payment as PaymentIcon,
  Download as DownloadIcon
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import ConfirmDialog from '../common/ConfirmDialog';
import { format } from 'date-fns';
import { generateLoanListPDF } from '../../utils/pdfUtils';

const LoanList = ({ loans, onDeleteLoan }) => {
  const navigate = useNavigate();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [searchTerm, setSearchTerm] = useState('');
  const [deleteDialog, setDeleteDialog] = useState({ open: false, loanId: null });
  
  // Filter loans based on search term
  const filteredLoans = loans.filter(loan => 
    (loan.ownerName && loan.ownerName.toLowerCase().includes(searchTerm.toLowerCase())) ||
    (loan.customer && loan.customer.clientName.toLowerCase().includes(searchTerm.toLowerCase())) ||
    (loan.ownerContactNumber && loan.ownerContactNumber.toString().includes(searchTerm)) ||
    (loan.itemStatus && loan.itemStatus.toLowerCase().includes(searchTerm.toLowerCase()))
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

  const openDeleteDialog = (loanId) => {
    setDeleteDialog({ open: true, loanId });
  };
  
  const closeDeleteDialog = () => {
    setDeleteDialog({ open: false, loanId: null });
  };
  
  const confirmDelete = async () => {
    try {
      await onDeleteLoan(deleteDialog.loanId);
      closeDeleteDialog();
    } catch (error) {
      console.error('Error deleting loan:', error);
    }
  };

  const handleDownloadPDF = () => {
    const doc = generateLoanListPDF(loans);
    doc.save('loan_list.pdf');
  };
  
  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    try {
      return format(new Date(dateString), 'PPP');
    } catch (error) {
      return 'Invalid Date';
    }
  };
  
  return (
    <>
      <Box sx={{ mb: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="h5" sx={{ color: 'white' }}>Loans</Typography>
        <Button
          variant="contained"
          color="info"
          startIcon={<DownloadIcon />}
          onClick={handleDownloadPDF}
        >
          Download List
        </Button>
      </Box>
      
      <Box sx={{ mb: 3 }}>
        <TextField
          fullWidth
          variant="outlined"
          placeholder="Search loans by owner, customer, contact, or status..."
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
              <TableCell><Typography fontWeight="bold">Owner</Typography></TableCell>
              <TableCell><Typography fontWeight="bold">Customer</Typography></TableCell>
              <TableCell><Typography fontWeight="bold">Amount</Typography></TableCell>
              <TableCell><Typography fontWeight="bold">Interest</Typography></TableCell>
              <TableCell><Typography fontWeight="bold">Status</Typography></TableCell>
              <TableCell><Typography fontWeight="bold">Loan Date</Typography></TableCell>
              <TableCell align="center"><Typography fontWeight="bold">Actions</Typography></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredLoans.length === 0 ? (
              <TableRow>
                <TableCell colSpan={8} align="center">
                  <Typography variant="subtitle1" sx={{ py: 2 }}>
                    No loans found
                  </Typography>
                </TableCell>
              </TableRow>
            ) : (
              filteredLoans
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((loan) => (
                  <TableRow key={loan.loanId} hover>
                    <TableCell>{loan.loanId}</TableCell>
                    <TableCell>{loan.ownerName}</TableCell>
                    <TableCell>{loan.customer ? loan.customer.clientName : 'N/A'}</TableCell>
                    <TableCell>₹{loan.itemLoanValue.toLocaleString()}</TableCell>
                    <TableCell>{loan.itemInterestPercentage}% for {loan.itemInterestPeriod} months</TableCell>
                    <TableCell>
                      <Chip label={loan.itemStatus} color={loan.itemStatus === 'Active' ? 'primary' : 'default'} size="small" />
                    </TableCell>
                    <TableCell>{formatDate(loan.itemLoanDate)}</TableCell>
                    <TableCell align="center">
                      <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                        <IconButton color="info" onClick={() => navigate(`/loans/${loan.loanId}`)}>
                          <ViewIcon />
                        </IconButton>
                        <IconButton color="secondary" onClick={() => navigate(`/loans/${loan.loanId}`)}>
                          <PaymentIcon />
                        </IconButton>
                        <IconButton color="error" onClick={() => openDeleteDialog(loan.loanId)}>
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
          count={filteredLoans.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </TableContainer>
      
      <ConfirmDialog 
        open={deleteDialog.open}
        title="Delete Loan"
        message="Are you sure you want to delete this loan? This action cannot be undone."
        onConfirm={confirmDelete}
        onCancel={closeDeleteDialog}
      />
    </>
  );
};

export default LoanList;