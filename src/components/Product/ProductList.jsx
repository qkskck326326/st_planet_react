import React, { useState, useEffect } from 'react';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [userRole, setUserRole] = useState('user');

  useEffect(() => {
    const token = localStorage.getItem('token'); // JWT 토큰
    if (token) {
      const decoded = jwt_decode(token); 
      setUserRole(decoded.role); 
    }

    const fetchProducts = async () => {
      const response = await fetch('/api/products');
      const data = await response.json();
      setProducts(data);
    };

    fetchProducts();
  }, []);

  return (
    <div>
      <h1>상품 목록</h1>
      <ul>
        {products.map((product) => (
          <li key={product.id}>
            <h2>{product.name}</h2>
            <p>{product.description}</p>
            <p>가격: {product.price}원</p>
            {userRole === 'admin' && (
              <div>
                <button>수정</button>
                <button>삭제</button>
              </div>
            )}
          </li>
        ))}
      </ul>
      {userRole === 'admin' && <button>상품 추가</button>}
    </div>
  );
};

export default ProductList;