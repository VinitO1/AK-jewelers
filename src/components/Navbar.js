import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { useCart } from "../contexts/CartContext";
import {
  Navbar as BootstrapNavbar,
  Container,
  Nav,
  NavDropdown,
} from "react-bootstrap";
import { FaShoppingCart, FaUser } from "react-icons/fa"; // Install with: npm install react-icons

function Navbar() {
  const { currentUser, logout } = useAuth();
  const { getCartTotal } = useCart();
  const navigate = useNavigate();
  const { itemCount } = getCartTotal();

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/login");
    } catch (error) {
      console.error("Failed to log out", error);
    }
  };

  return (
    <BootstrapNavbar
      bg="dark"
      variant="dark"
      expand="lg"
      className="navbar-custom"
    >
      <Container>
        <BootstrapNavbar.Brand as={Link} to="/" className="brand-text">
          AK Jewelers
        </BootstrapNavbar.Brand>

        <BootstrapNavbar.Toggle aria-controls="basic-navbar-nav" />
        <BootstrapNavbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/earrings" className="nav-link-custom">
              Earrings
            </Nav.Link>
            <Nav.Link as={Link} to="/rings" className="nav-link-custom">
              Rings
            </Nav.Link>
            <Nav.Link as={Link} to="/necklaces" className="nav-link-custom">
              Necklaces
            </Nav.Link>
          </Nav>

          <Nav>
            <Nav.Link
              as={Link}
              to="/cart"
              className="nav-link-custom position-relative me-3"
            >
              <FaShoppingCart size={20} />
              {itemCount > 0 && (
                <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                  {itemCount}
                  <span className="visually-hidden">items in cart</span>
                </span>
              )}
            </Nav.Link>

            {currentUser ? (
              <NavDropdown
                title={
                  <div className="d-inline">
                    <FaUser className="me-1" />
                    {currentUser.email.split("@")[0]}
                  </div>
                }
                id="user-dropdown"
                align="end"
                className="nav-dropdown-custom"
              >
                <NavDropdown.Item onClick={handleLogout}>
                  Logout
                </NavDropdown.Item>
              </NavDropdown>
            ) : (
              <>
                <Nav.Link
                  as={Link}
                  to="/login"
                  className="nav-link-custom me-2"
                >
                  Login
                </Nav.Link>
                <Nav.Link
                  as={Link}
                  to="/signup"
                  className="btn btn-outline-light"
                >
                  Sign Up
                </Nav.Link>
              </>
            )}
          </Nav>
        </BootstrapNavbar.Collapse>
      </Container>
    </BootstrapNavbar>
  );
}

export default Navbar;
