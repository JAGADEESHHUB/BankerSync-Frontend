import React from 'react';
import { Box, Chip, Typography } from '@mui/material';
import CalculateIcon from '@mui/icons-material/Calculate';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import SavingsIcon from '@mui/icons-material/Savings';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import MoneyIcon from '@mui/icons-material/Money';
import CreditCardIcon from '@mui/icons-material/CreditCard';

const QuickPrompts = ({ onPromptClick }) => {
  const prompts = [
    {
      id: 'simple-interest',
      text: 'Calculate the simple interest on a principal of [ ] at [ ]% annual rate for [ ] days.',
      icon: <CalculateIcon fontSize="small" />
    },
    {
      id: 'compound-interest',
      text: 'Calculate the compound interest on [ ] for [ ] years at [ ]% annual interest, compounded [ ].',
      icon: <CalculateIcon fontSize="small" />
    },
    {
      id: 'future-value',
      text: 'What will be the future value of [ ] invested for [ ] years at [ ]% compounded [ ]?',
      icon: <SavingsIcon fontSize="small" />
    },
    {
      id: 'emi-calculation',
      text: 'Calculate the EMI for a loan of [ ] over [ ] years at [ ]% annual interest.',
      icon: <AccountBalanceIcon fontSize="small" />
    },
    {
      id: 'total-interest',
      text: 'Calculate the total interest paid on a [ ] loan with [ ]% annual interest over [ ] years in monthly EMIs.',
      icon: <MoneyIcon fontSize="small" />
    },
    {
      id: 'budget-creation',
      text: 'I earn [ ] per month. Help me create a budget including rent, groceries, savings, and entertainment.',
      icon: <CreditCardIcon fontSize="small" />
    },
    {
      id: 'savings-goal',
      text: 'I want to save [ ] in [ ] months. How much do I need to save per month?',
      icon: <SavingsIcon fontSize="small" />
    },
    {
      id: 'stock-return',
      text: 'I bought a stock at [ ] and sold it at [ ]. What is my return percentage?',
      icon: <TrendingUpIcon fontSize="small" />
    },
    {
      id: 'average-cost',
      text: 'I invest [ ] per month in a stock for [ ] months. Stock prices were [ ]. What\'s my average cost per share?',
      icon: <TrendingUpIcon fontSize="small" />
    },
    {
      id: 'net-worth',
      text: 'Calculate my net worth: [ ] in savings, [ ] in investments, [ ] home. Liabilities: [ ] credit card debt, [ ] mortgage.',
      icon: <MoneyIcon fontSize="small" />
    },
    {
      id: 'debt-to-income',
      text: 'My monthly debt payments are [ ] and my gross income is [ ]. What is my debt-to-income ratio?',
      icon: <CreditCardIcon fontSize="small" />
    }
  ];

  return (
    <Box sx={{ mb: 2 }}>
      <Typography variant="subtitle2" sx={{ mb: 1, color: 'white' }}>
        Quick Prompts:
      </Typography>
      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
        {prompts.map((prompt) => (
          <Chip
            key={prompt.id}
            icon={prompt.icon}
            label={prompt.text.length > 30 ? `${prompt.text.substring(0, 30)}...` : prompt.text}
            onClick={() => onPromptClick(prompt.text)}
            sx={{
              bgcolor: 'rgba(255, 255, 255, 0.1)',
              color: 'white',
              '&:hover': {
                bgcolor: 'rgba(255, 255, 255, 0.2)',
              },
              maxWidth: '100%',
              height: 'auto',
              '& .MuiChip-label': {
                whiteSpace: 'normal',
                padding: '8px 4px',
              }
            }}
          />
        ))}
      </Box>
    </Box>
  );
};

export default QuickPrompts;