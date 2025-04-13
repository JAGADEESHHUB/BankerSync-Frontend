import { useState, useEffect } from 'react';
import { Box, Typography, Paper, CircularProgress } from '@mui/material';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const MetalPricesGraph = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [priceData, setPriceData] = useState([]);

  useEffect(() => {
    // Simulated data - Replace with actual API call
    const simulatedData = [
      { date: '2024-01', gold: 65000, silver: 780, platinum: 55000, copper: 750 },
      { date: '2024-02', gold: 66500, silver: 800, platinum: 56000, copper: 760 },
      { date: '2024-03', gold: 67000, silver: 820, platinum: 57000, copper: 770 },
      { date: '2024-04', gold: 68000, silver: 840, platinum: 58000, copper: 780 },
      { date: '2024-05', gold: 67500, silver: 830, platinum: 57500, copper: 775 }
    ];

    setPriceData(simulatedData);
    setLoading(false);
  }, []);

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="300px">
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="300px">
        <Typography color="error">{error}</Typography>
      </Box>
    );
  }

  return (
    <Paper sx={{ p: 10, height: '100%' }}>
      <Typography variant="h6" gutterBottom>Metal Prices Trend</Typography>
      <Box sx={{ width: '100%', height: 335 }}>
        <ResponsiveContainer>
          <LineChart data={priceData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="gold" stroke="#FFD700" name="Gold (₹/10g)" />
            <Line type="monotone" dataKey="silver" stroke="#C0C0C0" name="Silver (₹/kg)" />
            <Line type="monotone" dataKey="platinum" stroke="#E5E4E2" name="Platinum (₹/10g)" />
            <Line type="monotone" dataKey="copper" stroke="#B87333" name="Copper (₹/kg)" />
          </LineChart>
        </ResponsiveContainer>
      </Box>
    </Paper>
  );
};

export default MetalPricesGraph;