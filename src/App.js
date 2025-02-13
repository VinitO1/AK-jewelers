import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext.js';
import { CartProvider } from './contexts/CartContext.js';
import Navbar from './components/Navbar.js';
import Home from './pages/Home.js';
import Login from './pages/Login.js';
import SignUp from './pages/SignUp.js';
import Cart from './pages/Cart.js';
import Checkout from './pages/Checkout.js';
import EarringsPage from './pages/EarringsPage.js';
import RingsPage from './pages/RingsPage.js';
import NecklacesPage from './pages/NecklacesPage.js';
import PrivateRoute from './components/PrivateRoute.js';
import ProductDetail from './pages/ProductDetail.js';
import NotFound from './pages/NotFound.js';
import Congratulations from './pages/Congratulations';
import ProductDetails from './pages/ProductDetails';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <Router>
          <div>
            <Navbar />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<SignUp />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/checkout" element={<PrivateRoute><Checkout /></PrivateRoute>} />
              <Route path="/congratulations" element={<Congratulations />} />
              <Route path="/earrings" element={<EarringsPage />} />
              <Route path="/rings" element={<RingsPage />} />
              <Route path="/necklaces" element={<NecklacesPage />} />
              <Route path="/earrings/:id" element={<ProductDetail category="earrings" />} />
              <Route path="/rings/:id" element={<ProductDetail category="rings" />} />
              <Route path="/necklaces/:id" element={<ProductDetail category="necklaces" />} />
              <Route path="/:category/:id" element={<ProductDetails />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </div>
        </Router>
      </CartProvider>
    </AuthProvider>
  );
}

export default App; 