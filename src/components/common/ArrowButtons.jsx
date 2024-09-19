import React from 'react';
import '../../styles/common/slick.module.css';

const NextArrow = (props) => {
    const { onClick } = props;
    return <div className="next-to" onClick={onClick} />;
};

const PrevArrow = (props) => {
    const { onClick } = props;
    return <div className="prev" onClick={onClick} />;
};

export { NextArrow, PrevArrow };