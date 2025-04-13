import { Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/layout/Layout';
import Home from './pages/Home';
import CustomerPage from './pages/CustomerPage';
import AddCustomerPage from './pages/AddCustomerPage';
import EditCustomerPage from './pages/EditCustomerPage';
import CustomerDetailsPage from './pages/CustomerDetailsPage';
import LoanPage from './pages/LoanPage';
import AddLoanPage from './pages/AddLoanPage';
import LoanDetailsPage from './pages/LoanDetailsPage';
import AiChatPage from './pages/AiChatPage';
import LoginPage from './pages/LoginPage';
import { useAuth } from './context/AuthContext';

// Protected route component
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();
  
  if (loading) {
    return null; // Or a loading spinner
  }
  
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  
  return children;
};

function App() {
  const { isAuthenticated } = useAuth();
  
  return (
    <Routes>
      {/* Redirect from root to login if not authenticated */}
      <Route path="/" element={!isAuthenticated ? <Navigate to="/login" replace /> : 
        <ProtectedRoute>
          <Layout>
            <Home />
          </Layout>
        </ProtectedRoute>
      } />
      
      <Route path="/login" element={!isAuthenticated ? <LoginPage /> : <Navigate to="/" replace />} />
      
      {/* Home route is now handled above */}
      
      <Route path="/customers" element={
        <ProtectedRoute>
          <Layout>
            <CustomerPage />
          </Layout>
        </ProtectedRoute>
      } />
      
      <Route path="/customers/add" element={
        <ProtectedRoute>
          <Layout>
            <AddCustomerPage />
          </Layout>
        </ProtectedRoute>
      } />
      
      <Route path="/customers/edit/:id" element={
        <ProtectedRoute>
          <Layout>
            <EditCustomerPage />
          </Layout>
        </ProtectedRoute>
      } />
      
      <Route path="/customers/:id" element={
        <ProtectedRoute>
          <Layout>
            <CustomerDetailsPage />
          </Layout>
        </ProtectedRoute>
      } />
      
      <Route path="/loans" element={
        <ProtectedRoute>
          <Layout>
            <LoanPage />
          </Layout>
        </ProtectedRoute>
      } />
      
      <Route path="/loans/add/:customerId" element={
        <ProtectedRoute>
          <Layout>
            <AddLoanPage />
          </Layout>
        </ProtectedRoute>
      } />
      
      <Route path="/loans/:id" element={
        <ProtectedRoute>
          <Layout>
            <LoanDetailsPage />
          </Layout>
        </ProtectedRoute>
      } />
      
      <Route path="/ai-chat" element={
        <ProtectedRoute>
          <Layout>
            <AiChatPage />
          </Layout>
        </ProtectedRoute>
      } />
    </Routes>
  );
}
export default App;
