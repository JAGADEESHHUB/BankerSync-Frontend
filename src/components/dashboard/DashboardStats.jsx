import { useState, useEffect } from 'react';
import { Box, Typography, Grid, Paper, CircularProgress } from '@mui/material';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { getAllCustomers } from '../../api/customerApi';
import { getAllLoans } from '../../api/loanApi';
import MetalPricesGraph from './MetalPricesGraph';

const DashboardStats = () => {
  const [customers, setCustomers] = useState([]);
  const [loans, setLoans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [customersData, loansData] = await Promise.all([
          getAllCustomers(),
          getAllLoans()
        ]);
        setCustomers(customersData);
        setLoans(loansData);
      } catch (err) {
        setError('Error fetching data');
        console.error('Error:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const chartData = [
    {
      name: 'Active',
      Customers: customers.length,
      Loans: loans.length
    }
  ];

  const recentCustomers = customers.slice(-5).reverse();
  const recentLoans = loans.slice(-5).reverse();

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="400px">
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="400px">
        <Typography color="error">{error}</Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ flexGrow: 1, mb: 4 }}>
      {/* Stats Chart */}
      <Paper sx={{ p: 3, mb: 4 }}>
        <Typography variant="h6" gutterBottom>Active Customers and Loans</Typography>
        <Box sx={{ width: '100%', height: 300 }}>
          <ResponsiveContainer>
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="Customers" fill="#8884d8" animationDuration={1500} />
              <Bar dataKey="Loans" fill="#82ca9d" animationDuration={1500} />
            </BarChart>
          </ResponsiveContainer>
        </Box>
      </Paper>

      {/* Recent Activity and Metal Prices */}
      <Grid container spacing={5}>
        {/* Recent Customers */}
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 6 }}>
            <Typography variant="h6" gutterBottom>Recent Customers</Typography>
            {recentCustomers.map((customer, index) => (
              <Box key={customer.id} sx={{ mb: 2, p: 1, bgcolor: 'background.default', borderRadius: 1 }}>
                <Typography variant="subtitle1">{customer.clientName}</Typography>
                <Typography variant="body2" color="text.secondary">
                  Phone: {customer.clientPrimaryContact}
                </Typography>
              </Box>
            ))}
          </Paper>
        </Grid>

        {/* Recent Loans */}
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 6 }}>
            <Typography variant="h6" gutterBottom>Recent Loans</Typography>
            {recentLoans.map((loan, index) => (
              <Box key={loan.id} sx={{ mb: 2, p: 1, bgcolor: 'background.default', borderRadius: 1 }}>
                <Typography variant="subtitle1">₹{loan.itemLoanValue?.toLocaleString('en-IN') || 'N/A'}</Typography>
                <Typography variant="body2" color="text.secondary">
                  Status: {loan.itemStatus || 'N/A'}
                </Typography>
              </Box>
            ))}
          </Paper>
        </Grid>

        {/* Metal Prices Graph */}

<Grid item xs={12} md={4}>

<MetalPricesGraph />

</Grid>

</Grid>

</Box>
  );
};

export default DashboardStats;