import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { fetchProducts } from '../utils/fetchDataFromFirestore.js';

function Home() {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const products = await fetchProducts();
        // Get 2 products from each category
        const featured = products.reduce((acc, product) => {
          if (acc[product.category]?.length < 2) {
            acc[product.category] = [...(acc[product.category] || []), product];
          }
          return acc;
        }, {});
        
        setFeaturedProducts(Object.values(featured).flat());
      } catch (error) {
        console.error('Error loading products:', error);
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, []);

  const getProductPath = (category, id) => {
    return `/${category}/${id.split('-')[1]}`; // Extract the numeric ID
  };

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <div>
      {/* Hero Section */}
      <div 
        className="hero-section text-white text-center d-flex align-items-center"
        style={{
          background: `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)),
                      url('/images/hero-jewelry.webp') center/cover no-repeat`
        }}
      >
        <Container>
          <h1 className="display-3 fw-bold mb-4">AK Jewelers Collection</h1>
          <p className="lead mb-4">Where Elegance Meets Craftsmanship</p>
        
      
        
        </Container>
      </div>

      {/* Categories Section */}
      <Container className="my-5">
        <h2 className="text-center mb-4">Our Collections</h2>
        <Row className="g-4">
          <Col md={4}>
            <Link to="/earrings" className="text-decoration-none">
              <div className="category-card">
                <img 
                  src="/images/Earrings/Earring3.jpg"
                  alt="Earrings" 
                  className="w-100 rounded"
                />
                <div className="category-overlay">
                  <h3>Earrings</h3>
                </div>
              </div>
            </Link>
          </Col>
          <Col md={4}>
            <Link to="/rings" className="text-decoration-none">
              <div className="category-card">
                <img 
                  src="/images/Rings/Ring10.jpg"
                  alt="Rings" 
                  className="w-100 rounded"
                />
                <div className="category-overlay">
                  <h3>Rings</h3>
                </div>
              </div>
            </Link>
          </Col>
          <Col md={4}>
            <Link to="/necklaces" className="text-decoration-none">
              <div className="category-card">
                <img 
                  src="/images/Necklace/Necklace1.jpg"
                  alt="Necklaces" 
                  className="w-100 rounded"
                />
                <div className="category-overlay">
                  <h3>Necklaces</h3>
                </div>
              </div>
            </Link>
          </Col>
        </Row>
      </Container>

      {/* Featured Products Section */}
      <div className="bg-light py-5">
        <Container>
          <h2 className="text-center mb-4">Featured Products</h2>
          <Row className="g-4">
            {featuredProducts.map(product => (
              <Col key={product.id} md={4}>
                <Card className="h-100 product-card">
                  <div className="card-img-wrapper">
                    <Card.Img 
                      variant="top" 
                      src={product.image}
                      alt={product.title}
                      onError={(e) => {
                        e.target.src = '/images/placeholder.jpg';
                      }}
                    />
                  </div>
                  <Card.Body>
                    <Card.Title>{product.title}</Card.Title>
                    <Card.Text>${product.price.toFixed(2)}</Card.Text>
                    <Button 
                      as={Link} 
                      to={getProductPath(product.category, product.id)}
                      variant="outline-primary"
                    >
                      View Details
                    </Button>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Container>
      </div>

      {/* About Section */}
      <Container className="my-5">
        <Row className="align-items-center">
          <Col md={6}>
            <h2>About Our Jewelry</h2>
            <p className="lead">
              Discover our exquisite collection of handcrafted jewelry, designed to make every moment special.
            </p>
            <p>
              We pride ourselves on offering the finest selection of earrings, rings, and necklaces, 
              each piece carefully selected to ensure the highest quality and craftsmanship.
            </p>
          
          </Col>
          <Col md={6}>
            <img 
              src="/images/about-jewelry.webp"
              alt="About Our Jewelry" 
              className="w-100 rounded shadow"
            />
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Home; 