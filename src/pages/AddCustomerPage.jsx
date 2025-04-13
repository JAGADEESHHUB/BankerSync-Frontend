import { Box } from '@mui/material';
import CustomerForm from '../components/customer/CustomerForm';
import { addCustomer } from '../api/customerApi';

const AddCustomerPage = () => {
  
  const handleAddCustomer = async (customerData) => {
    try {
      await addCustomer(customerData);
    } catch (error) {
      throw error; // Let the form handle the error display
    }
  };
  
  return (
    <Box>
      <CustomerForm onSubmit={handleAddCustomer} />
    </Box>
  );
};

export default AddCustomerPage;