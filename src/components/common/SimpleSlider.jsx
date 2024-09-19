import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default function SimpleSlider() {
  const list = [
    {
      content: 1,
      color: '#FF5757',
    },
    {
      content: 2,
      color: '#FFBC57',
    },
    {
      content: 3,
      color: '#FFEE57',
    },
    {
      content: 4,
      color: '#57FF86',
    },
    {
      content: 5,
      color: '#5786FF',
    },
    {
      content: 6,
      color: '#8013D7',
    },
  ]

  var settings = {
    dots: true,
    centerMode: true,
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    swipeToSlide: true,
  };
  return (
    <BodyContainer>
      <SliderContainer>
        <Slider {...settings}>
          {list.map((value, index) => (
            <div>
              <SliderContent
                $color={value.color}
                key={index}>
                {value.content}
              </SliderContent>
            </div>
          ))}
        </Slider>
      </SliderContainer>
    </BodyContainer>
  );
}