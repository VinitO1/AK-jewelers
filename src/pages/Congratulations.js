import React from 'react';
import { Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Congratulations = () => {
  return (
    <Container className="text-center my-5">
      <h1>Congratulations!</h1>
      <p>Your order has been placed successfully.</p>
      <p>Thank you for shopping with us!</p>
      <Link to="/" className="btn btn-primary">
        Go to Home
      </Link>
    </Container>
  );
};

export default Congratulations; 