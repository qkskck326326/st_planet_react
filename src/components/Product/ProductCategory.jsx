import React, { useState } from 'react';
import StationeryCategories from './StationeryCategories';

const ProductCategory = () => {
  const [category, setCategory] = useState('전체');

  return (
    <div>
      <StationeryCategories category={category} setCategory={setCategory} />
      {/* 나머지 쇼핑 페이지 내용 */}
    </div>
  );
};

export default ProductCategory;
