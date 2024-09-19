import React from 'react';

// 상품 데이터를 임시로 설정 (API 사용 시, API로부터 데이터를 불러오면 됩니다)
const products = [
  { id: 1, name: 'Product 1', price: 10000, image: '/images/product1.jpg' },
  { id: 2, name: 'Product 2', price: 20000, image: '/images/product2.jpg' },
  { id: 3, name: 'Product 3', price: 30000, image: '/images/product3.jpg' },
];

const Products = () => {
  return (
    <div>
      <h1>상품 목록</h1>
      <div className="product-list">
        {products.map(product => (
          <div key={product.id} className="product-item">
            <img src={product.image} alt={product.name} />
            <h2>{product.name}</h2>
            <p>{product.price.toLocaleString()}원</p>
          </div>
        ))}
      </div>
      <style jsx>{`
        .product-list {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
          gap: 20px;
        }
        .product-item {
          border: 1px solid #ccc;
          padding: 20px;
          text-align: center;
        }
        .product-item img {
          max-width: 100%;
          height: auto;
        }
      `}</style>
    </div>
  );
};

export default Products;
