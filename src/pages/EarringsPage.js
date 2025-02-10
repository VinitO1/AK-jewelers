import React, { useState } from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { earrings } from '../data/earrings.js';
import AddToCartButton from '../components/AddToCartButton.js';

const EarringsPage = () => {
  const [visibleProducts, setVisibleProducts] = useState(6);
  const productsToShow = earrings.slice(0, visibleProducts);
  
  const loadMore = () => {
    setVisibleProducts(prev => prev + 6);
  };

  return (
    <Container className="my-5">
      <h2 className="mb-4">Earrings Collection</h2>
      <Row className="g-4">
        {productsToShow.map(product => (
          <Col key={product.id} xs={12} sm={6} md={4} lg={4}>
            <Card className="h-100">
              <Link to={`/earrings/${product.id}`}>
                <Card.Img 
                  variant="top" 
                  src={product.image} 
                  alt={product.title}
                  style={{ height: '200px', objectFit: 'cover' }}
                />
              </Link>
              <Card.Body>
                <Card.Title>{product.title}</Card.Title>
                <Card.Text>${product.price.toFixed(2)}</Card.Text>
                <AddToCartButton product={product} />
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
      {visibleProducts < earrings.length && (
        <div className="text-center mt-4">
          <Button 
            variant="outline-primary" 
            onClick={loadMore}
            size="lg"
          >
            Load More
          </Button>
        </div>
      )}
    </Container>
  );
};

export default EarringsPage; 