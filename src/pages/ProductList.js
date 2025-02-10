import React from 'react';
import { Link } from 'react-router-dom';
import AddToCartButton from '../components/AddToCartButton';
import { necklace, rings, earrings } from '../data/products';

function ProductList({ type }) {
  const getProducts = () => {
    switch (type) {
      case 'necklace':
        return necklace;
      case 'rings':
        return rings;
      case 'earrings':
        return earrings;
      default:
        return [];
    }
  };

  const products = getProducts();

  return (
    <div className="container mt-5">
      <div className="row">
        {products.map(product => (
          <div key={product.id} className="col-md-4 mb-4">
            <div className="card black-card">
              <Link to={`/product-detail/${type}/${product.id}`}>
                <img
                  src={product.image}
                  className="card-img-top"
                  alt={product.title}
                />
              </Link>
              <div className="card-body">
                <h5 className="card-title">{product.title}</h5>
                <p className="card-text">${product.price}</p>
                <AddToCartButton product={product} />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ProductList; 