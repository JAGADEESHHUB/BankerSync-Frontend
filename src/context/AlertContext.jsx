import { createContext, useState, useContext } from 'react';
import { Snackbar, Alert } from '@mui/material';

const AlertContext = createContext();

export const useAlert = () => useContext(AlertContext);

export const AlertProvider = ({ children }) => {
  const [alert, setAlert] = useState({
    open: false,
    message: '',
    severity: 'info',
  });

  const showAlert = (message, severity = 'info') => {
    setAlert({
      open: true,
      message,
      severity,
    });
  };

  const hideAlert = () => {
    setAlert({
      ...alert,
      open: false,
    });
  };

  return (
    <AlertContext.Provider value={{ showAlert }}>
      {children}
      <Snackbar
        open={alert.open}
        autoHideDuration={6000}
        onClose={hideAlert}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <Alert onClose={hideAlert} severity={alert.severity} variant="filled">
          {alert.message}
        </Alert>
      </Snackbar>
    </AlertContext.Provider>
  );
};