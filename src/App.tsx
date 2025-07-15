import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import BlogPage from './components/BlogPage';
import BlogPost from './components/BlogPost';
import AdminLogin from './components/admin/AdminLogin';
import AdminDashboard from './components/admin/AdminDashboard';
import BlogForm from './components/admin/BlogForm';
import ProtectedRoute from './components/admin/ProtectedRoute';
import ServicesPage from './components/ServicesPage';
import ContactPage from './components/ContactPage';
import HomePage from './components/HomePage';
import { useEffect } from 'react'; // Add this import

function App() {

   useEffect(() => {
    // Only run in production (not during local development)
    if (process.env.NODE_ENV === 'production') {
      const pingBackend = () => {
        fetch('https://la-server.onrender.com')
          .then(() => console.log('Backend kept alive'))
          .catch(console.error);
      };

      // Ping immediately when app loads
      pingBackend();
      
      // Then ping every 4 minutes (240,000ms)
      const intervalId = setInterval(pingBackend, 240000);
      
      return () => clearInterval(intervalId);
    }
  }, []);

  return (
    <Router>
      <div className="min-h-screen flex flex-col">
        <Routes>
          {/* Admin Routes */}
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route 
            path="/admin/dashboard" 
            element={
              <ProtectedRoute>
                <AdminDashboard />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/admin/new" 
            element={
              <ProtectedRoute>
                <BlogForm mode="create" />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/admin/edit/:slug" 
            element={
              <ProtectedRoute>
                <BlogForm mode="edit" />
              </ProtectedRoute>
            } 
          />
          
          {/* Public Routes */}
          <Route path="/*" element={
            <>
              <Header />
              <main className="flex-1">
                <Routes>
                  <Route path="/" element={<HomePage />} />
                  <Route path="/services" element={<ServicesPage />} />
                  <Route path="/contact" element={<ContactPage />} />
                  <Route path="/blog" element={<BlogPage />} />
                  <Route path="/blog/:slug" element={<BlogPost />} />
                </Routes>
              </main>
              <Footer />
            </>
          } />
        </Routes>
      </div>
    </Router>
  );
}

export default App;