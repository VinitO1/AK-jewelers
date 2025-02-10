import React from 'react';
import { Container, Table, Button } from 'react-bootstrap';
import { useCart } from '../contexts/CartContext.js';
import { Link } from 'react-router-dom';

function Cart() {
  const { cartItems, removeFromCart, updateQuantity, getCartTotal } = useCart();
  const { totalPrice, tax, total } = getCartTotal();

  if (!cartItems || cartItems.length === 0) {
    return (
      <Container className="my-5 text-center">
        <h2>Your cart is empty</h2>
        <Link to="/" className="btn btn-primary mt-3">
          Continue Shopping
        </Link>
      </Container>
    );
  }

  return (
    <Container className="my-5">
      <h2 className="mb-4">Shopping Cart</h2>
      <Table responsive>
        <thead>
          <tr>
            <th>Product</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Total</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {cartItems.map(item => (
            <tr key={item.id}>
              <td>
                <div className="d-flex align-items-center">
                  <img
                    src={item.image}
                    alt={item.title}
                    style={{ width: '50px', height: '50px', objectFit: 'cover', marginRight: '10px' }}
                  />
                  {item.title}
                </div>
              </td>
              <td>${item.price.toFixed(2)}</td>
              <td>
                <input
                  type="number"
                  min="1"
                  value={item.quantity}
                  onChange={(e) => updateQuantity(item.id, e.target.value)}
                  style={{ width: '60px' }}
                  className="form-control"
                />
              </td>
              <td>${(item.price * item.quantity).toFixed(2)}</td>
              <td>
                <Button
                  variant="danger"
                  size="sm"
                  onClick={() => removeFromCart(item.id)}
                >
                  Remove
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr>
            <td colSpan="3" className="text-end">Subtotal:</td>
            <td>${totalPrice.toFixed(2)}</td>
            <td></td>
          </tr>
          <tr>
            <td colSpan="3" className="text-end">Tax (12%):</td>
            <td>${tax.toFixed(2)}</td>
            <td></td>
          </tr>
          <tr>
            <td colSpan="3" className="text-end"><strong>Total:</strong></td>
            <td><strong>${total.toFixed(2)}</strong></td>
            <td></td>
          </tr>
        </tfoot>
      </Table>
      <div className="d-flex justify-content-between mt-4">
        <Link to="/" className="btn btn-secondary">
          Continue Shopping
        </Link>
        <Link to="/checkout" className="btn btn-primary">
          Proceed to Checkout
        </Link>
      </div>
    </Container>
  );
}

export default Cart; 