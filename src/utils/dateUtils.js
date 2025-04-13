import { format, parseISO } from 'date-fns';

export const formatDate = (dateString, formatString = 'MM/dd/yyyy') => {
  try {
    const date = parseISO(dateString);
    return format(date, formatString);
  } catch (error) {
    return 'Invalid Date';
  }
};

export const formatDateTime = (dateString, formatString = 'MM/dd/yyyy HH:mm:ss') => {
  try {
    const date = parseISO(dateString);
    return format(date, formatString);
  } catch (error) {
    return 'Invalid Date';
  }
};