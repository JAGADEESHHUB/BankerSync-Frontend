import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL + '/customerMain';

export const getAllCustomers = async () => {
  try {
    const response = await axios.get(`${API_URL}/getAllCustomers`);
    return response.data;
  } catch (error) {
    console.error('Error fetching customers:', error);
    throw error;
  }
};

export const getCustomerById = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/getCustomer/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching customer with id ${id}:`, error);
    throw error;
  }
};

export const addCustomer = async (customerData) => {
  try {
    const formData = new FormData();
    
    // Append customer data to FormData
    Object.keys(customerData).forEach(key => {
      if (key !== 'proofFile' && key !== 'pictureFile') {
        formData.append(key, customerData[key]);
      }
    });
    
    // Append files if they exist
    if (customerData.proofFile) {
      formData.append('proofFile', customerData.proofFile);
    }
    
    if (customerData.pictureFile) {
      formData.append('pictureFile', customerData.pictureFile);
    }
    
    const response = await axios.post(`${API_URL}/addCustomer`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    
    return response.data;
  } catch (error) {
    console.error('Error adding customer:', error);
    throw error;
  }
};

export const updateCustomer = async (id, customerData) => {
  try {
    const formData = new FormData();
    
    // Append customer data to FormData
    Object.keys(customerData).forEach(key => {
      if (key !== 'proofFile' && key !== 'pictureFile') {
        formData.append(key, customerData[key]);
      }
    });
    
    // Append files if they exist
    if (customerData.proofFile) {
      formData.append('proofFile', customerData.proofFile);
    }
    
    if (customerData.pictureFile) {
      formData.append('pictureFile', customerData.pictureFile);
    }
    
    const response = await axios.put(`${API_URL}/updateCustomer/${id}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    
    return response.data;
  } catch (error) {
    console.error(`Error updating customer with id ${id}:`, error);
    throw error;
  }
};

export const deleteCustomer = async (id) => {
  try {
    const response = await axios.delete(`${API_URL}/deleteCustomer/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error deleting customer with id ${id}:`, error);
    throw error;
  }
};