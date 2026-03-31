import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import DashboardPage from "./pages/DashboardPage";
import ProductPage from "./pages/ProductPage";
import SellerPage from "./pages/SellerPage";
import PriceEntryPage from "./pages/PriceEntryPage";
import AboutPage from "./pages/AboutPage";

import { isAuthenticated } from "./utils/auth";

import { Toaster } from 'react-hot-toast';
import { ThemeProvider } from './contexts/ThemeContext';

function App() {

  const PrivateRoute = ({ children }) => {
    return isAuthenticated() ? children : <Navigate to="/" />;
  };

  return (
    <ThemeProvider>
      <BrowserRouter>
        <Toaster position="top-right" toastOptions={{
          style: {
            background: 'var(--bg-secondary)',
            color: 'var(--text-primary)',
            border: '1px solid var(--border-light)',
            backdropFilter: 'var(--glass-blur)',
            boxShadow: 'var(--shadow-lg)'
          }
        }} />
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          
          <Route path="/dashboard" element={
            <PrivateRoute>
              <DashboardPage />
            </PrivateRoute>
          } />
          
          <Route path="/products" element={
            <PrivateRoute>
              <ProductPage />
            </PrivateRoute>
          } />
          
          <Route path="/sellers" element={
            <PrivateRoute>
              <SellerPage />
          </PrivateRoute>
        } />
        
        <Route path="/price" element={
          <PrivateRoute>
            <PriceEntryPage />
          </PrivateRoute>
        } />
        
        <Route path="/about" element={<AboutPage />} />

      </Routes>
    </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;