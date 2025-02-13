import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchProductById } from '../utils/fetchDataFromFirestore'; // Adjust this import based on your data fetching logic
import { Container, Card, Button } from 'react-bootstrap';

function ProductDetails() {
  const { id } = useParams(); // Get the product ID from the URL
  console.log('Product ID:', id); // Log the product ID for debugging
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProduct = async () => {
      try {
        const productData = await fetchProductById(id); // Fetch product by ID
        setProduct(productData);
      } catch (error) {
        console.error('Error loading product:', error);
      } finally {
        setLoading(false);
      }
    };

    loadProduct();
  }, [id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!product) {
    return <div>Product not found.</div>;
  }

  return (
    <Container className="my-5">
      <Card>
        <Card.Img variant="top" src={product.image} alt={product.title} />
        <Card.Body>
          <Card.Title>{product.title}</Card.Title>
          <Card.Text>${product.price.toFixed(2)}</Card.Text>
          <Card.Text>{product.description}</Card.Text>
          <Button variant="primary">Add to Cart</Button>
        </Card.Body>
      </Card>
    </Container>
  );
}

export default ProductDetails; 