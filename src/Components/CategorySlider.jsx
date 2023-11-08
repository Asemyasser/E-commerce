import axios from "axios";
import React from "react";
import { useQuery } from "react-query";
import Slider from "react-slick";

export default function CategorySlider() {
  const BaseUrl = "https://ecommerce.routemisr.com";
  function getData() {
    return axios.get(`${BaseUrl}/api/v1/categories`);
  }

  const { data } = useQuery("categories", getData);
  console.log(data?.data);

  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 7,
    slidesToScroll: 5,
    arrows: false,
    autoplay: true,
    autoplaySpeed: 2000,
  };

  return (
    <div className="container my-4">
      <h2 className="h4 my-4">Shop Popular Categories</h2>
      <Slider {...settings}>
        {data?.data.data.map((cat) => (
          <img key={cat.image} src={cat.image} className="cat" alt="" />
        ))}
      </Slider>
    </div>
  );
}
