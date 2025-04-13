import jsPDF from 'jspdf';

/**
 * Generates a PDF for a single customer's details
 * @param {Object} customer - The customer object containing all details
 * @returns {jsPDF} - The generated PDF document
 */
export const generateCustomerDetailsPDF = (customer) => {
  const doc = new jsPDF();
  
  // Add title
  doc.setFontSize(20);
  doc.setTextColor(0, 0, 0);
  doc.text('Customer Details', 105, 15, { align: 'center' });
  
  // Add customer information
  doc.setFontSize(12);
  doc.text(`Customer ID: ${customer.clientId}`, 20, 30);
  doc.text(`Name: ${customer.clientName}`, 20, 40);
  doc.text(`Contact: ${customer.clientPrimaryContact || 'N/A'}`, 20, 50);
  doc.text(`Address: ${customer.clientAddress || 'N/A'}`, 20, 60);
  doc.text(`Email: ${customer.clientEmail || 'N/A'}`, 20, 70);
  
  // Add additional information if available
  if (customer.clientSecondaryContact) {
    doc.text(`Secondary Contact: ${customer.clientSecondaryContact}`, 20, 80);
  }
  
  // Add creation date
  const creationDate = customer.createdDate 
    ? new Date(customer.createdDate).toLocaleDateString() 
    : 'N/A';
  doc.text(`Customer Since: ${creationDate}`, 20, 90);
  
  // Add loans summary if available
  if (customer.loans && customer.loans.length > 0) {
    doc.text('Loans Summary:', 20, 110);
    doc.text(`Total Loans: ${customer.loans.length}`, 30, 120);
    
    // Calculate total loan amount
    const totalLoanAmount = customer.loans.reduce(
      (sum, loan) => sum + (parseFloat(loan.itemLoanValue) || 0), 
      0
    );
    doc.text(`Total Loan Amount: ₹${totalLoanAmount.toLocaleString()}`, 30, 130);
    
    // List active loans
    const activeLoans = customer.loans.filter(loan => loan.itemStatus === 'Active');
    doc.text(`Active Loans: ${activeLoans.length}`, 30, 140);
  }
  
  // Add footer
  doc.setFontSize(10);
  doc.text('BankerSync - Customer Management System', 105, 280, { align: 'center' });
  doc.text(`Generated on: ${new Date().toLocaleString()}`, 105, 285, { align: 'center' });
  
  return doc;
};

/**
 * Generates a PDF containing a list of customers
 * @param {Array} customers - Array of customer objects
 * @returns {jsPDF} - The generated PDF document
 */
export const generateCustomerListPDF = (customers) => {
  const doc = new jsPDF();
  
  // Add title
  doc.setFontSize(20);
  doc.setTextColor(0, 0, 0);
  doc.text('Customer List', 105, 15, { align: 'center' });
  
  // Add generation info
  doc.setFontSize(10);
  doc.text(`Generated on: ${new Date().toLocaleString()}`, 105, 22, { align: 'center' });
  doc.text(`Total Customers: ${customers.length}`, 105, 27, { align: 'center' });
  
  // Table header
  doc.setFontSize(12);
  doc.setTextColor(0, 0, 0);
  doc.text('ID', 20, 40);
  doc.text('Name', 40, 40);
  doc.text('Contact', 100, 40);
  doc.text('Address', 140, 40);
  
  // Add a line below headers
  doc.setDrawColor(0, 0, 0);
  doc.line(20, 42, 190, 42);
  
  // Table content
  let yPosition = 50;
  const itemsPerPage = 20;
  let currentPage = 1;
  
  customers.forEach((customer, index) => {
    // Check if we need a new page
    if (index > 0 && index % itemsPerPage === 0) {
      doc.addPage();
      currentPage++;
      yPosition = 40;
      
      // Add headers to new page
      doc.setFontSize(12);
      doc.text('ID', 20, 30);
      doc.text('Name', 40, 30);
      doc.text('Contact', 100, 30);
      doc.text('Address', 140, 30);
      doc.line(20, 32, 190, 32);
      
      yPosition = 40;
    }
    
    // Add customer data
    doc.setFontSize(10);
    doc.text(customer.clientId.toString(), 20, yPosition);
    doc.text(customer.clientName || 'N/A', 40, yPosition);
    doc.text(customer.clientPrimaryContact?.toString() || 'N/A', 100, yPosition);
    
    // Handle long addresses
    const address = customer.clientAddress || 'N/A';
    if (address.length > 30) {
      doc.text(address.substring(0, 30) + '...', 140, yPosition);
    } else {
      doc.text(address, 140, yPosition);
    }
    
    yPosition += 10;
  });
  
  // Add footer
  doc.setFontSize(10);
  doc.text('BankerSync - Customer Management System', 105, 280, { align: 'center' });
  doc.text(`Page ${currentPage}`, 105, 285, { align: 'center' });
  
  return doc;
};

/**
 * Generates a PDF containing a list of loans
 * @param {Array} loans - Array of loan objects
 * @returns {jsPDF} - The generated PDF document
 */
