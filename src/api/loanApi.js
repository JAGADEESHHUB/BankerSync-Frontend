import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL + '/loanMain';

export const getAllLoans = async () => {
  try {
    const response = await axios.get(`${API_URL}/getAllLoans`);
    return response.data;
  } catch (error) {
    console.error('Error fetching loans:', error);
    throw error;
  }
};

export const getLoanById = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/getLoan/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching loan with id ${id}:`, error);
    throw error;
  }
};

export const addLoan = async (customerId, loanData) => {
  try {
    const formData = new FormData();
    
    // Append loan data to FormData
    Object.keys(loanData).forEach(key => {
      if (key !== 'itemPictureFile') {
        formData.append(key, loanData[key]);
      }
    });
    
    // Append file if it exists
    if (loanData.itemPictureFile) {
      formData.append('itemPictureFile', loanData.itemPictureFile);
    }
    
    const response = await axios.post(`${API_URL}/addLoan/${customerId}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    
    return response.data;
  } catch (error) {
    console.error('Error adding loan:', error);
    throw error;
  }
};

export const updateLoanPayment = async (loanId, interestAmount, principalAmount) => {
  try {
    const response = await axios.put(`${API_URL}/updateLoan/${loanId}/${interestAmount}/${principalAmount}`);
    return response.data;
  } catch (error) {
    console.error(`Error updating loan payment:`, error);
    throw error;
  }
};

export const deleteLoan = async (id) => {
  try {
    const response = await axios.delete(`${API_URL}/deleteLoan/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error deleting loan with id ${id}:`, error);
    throw error;
  }
};