import React from "react";
import Slider from "react-slick";
import slider1 from "../assets/images/slider-image-1.jpeg";
import slider2 from "../assets/images/slider-image-2.jpeg";
import slider3 from "../assets/images/slider-image-3.jpeg";

import img1 from "../assets/images/grocery-banner.png";
import img2 from "../assets/images/grocery-banner-2.jpeg";
export default function MainSlider() {
  const slider = [slider1, slider2, slider3];

  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    autoplay: true,
    autoplaySpeed: 2000,
  };

  return (
    <div className="container ">
      <div className="row gx-0">
        <div className="col-md-8">
          <Slider {...settings}>
            {slider.map((img) => (
              <img key={img} height={400} src={img} alt=""></img>
            ))}
          </Slider>
        </div>
        <div className="col-md-4">
          <img
            src={img1}
            style={{ height: "200px" }}
            className="w-100"
            alt=""
          />
          <img
            src={img2}
            style={{ height: "200px" }}
            className="w-100"
            alt=""
          />
        </div>
      </div>
    </div>
  );
}
