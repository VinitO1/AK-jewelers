import React from 'react';
import { useParams } from 'react-router-dom';
import { Container, Row, Col, Button, Image } from 'react-bootstrap';
import { useCart } from '../contexts/CartContext.js';
import { earrings } from '../data/earrings.js';
import { rings } from '../data/rings.js';
import { necklaces } from '../data/necklaces.js';

const ProductDetail = ({ category }) => {
  const { id } = useParams();
  const { addToCart } = useCart();

  const getProduct = () => {
    const productId = parseInt(id);
    switch (category) {
      case 'earrings':
        return earrings.find(p => p.id === productId);
      case 'rings':
        return rings.find(p => p.id === productId);
      case 'necklaces':
        return necklaces.find(p => p.id === productId);
      default:
        return null;
    }
  };

  const product = getProduct();

  if (!product) {
    return (
      <Container className="my-5">
        <h2>Product not found</h2>
      </Container>
    );
  }

  return (
    <Container className="my-5">
      <Row>
        <Col md={6}>
          <Image src={product.image} alt={product.title} fluid />
        </Col>
        <Col md={6}>
          <h2>{product.title}</h2>
          <p className="lead">${product.price}</p>
          <p>{product.description}</p>
          <Button 
            variant="primary" 
            onClick={() => addToCart(product)}
            className="mt-3"
          >
            Add to Cart
          </Button>
        </Col>
      </Row>
    </Container>
  );
};

export default ProductDetail; 