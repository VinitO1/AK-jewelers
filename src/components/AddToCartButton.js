import React from 'react';
import { Button } from 'react-bootstrap';
import { useCart } from '../contexts/CartContext.js';

const AddToCartButton = ({ product }) => {
  const { addToCart } = useCart();

  const handleAddToCart = () => {
    addToCart(product);
  };

  return (
    <Button variant="primary" onClick={handleAddToCart}>
      Add to Cart
    </Button>
  );
};

export default AddToCartButton; 