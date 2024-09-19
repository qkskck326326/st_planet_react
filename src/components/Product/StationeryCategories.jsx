import React from 'react';
import { Link } from 'react-router-dom';

const StationeryCategories = ({ category, setCategory }) => {
  const categories = ['전체', '노트', '펜', '지우개', '연필', '형광펜', '파일', '기타'];

  return (
    <ul className='itemStationeryTab'>
      {categories.map(cate => (
        <li key={cate} className={category === cate ? 'itemStationeryLinkOn' : 'itemStationeryLink'}>
          <Link to={`/shop/stationery/${cate}`} onClick={() => setCategory(cate)}>
            {cate}
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default StationeryCategories;
