import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Layout } from './components/layout';
import { useAuthStore } from './store';

// Frontend Pages
import { HomePage } from './pages/frontend/HomePage';
import { BrandPage } from './pages/frontend/BrandPage';
import { ProductsPage } from './pages/frontend/ProductsPage';
import { BlogPage } from './pages/frontend/BlogPage';
import { BlogPostPage } from './pages/frontend/BlogPostPage';
import { ContactPage } from './pages/frontend/ContactPage';
import { PrivacyPolicyPage } from './pages/frontend/PrivacyPolicyPage';
import { DatabaseTestPage } from './pages/frontend/DatabaseTestPage';
import { FAQPage } from './pages/frontend/FAQPage';
import { NoticePage } from './pages/frontend/NoticePage';
import { EventPage } from './pages/frontend/EventPage';

// Admin Pages
import { AdminLayout } from './admin/components/AdminLayout';
import { AdminDashboard } from './admin/pages/AdminDashboard';
import { AdminOrders } from './admin/pages/AdminOrders';
import { AdminInquiries } from './admin/pages/AdminInquiries';
import { AdminFAQ } from './admin/pages/AdminFAQ';
import { AdminNotice } from './admin/pages/AdminNotice';
import { AdminEvent } from './admin/pages/AdminEvent';
import { AdminBlog } from './admin/pages/AdminBlog';
import { AdminUsers } from './admin/pages/AdminUsers';
import { AdminInventory } from './admin/pages/AdminInventory';
import { AdminLogin } from './admin/pages/AdminLogin';

// Protected Route Component
interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { isAuthenticated } = useAuthStore();
  
  if (!isAuthenticated) {
    return <Navigate to="/admin/login" replace />;
  }
  
  return <>{children}</>;
};

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        {/* Frontend Routes */}
        <Route path="/" element={<Layout><HomePage /></Layout>} />
        <Route path="/brand" element={<Layout><BrandPage /></Layout>} />
        <Route path="/products" element={<Layout><ProductsPage /></Layout>} />
        <Route path="/blog" element={<Layout><BlogPage /></Layout>} />
        <Route path="/blog/:id" element={<Layout><BlogPostPage /></Layout>} />
        <Route path="/contact" element={<Layout><ContactPage /></Layout>} />
        <Route path="/privacy" element={<Layout><PrivacyPolicyPage /></Layout>} />
        <Route path="/test-db" element={<Layout><DatabaseTestPage /></Layout>} />
        <Route path="/customer/faq" element={<Layout><FAQPage /></Layout>} />
        <Route path="/customer/notice" element={<Layout><NoticePage /></Layout>} />
        <Route path="/customer/event" element={<Layout><EventPage /></Layout>} />
        
        {/* Admin Routes */}
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route 
          path="/admin/*" 
          element={
            <ProtectedRoute>
              <AdminLayout>
                <Routes>
                  <Route path="/" element={<AdminDashboard />} />
                  <Route path="/orders" element={<AdminOrders />} />
                  <Route path="/inquiries" element={<AdminInquiries />} />
                  <Route path="/blog" element={<AdminBlog />} />
                  <Route path="/users" element={<AdminUsers />} />
                  <Route path="/inventory" element={<AdminInventory />} />
                  <Route path="/faq" element={<AdminFAQ />} />
                  <Route path="/notice" element={<AdminNotice />} />
                  <Route path="/event" element={<AdminEvent />} />
                </Routes>
              </AdminLayout>
            </ProtectedRoute>
          } 
        />
        
        {/* 404 Route */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
};

export default App;