export const generateLoanListPDF = (loans) => {
  const doc = new jsPDF();
  
  // Add title
  doc.setFontSize(20);
  doc.setTextColor(0, 0, 0);
  doc.text('Loan List', 105, 15, { align: 'center' });
  
  // Add generation info
  doc.setFontSize(10);
  doc.text(`Generated on: ${new Date().toLocaleString()}`, 105, 22, { align: 'center' });
  doc.text(`Total Loans: ${loans.length}`, 105, 27, { align: 'center' });
  
  // Table header
  doc.setFontSize(12);
  doc.setTextColor(0, 0, 0);
  doc.text('ID', 15, 40);
  doc.text('Owner', 30, 40);
  doc.text('Amount', 80, 40);
  doc.text('Status', 110, 40);
  doc.text('Date', 140, 40);
  doc.text('Interest', 170, 40);
  
  // Add a line below headers
  doc.setDrawColor(0, 0, 0);
  doc.line(15, 42, 195, 42);
  
  // Table content
  let yPosition = 50;
  const itemsPerPage = 20;
  let currentPage = 1;
  
  loans.forEach((loan, index) => {
    // Check if we need a new page
    if (index > 0 && index % itemsPerPage === 0) {
      doc.addPage();
      currentPage++;
      
      // Add headers to new page
      doc.setFontSize(12);
      doc.text('ID', 15, 30);
      doc.text('Owner', 30, 30);
      doc.text('Amount', 80, 30);
      doc.text('Status', 110, 30);
      doc.text('Date', 140, 30);
      doc.text('Interest', 170, 30);
      doc.line(15, 32, 195, 32);
      
      yPosition = 40;
    }
    
    // Add loan data
    doc.setFontSize(10);
    doc.text(loan.loanId.toString(), 15, yPosition);
    doc.text(loan.ownerName || 'N/A', 30, yPosition);
    doc.text(`₹${parseFloat(loan.itemLoanValue).toLocaleString()}`, 80, yPosition);
    doc.text(loan.itemStatus || 'N/A', 110, yPosition);
    
    // Format date
    const loanDate = loan.itemLoanDate 
      ? new Date(loan.itemLoanDate).toLocaleDateString() 
      : 'N/A';
    doc.text(loanDate, 140, yPosition);
    
    // Interest info
    const interestInfo = `${loan.itemInterestPercentage || 0}% / ${loan.itemInterestPeriod || 0}mo`;
    doc.text(interestInfo, 170, yPosition);
    
    yPosition += 10;
  });
  
  // Add footer
  doc.setFontSize(10);
  doc.text('BankerSync - Customer Management System', 105, 280, { align: 'center' });
  doc.text(`Page ${currentPage}`, 105, 285, { align: 'center' });
  
  return doc;
};

/**
 * Generates a PDF for a single loan's details
 * @param {Object} loan - The loan object containing all details
 * @returns {jsPDF} - The generated PDF document
 */
export const generateLoanDetailsPDF = (loan) => {
  const doc = new jsPDF();
  
  // Add title
  doc.setFontSize(20);
  doc.setTextColor(0, 0, 0);
  doc.text('Loan Details', 105, 15, { align: 'center' });
  
  // Add loan information
  doc.setFontSize(12);
  doc.text(`Loan ID: ${loan.loanId}`, 20, 30);
  doc.text(`Owner Name: ${loan.ownerName || 'N/A'}`, 20, 40);
  doc.text(`Contact: ${loan.ownerContactNumber || 'N/A'}`, 20, 50);
  doc.text(`Status: ${loan.itemStatus || 'N/A'}`, 20, 60);
  
  // Add financial details
  doc.text('Financial Details:', 20, 80);
  doc.text(`Item Value: ₹${parseFloat(loan.itemValue || 0).toLocaleString()}`, 30, 90);
  doc.text(`Loan Amount: ₹${parseFloat(loan.itemLoanValue || 0).toLocaleString()}`, 30, 100);
  doc.text(`Interest Rate: ${loan.itemInterestPercentage || 0}%`, 30, 110);
  doc.text(`Interest Period: ${loan.itemInterestPeriod || 0} months`, 30, 120);
  doc.text(`Interest Amount: ₹${parseFloat(loan.itemInterestValue || 0).toLocaleString()}`, 30, 130);
  
  // Add date information
  doc.text('Date Information:', 20, 150);
  
  const loanDate = loan.itemLoanDate 
    ? new Date(loan.itemLoanDate).toLocaleDateString() 
    : 'N/A';
  doc.text(`Loan Date: ${loanDate}`, 30, 160);
  
  const returnDate = loan.itemReturnDate 
    ? new Date(loan.itemReturnDate).toLocaleDateString() 
    : 'N/A';
  doc.text(`Expected Return Date: ${returnDate}`, 30, 170);
  
  // Add pending amounts
  doc.text('Pending Amounts:', 20, 190);
  doc.text(`Principal: ₹${parseFloat(loan.loanPendingPrincipalAmount || 0).toLocaleString()}`, 30, 200);
  doc.text(`Interest: ₹${parseFloat(loan.loanPendingInterestAmount || 0).toLocaleString()}`, 30, 210);
  doc.text(`Total: ₹${parseFloat(loan.loanPendingTotalAmount || 0).toLocaleString()}`, 30, 220);
  
  // Add footer
  doc.setFontSize(10);
  doc.text('BankerSync - Customer Management System', 105, 280, { align: 'center' });
  doc.text(`Generated on: ${new Date().toLocaleString()}`, 105, 285, { align: 'center' });
  
  return doc;
};